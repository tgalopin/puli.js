'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distLoaderJs = require('../dist/Loader.js');

var _distLoaderJs2 = _interopRequireDefault(_distLoaderJs);

var _distExceptionConfigFileNotFoundExceptionJs = require('../dist/Exception/ConfigFileNotFoundException.js');

var _distExceptionConfigFileNotFoundExceptionJs2 = _interopRequireDefault(_distExceptionConfigFileNotFoundExceptionJs);

var _distExceptionConfigFileInvalidExceptionJs = require('../dist/Exception/ConfigFileInvalidException.js');

var _distExceptionConfigFileInvalidExceptionJs2 = _interopRequireDefault(_distExceptionConfigFileInvalidExceptionJs);

describe('Loader', function () {

    // Exceptions
    it('load() expects existing configuration file', function () {
        (0, _chai.expect)(function () {
            _distLoaderJs2['default'].load('/non-existing');
        }).to['throw'](_distExceptionConfigFileNotFoundExceptionJs2['default']);
    });

    it('load() expects valid JSON configuration file', function () {
        (0, _chai.expect)(function () {
            _distLoaderJs2['default'].load(__dirname + '/fixtures/invalid.json');
        }).to['throw'](_distExceptionConfigFileInvalidExceptionJs2['default']);
    });

    // Test reference
    var fixtures = getLoadFixtures();

    var buildLoadAssertFunction = function buildLoadAssertFunction(file) {
        return function () {
            var loaded = _distLoaderJs2['default'].load(__dirname + '/reference/' + file);

            _chai.assert.isObject(loaded);
            _chai.assert.isObject(loaded._order);
            _chai.assert.isObject(loaded.references);

            for (var path in loaded.references) {
                if (!loaded.references.hasOwnProperty(path)) {
                    continue;
                }

                var reference = loaded.references[path];
                _chai.assert.isTrue(Array.isArray(reference) || typeof reference === 'string' || null === reference);
            }
        };
    };

    for (var i in fixtures) {
        if (!fixtures.hasOwnProperty(i)) {
            continue;
        }

        it('load("' + fixtures[i] + '")', buildLoadAssertFunction(fixtures[i]));
    }

    function getLoadFixtures() {
        return ['contains-discards-trailing-slash.json', 'contains-expects-absolute-path.json', 'contains-expects-non-empty-path.json', 'contains-expects-string-path.json', 'contains-interprets-consecutive-slashes-as-root.json', 'contains-logs-warning-if-reference-not-found.json', 'contains-path.json', 'contains-pattern.json', 'directory-link.json', 'file-link.json', 'find-brackets.json', 'find-canonicalizes-glob.json', 'find-directory.json', 'find-expects-absolute-path.json', 'find-expects-non-empty-path.json', 'find-expects-string-path.json', 'find-file.json', 'find-full.json', 'find.json', 'find-logs-warning-if-reference-not-found.json', 'find-no-matches.json', 'get-body-resource.json', 'get-canonicalizes-directory-paths.json', 'get-canonicalizes-file-paths.json', 'get-discards-trailing-slash.json', 'get-dot-dot-in-directory.json', 'get-dot-dot-in-file.json', 'get-dot-dot-in-root.json', 'get-dot-in-directory.json', 'get-dot-in-file.json', 'get-dot-in-root.json', 'get-expects-absolute-path.json', 'get-expects-existing-resource.json', 'get-expects-non-empty-path.json', 'get-expects-string-path.json', 'get-interprets-consecutive-slashes-as-root.json', 'get-logs-warning-if-reference-not-found.json', 'get-resource.json', 'get-root-versions.json', 'get-versions-does-not-include-deleted-resources.json', 'get-versions-fails-for-children-of-deleted-resources.json', 'get-versions-fails-for-deleted-resources.json', 'get-versions-fails-if-none-found.json', 'get-versions.json', 'get-versions-logs-warning-if-reference-not-found.json', 'override-four-levels.json', 'override.json', 'override-sub-path.json', 'override-super-and-sub-path-long-first.json', 'override-super-and-sub-path-medium-first.json', 'override-super-and-sub-path-short-first.json', 'override-super-path.json'];
    }
});