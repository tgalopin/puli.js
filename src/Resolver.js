'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import PathUtil from 'path';
import Filesystem from 'fs';
import GlobInfo from 'glob-base';
import Micromatch from 'micromatch';
import ReadDir from 'fs-readdir-recursive';

/**
 * Resolves Puli virtulal paths into filesystem paths.
 * You should not use this component directly. Use the Puli
 * public object instead.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class Resolver {

    constructor(json, baseDirectory) {
        this.json = json;
        this.baseDirectory = baseDirectory;

        this.STOP_ON_FIRST = 1;
        this.INCLUDE_ANCESTORS = 2;
        this.INCLUDE_NESTED = 4;
    }

    /**
     * Filters the JSON file for all references relevant to a given search path.
     *
     * The JSON is scanned starting with the longest mapped Puli path.
     *
     * If the search path is "/a/b", the result includes:
     *
     *  * The references of the mapped path "/a/b".
     *
     * If the flag `INCLUDE_ANCESTORS` is used, the result additionally
     * includes:
     *
     *  * The references of any mapped super path "/a" with the sub-path "/b"
     *    appended.
     *
     * If the flag `INCLUDE_NESTED` is used, the result additionally
     * includes:
     *
     *  * The references of any mapped sub path "/a/b/c".
     *
     * This is useful if you want to look for the children of "/a/b" or scan
     * all descendants for paths matching a given pattern.
     *
     * The result of this method is an array with two levels:
     *
     *  * The first level has Puli paths as keys.
     *  * The second level contains all references for that path, where the
     *    first reference has the highest, the last reference the lowest
     *    priority. The keys of the second level are integers. There may be
     *    holes between any two keys.
     *
     * The references of the second level contain:
     *
     *  * `null` values for virtual resources
     *  * strings starting with "@" for links
     *  * absolute filesystem paths for filesystem resources
     *
     * The flag `STOP_ON_FIRST` may be used to stop the search at the first result.
     */
    searchReferences(searchPath, flags) {
        if (! flags) {
            flags = 0;
        }

        let result = {};
        let foundMatchingMappings = false;

        searchPath = this._rtrimSlashes(searchPath);
        let searchPathForTest = searchPath + '/';

        for (let currentPath in this.json.references) {
            if (! this.json.references.hasOwnProperty(currentPath)) {
                continue;
            }

            let currentPathForTest = this._rtrimSlashes(currentPath) + '/';
            let currentReferences = this.json.references[currentPath];

            // We found a mapping that matches the search path
            // e.g. mapping /a/b for path /a/b
            if (searchPathForTest === currentPathForTest) {
                foundMatchingMappings = true;
                currentReferences = this._resolveReferences(currentPath, currentReferences, flags);

                if (typeof currentReferences === 'undefined' || 0 === currentReferences.length) {
                    continue;
                }

                result[currentPath] = currentReferences;

                // Return unless an explicit mapping order is defined
                // In that case, the ancestors need to be searched as well
                if ((flags & this.STOP_ON_FIRST) && typeof this.json._order[currentPath] === 'undefined') {
                    return result;
                }

                continue;
            }

            // We found a mapping that lies within the search path
            // e.g. mapping /a/b/c for path /a/b
            if ((flags & this.INCLUDE_NESTED) && 0 === currentPathForTest.indexOf(searchPathForTest)) {
                foundMatchingMappings = true;
                currentReferences = this._resolveReferences(currentPath, currentReferences, flags);

                if (typeof currentReferences === 'undefined' || 0 === currentReferences.length) {
                    continue;
                }

                result[currentPath] = currentReferences;

                // Return unless an explicit mapping order is defined
                // In that case, the ancestors need to be searched as well
                if ((flags & this.STOP_ON_FIRST) && typeof this.json._order[currentPath] === 'undefined') {
                    return result;
                }

                continue;
            }

            // We found a mapping that is an ancestor of the search path
            // e.g. mapping /a for path /a/b
            if (0 === searchPathForTest.indexOf(currentPathForTest)) {
                foundMatchingMappings = true;

                if (flags & this.INCLUDE_ANCESTORS) {
                    // Include the references of the ancestor
                    currentReferences = this._resolveReferences(currentPath, currentReferences, flags);

                    if (typeof currentReferences === 'undefined' || 0 === currentReferences.length) {
                        continue;
                    }

                    result[currentPath] = currentReferences;

                    // Return unless an explicit mapping order is defined
                    // In that case, the ancestors need to be searched as well
                    if ((flags & this.STOP_ON_FIRST) && typeof this.json._order[currentPath] === 'undefined') {
                        return result;
                    }

                    continue;
                }

                // Check the filesystem directories pointed to by the ancestors
                // for the searched path
                let nestedPath = searchPath.substr(currentPathForTest.length);
                let currentPathWithNested = this._rtrimSlashes(currentPath) + '/' + nestedPath;

                // Follow links so that we can check the nested directories in
                // the final transitive link targets
                let currentReferencesResolved = this._followLinks(
                    // Never stop on first, since appendNestedPath() might
                    // discard the first but accept the second entry
                    this._resolveReferences(currentPath, currentReferences, flags & (~this.STOP_ON_FIRST))
                );

                // Append the path and check which of the resulting paths exist
                let nestedReferences = this._appendPathAndFilterExisting(
                    currentReferencesResolved,
                    nestedPath,
                    flags
                );

                // None of the results exists
                if (0 === nestedReferences.length) {
                    continue;
                }

                // Return unless an explicit mapping order is defined
                // In that case, the ancestors need to be searched as well
                if ((flags & this.STOP_ON_FIRST) && typeof this.json._order[currentPath] === 'undefined') {
                    // The nested references already have size 1
                    let returned = {};
                    returned[currentPathWithNested] = nestedReferences;

                    return returned;
                }

                // We are traversing long keys before short keys
                // It could be that this entry already exists.
                if (typeof result[currentPathWithNested] === 'undefined') {
                    result[currentPathWithNested] = nestedReferences;

                    continue;
                }

                // If no explicit mapping order is defined, simply append the
                // new references to the existing ones
                if (typeof this.json._order[currentPathWithNested] === 'undefined') {
                    result[currentPathWithNested] = result[currentPathWithNested].concat(nestedReferences);

                    continue;
                }

                // If an explicit mapping order is defined, store the paths
                // of the mappings that generated each reference set and
                // resolve the order later on
                if (typeof this.json._order[currentPathWithNested][currentPathWithNested] === 'undefined') {
                    let built = {};
                    built[currentPathWithNested] = result[currentPathWithNested];

                    result[currentPathWithNested] = built;

                    continue;
                }

                // Add the new references generated by the current mapping
                result[currentPathWithNested][currentPath] = nestedReferences;

                continue;
            }

            // We did not find anything but previously found mappings
            // The mappings are sorted alphabetically, so we can safely abort
            if (foundMatchingMappings) {
                break;
            }
        }

        // Resolve the order where it is explicitly set
        if (typeof this.json._order === 'undefined') {
            return result;
        }

        for (let currentPath in result) {
            if (! result.hasOwnProperty(currentPath)) {
                continue;
            }

            let referencesByMappedPath = result[currentPath];

            // If no order is defined for the path or if only one mapped path
            // generated references, there's nothing to do
            if (typeof this.json._order[currentPath] === 'undefined' ||
                typeof referencesByMappedPath[currentPath] === 'undefined') {
                continue;
            }

            let orderedReferences = [];

            for (let j in this.json._order[currentPath]) {
                if (! this.json._order[currentPath].hasOwnProperty(j)) {
                    continue;
                }

                let orderEntry = this.json._order[currentPath][j];

                if (typeof referencesByMappedPath[orderEntry.path] === 'undefined') {
                    continue;
                }

                let i = 0;

                for (i = 0; i < orderEntry.references && referencesByMappedPath[orderEntry.path].length > 0; i++) {
                    orderedReferences.push(referencesByMappedPath[orderEntry.path].shift());
                }

                // Only include references of the first mapped path
                // Since $stopOnFirst is set, those references have a
                // maximum size of 1
                if (flags & this.STOP_ON_FIRST) {
                    break;
                }
            }

            result[currentPath] = orderedReferences;
        }

        return result;
    }

    /**
     *
     * @param references
     * @returns {string}
     */
    flatten(references) {
        if (! references || 0 === references.length) {
            return [];
        }

        let keys = Object.keys(references);

        if (0 === keys.length) {
            return [];
        }

        return references[keys[0]];
    }

    /**
     * Get references for a given glob.
     *
     * @param {string} query
     * @param {int} flags
     *
     * @return {Array}
     */
    referencesForGlob(query, flags) {
        let glob = new GlobInfo(query);

        if (! glob.isGlob) {
            return this.flatten(this.searchReferences(query, this.STOP_ON_FIRST));
        }

        return this._flattenWithFilter(
            // Never stop on the first result before applying the filter since
            // the filter may reject the only returned path
            this.searchReferences(glob.base, this.INCLUDE_NESTED),
            query,
            flags
        );
    }

    /**
     * Follows any link in a list of references.
     *
     * This method takes all the given references, checks for links starting
     * with "@" and recursively expands those links to their target references.
     * The target references may be `null` or absolute filesystem paths.
     *
     * Null values are returned unchanged.
     *
     * Absolute filesystem paths are returned unchanged.
     *
     * The flag `STOP_ON_FIRST` may be used to stop the search at the first result.
     */
    _followLinks(references, flags) {
        let result = [];
        let reference, referencedPath, referencedSearch, referencedReferences;

        for (let key in references) {
            if (! references.hasOwnProperty(key)) {
                continue;
            }

            reference = references[key];

            // Not a link
            if (! this._isLinkReference(reference)) {
                result.push(reference);

                if (flags & this.STOP_ON_FIRST) {
                    return result;
                }

                continue;
            }

            referencedPath = reference.substr(1);
            referencedSearch = this.searchReferences(referencedPath, flags);

            // Get all the file system paths that this link points to
            // and append them to the result
            for (let i in referencedSearch) {
                if (! referencedSearch.hasOwnProperty(i)) {
                    continue;
                }

                // Follow links recursively
                referencedReferences = this._followLinks(referencedSearch[i]);

                // Append all resulting target paths to the result
                for (let j in referencedReferences) {
                    if (! referencedReferences.hasOwnProperty(j)) {
                        continue;
                    }

                    result.push(referencedReferences[j]);

                    if (flags & this.STOP_ON_FIRST) {
                        return result;
                    }
                }
            }
        }

        return result;
    }

    /**
     * Appends nested paths to references and filters out the existing ones.
     *
     * This method takes all the given references, appends the nested path to
     * each of them and then filters out the results that actually exist on the
     * filesystem.
     *
     * Null references are filtered out.
     *
     * Link references should be followed with {@link followLinks()} before
     * calling this method.
     *
     * The flag `STOP_ON_FIRST` may be used to stop the search at the first result.
     */
    _appendPathAndFilterExisting(references, nestedPath, flags) {
        let result = [];
        let reference, nestedReference;

        for (let i in references) {
            if (! references.hasOwnProperty(i)) {
                continue;
            }

            reference = references[i];

            // Filter out null values
            // Links should be followed before calling this method
            if (this._isVirtualReference(reference)) {
                continue;
            }

            nestedReference = this._rtrimSlashes(reference) + '/' + nestedPath;

            try {
                Filesystem.accessSync(nestedReference, Filesystem.F_OK);

                result.push(nestedReference);

                if (flags & this.STOP_ON_FIRST) {
                    return result;
                }
            } catch (e) {}
        }

        return result;
    }

    /**
     * Resolves a list of references to filesystem paths (either
     * relative or absolute at this stage), links or null.
     *
     * Each reference passed in can be:
     *
     *  * `null`
     *  * a link starting with `@`
     *  * a filesystem path relative to the base directory
     *  * an absolute filesystem path
     *
     * Each reference returned by this method can be:
     *
     *  * `null`
     *  * a link starting with `@`
     *  * a filesystem path
     *
     * Additionally, the results are guaranteed to be an array.
     *
     * The flag `STOP_ON_FIRST` may be used to stop the search at the first result.
     * In that case, the results array has a maximum size of 1.
     */
    _resolveReferences(currentPath, references, flags) {
        let result = [];

        if (! Array.isArray(references)) {
            references = [ references ];
        }

        let reference;

        for (let i in references) {
            if (! references.hasOwnProperty(i)) {
                continue;
            }

            reference = references[i];

            if (this._isVirtualReference(reference) || this._isLinkReference(reference)) {
                result.push(reference);

                if (flags & this.STOP_ON_FIRST) {
                    return result;
                }

                continue;
            }

            let absoluteReference = PathUtil.normalize(
                this.baseDirectory.replace(/\/+$/, '') + '/' + reference.replace(/^\/+/, '')
            );

            try {
                Filesystem.accessSync(absoluteReference, Filesystem.F_OK);

                result.push(absoluteReference);

                if (flags & this.STOP_ON_FIRST) {
                    return result;
                }
            } catch (e) {}
        }

        return result;
    }

    /**
     * Flattens a two-level reference array into a one-level array and filters
     * out any references that don't match the given regular expression.
     *
     * This method takes a two-level reference array as returned by
     * {@link searchReferences()}. The references are scanned for Puli paths
     * matching the given regular expression. Those matches are returned.
     *
     * If a matching path refers to more than one reference, the first reference
     * is returned in the resulting array.
     *
     * All references that contain directory paths may be traversed recursively and
     * scanned for more paths matching the regular expression. This recursive
     * traversal can be limited by passing a `$maxDepth` (see {@link getPathDepth()}).
     * By default, this `$maxDepth` is equal to zero (no recursive scan).
     *
     * The flag `STOP_ON_FIRST` may be used to stop the search at the first result.
     *
     * The flag `NO_SEARCH_FILESYSTEM` may be used to check for whether the found
     * paths actually exist on the filesystem.
     *
     * Each reference returned by this method can be:
     *
     *  * `null`
     *  * a link starting with `@`
     *  * an absolute filesystem path
     *
     * The keys of the returned array are Puli paths. Their order is undefined.
     */
    _flattenWithFilter(references, glob, flags) {
        let results = [];

        for (let currentPath in references) {
            if (! references.hasOwnProperty(currentPath)) {
                continue;
            }

            let currentReferences = references[currentPath];

            if (typeof results[currentPath] === 'undefined' && Micromatch.isMatch(currentPath, glob)) {
                results[currentPath] = currentReferences[0];

                if (flags & this.STOP_ON_FIRST) {
                    return Object.values(results);
                }
            }

            // First follow any links before we check which of them is a directory
            currentReferences = this._followLinks(currentReferences);
            currentPath = this._rtrimSlashes(currentPath);

            // Search the nested entries if desired
            for (let i in currentReferences) {
                if (! currentReferences.hasOwnProperty(i)) {
                    continue;
                }

                let baseFilesystemPath = currentReferences[i];

                if (! Filesystem.lstatSync(baseFilesystemPath).isDirectory()) {
                    continue;
                }

                let nestedFilePaths = new ReadDir(baseFilesystemPath);

                for (let j in nestedFilePaths) {
                    if (! nestedFilePaths.hasOwnProperty(j)) {
                        continue;
                    }

                    let nestedPath = currentPath + '/' + nestedFilePaths[j];
                    let nestedFilesystemPath = baseFilesystemPath + '/' + nestedFilePaths[j];

                    if (typeof results[nestedPath] === 'undefined' && Micromatch.isMatch(nestedPath, glob)) {
                        results[nestedPath] = nestedFilesystemPath;

                        if (flags & this.STOP_ON_FIRST) {
                            return Object.values(results);
                        }
                    }
                }
            }
        }

        return Object.values(results);
    }

    /**
     * Remove the lasting slashes of a string
     *
     * @param string
     * @returns string
     */
    _rtrimSlashes(string) {
        return string.replace(/\/+$/, '');
    }

    /**
     * @param {string} reference
     * @returns {boolean}
     */
    _isVirtualReference(reference) {
        return reference === null;
    }

    /**
     * @param {string} reference
     * @returns {boolean}
     */
    _isLinkReference(reference) {
        return reference !== null && reference.length > 0 && '@' === reference.substr(0, 1);
    }

}
