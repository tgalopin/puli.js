'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

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

    constructor(json) {
        this.json = json;

        this.STOP_ON_FIRST = 2;
        this.INCLUDE_ANCESTORS = 8;
        this.INCLUDE_NESTED = 16;
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
        let result = {};
        let foundMatchingMappings = false;

        searchPath = searchPath.replace(/\/+$/, '');
        let searchPathForTest = searchPath + '/';

        for (let currentPath in this.json.references) {
            if (! this.json.references.hasOwnProperty(currentPath)) {
                continue;
            }

            let currentPathForTest = currentPath.replace(/\/+$/, '') + '/';
            let currentReferences = this.json.references[currentPath];

            // We found a mapping that matches the search path
            // e.g. mapping /a/b for path /a/b
            if (searchPathForTest === currentPathForTest) {
                foundMatchingMappings = true;
                currentReferences = this.resolveReferences(currentReferences, flags);

                if (typeof currentReferences === 'undefined' || 0 === currentReferences.length) {
                    continue;
                }

                result[currentPath] = currentReferences;

                if ((flags & this.STOP_ON_FIRST) && typeof this.json._order[currentPath] === 'undefined') {
                    return result;
                }
            }

            // We found a mapping that lies within the search path
            // e.g. mapping /a/b/c for path /a/b
            if ((flags & this.INCLUDE_NESTED) && 0 === currentPathForTest.indexOf(searchPathForTest)) {
                foundMatchingMappings = true;
                currentReferences = this.resolveReferences(currentReferences, flags);

                if (typeof currentReferences === 'undefined' || 0 === currentReferences.length) {
                    continue;
                }

                result[currentPath] = currentReferences;

                if ((flags & this.STOP_ON_FIRST) && typeof this.json._order[currentPath] === 'undefined') {
                    return result;
                }
            }

            // We found a mapping that is an ancestor of the search path
            // e.g. mapping /a for path /a/b
            if (0 === searchPathForTest.indexOf(currentPathForTest)) {
                foundMatchingMappings = true;

                if (flags & this.INCLUDE_ANCESTORS) {
                    // Include the references of the ancestor
                    currentReferences = this.resolveReferences(currentReferences, flags);

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
            }

            // We did not find anything but previously found mappings
            // The mappings are sorted alphabetically, so we can safely abort
            if (foundMatchingMappings) {
                break;
            }
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
    resolveReferences(references, flags) {
        let result = [];

        if (! Array.isArray(references)) {
            references = [ references ];
        }

        for (let i in references) {
            if (! references.hasOwnProperty(i)) {
                continue;
            }

            result.push(references[i].getReference());

            if (flags & this.STOP_ON_FIRST) {
                return result;
            }
        }

        return result;
    }

}
