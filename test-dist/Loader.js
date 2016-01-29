'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distLoaderJs = require('../dist/Loader.js');

var _distLoaderJs2 = _interopRequireDefault(_distLoaderJs);

var _distReferenceJs = require('../dist/Reference.js');

var _distReferenceJs2 = _interopRequireDefault(_distReferenceJs);

describe('Loader', function () {

    it('_buildReference() single virtual', function () {
        var built = _distLoaderJs2['default']._buildReference(null);

        _chai.assert.isObject(built);
        _chai.assert.isTrue(built.isVirtual());
    });

    it('_buildReference() single link', function () {
        var built = _distLoaderJs2['default']._buildReference('@/tgalopin/link');

        _chai.assert.isObject(built);
        _chai.assert.isTrue(built.isLink());
    });

    it('_buildReference() single filesystem', function () {
        var built = _distLoaderJs2['default']._buildReference('/tgalopin/filesystem');

        _chai.assert.isObject(built);
        _chai.assert.isTrue(built.isFilesystem());
    });

    it('_buildReference() collection virtuals', function () {
        var built = _distLoaderJs2['default']._buildReference([null, null]);

        _chai.assert.isArray(built);

        for (var i in built) {
            _chai.assert.isObject(built[i]);
            _chai.assert.isTrue(built[i].isVirtual());
        }
    });

    it('_buildReference() collection links', function () {
        var built = _distLoaderJs2['default']._buildReference(['@/tgalopin/link1', '@/tgalopin/link2']);

        _chai.assert.isArray(built);

        for (var i in built) {
            _chai.assert.isObject(built[i]);
            _chai.assert.isTrue(built[i].isLink());
        }
    });

    it('_buildReference() collection filesystems', function () {
        var built = _distLoaderJs2['default']._buildReference(['/tgalopin/filesystem1', '/tgalopin/filesystem2']);

        _chai.assert.isArray(built);

        for (var i in built) {
            _chai.assert.isObject(built[i]);
            _chai.assert.isTrue(built[i].isFilesystem());
        }
    });

    it('_buildReference() collection mixed', function () {
        var built = _distLoaderJs2['default']._buildReference([null, '@/tgalopin/link1', '/tgalopin/filesystem2']);

        _chai.assert.isArray(built);

        _chai.assert.isObject(built[0]);
        _chai.assert.isTrue(built[0].isVirtual());

        _chai.assert.isObject(built[1]);
        _chai.assert.isTrue(built[1].isLink());

        _chai.assert.isObject(built[2]);
        _chai.assert.isTrue(built[2].isFilesystem());
    });

    var fixtures = getLoadFixtures();

    var _loop = function (i) {
        var file = fixtures[i];

        it('load("' + file + '")', function () {
            var loaded = _distLoaderJs2['default'].load(__dirname + '/fixtures/' + file);

            _chai.assert.isObject(loaded);
            _chai.assert.isObject(loaded._order);
            _chai.assert.isObject(loaded.references);

            for (var path in loaded.references) {
                var reference = loaded.references[path];
                _chai.assert.isTrue(Array.isArray(reference) || reference instanceof _distReferenceJs2['default']);
            }
        });
    };

    for (var i in fixtures) {
        _loop(i);
    }

    function getLoadFixtures() {
        return ['contains-discards-trailing-slash.json', 'contains-expects-absolute-path.json', 'contains-expects-non-empty-path.json', 'contains-expects-string-path.json', 'contains-interprets-consecutive-slashes-as-root.json', 'contains-logs-warning-if-reference-not-found.json', 'contains-path.json', 'contains-pattern.json', 'directory-link.json', 'file-link.json', 'find-brackets.json', 'find-canonicalizes-glob.json', 'find-directory.json', 'find-expects-absolute-path.json', 'find-expects-non-empty-path.json', 'find-expects-string-path.json', 'find-file.json', 'find-full.json', 'find.json', 'find-logs-warning-if-reference-not-found.json', 'find-no-matches.json', 'get-body-resource.json', 'get-canonicalizes-directory-paths.json', 'get-canonicalizes-file-paths.json', 'get-discards-trailing-slash.json', 'get-dot-dot-in-directory.json', 'get-dot-dot-in-file.json', 'get-dot-dot-in-root.json', 'get-dot-in-directory.json', 'get-dot-in-file.json', 'get-dot-in-root.json', 'get-expects-absolute-path.json', 'get-expects-existing-resource.json', 'get-expects-non-empty-path.json', 'get-expects-string-path.json', 'get-interprets-consecutive-slashes-as-root.json', 'get-logs-warning-if-reference-not-found.json', 'get-resource.json', 'get-root-versions.json', 'get-versions-does-not-include-deleted-resources.json', 'get-versions-fails-for-children-of-deleted-resources.json', 'get-versions-fails-for-deleted-resources.json', 'get-versions-fails-if-none-found.json', 'get-versions.json', 'get-versions-logs-warning-if-reference-not-found.json', 'override-four-levels.json', 'override.json', 'override-sub-path.json', 'override-super-and-sub-path-long-first.json', 'override-super-and-sub-path-medium-first.json', 'override-super-and-sub-path-short-first.json', 'override-super-path.json'];
    }
});