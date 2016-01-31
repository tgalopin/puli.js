'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

/**
 * Resolves Puli virtulal paths into filesystem paths.
 * You should not use this component directly. Use the Puli
 * public object instead.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */

var Resolver = (function () {
    function Resolver(json, baseDirectory) {
        _classCallCheck(this, Resolver);

        this.json = json;
        this.baseDirectory = baseDirectory;

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

    _createClass(Resolver, [{
        key: 'searchReferences',
        value: function searchReferences(searchPath, flags) {
            var result = {};
            var foundMatchingMappings = false;

            searchPath = searchPath.replace(/\/+$/, '');
            var searchPathForTest = searchPath + '/';

            for (var currentPath in this.json.references) {
                if (!this.json.references.hasOwnProperty(currentPath)) {
                    continue;
                }

                var currentPathForTest = currentPath.replace(/\/+$/, '') + '/';
                var currentReferences = this.json.references[currentPath];

                // We found a mapping that matches the search path
                // e.g. mapping /a/b for path /a/b
                if (searchPathForTest === currentPathForTest) {
                    foundMatchingMappings = true;
                    currentReferences = this.resolveReferences(currentReferences, flags);

                    if (typeof currentReferences === 'undefined' || 0 === currentReferences.length) {
                        continue;
                    }

                    result[currentPath] = currentReferences;

                    if (flags & this.STOP_ON_FIRST && typeof this.json._order[currentPath] === 'undefined') {
                        return result;
                    }
                }

                // We found a mapping that lies within the search path
                // e.g. mapping /a/b/c for path /a/b
                if (flags & this.INCLUDE_NESTED && 0 === currentPathForTest.indexOf(searchPathForTest)) {
                    foundMatchingMappings = true;
                    currentReferences = this.resolveReferences(currentReferences, flags);

                    if (typeof currentReferences === 'undefined' || 0 === currentReferences.length) {
                        continue;
                    }

                    result[currentPath] = currentReferences;

                    if (flags & this.STOP_ON_FIRST && typeof this.json._order[currentPath] === 'undefined') {
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
                        if (flags & this.STOP_ON_FIRST && typeof this.json._order[currentPath] === 'undefined') {
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
    }, {
        key: 'resolveReferences',
        value: function resolveReferences(references, flags) {
            var result = [];

            if (!Array.isArray(references)) {
                references = [references];
            }

            for (var i in references) {
                if (!references.hasOwnProperty(i)) {
                    continue;
                }

                var reference = references[i];
                var referenceValue = reference.getReference();

                if (reference.isFilesystemReference()) {
                    referenceValue = this.baseDirectory.replace(/\/+$/, '') + '/' + referenceValue.replace(/^\/+/, '');
                    referenceValue = _path2['default'].normalize(referenceValue);
                }

                result.push(referenceValue);

                if (flags & this.STOP_ON_FIRST) {
                    return result;
                }
            }

            return result;
        }
    }, {
        key: 'flatten',
        value: function flatten(references) {
            var keys = Object.keys(references);

            if (0 === keys.length) {
                return null;
            }

            return references[keys[0]];
        }
    }]);

    return Resolver;
})();

exports['default'] = Resolver;
module.exports = exports['default'];