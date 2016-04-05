'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Assert = require('./Assert');

var _Assert2 = _interopRequireDefault(_Assert);

var _distPuliJs = require('../dist/Puli.js');

var _distPuliJs2 = _interopRequireDefault(_distPuliJs);

var _distExceptionResourceNotFoundExceptionJs = require('../dist/Exception/ResourceNotFoundException.js');

var _distExceptionResourceNotFoundExceptionJs2 = _interopRequireDefault(_distExceptionResourceNotFoundExceptionJs);

var _distExceptionInvalidPathExceptionJs = require('../dist/Exception/InvalidPathException.js');

var _distExceptionInvalidPathExceptionJs2 = _interopRequireDefault(_distExceptionInvalidPathExceptionJs);

describe('Puli - Simple (without order nor orverride) -', function () {

    var simpleRepo = _distPuliJs2['default'].load(__dirname + '/fixtures/simple.json', __dirname + '/fixtures');

    it('path()', function () {
        _Assert2['default'].pathEquals(simpleRepo.path('/'), __dirname + '/fixtures/resources');
        _Assert2['default'].pathEquals(simpleRepo.path('/dir1'), __dirname + '/fixtures/resources/dir1');
        _Assert2['default'].pathEquals(simpleRepo.path('/dir2'), __dirname + '/fixtures/resources/dir2');
        _Assert2['default'].pathEquals(simpleRepo.path('/dir1/file1'), __dirname + '/fixtures/resources/dir1/file1');
        _Assert2['default'].pathEquals(simpleRepo.path('/dir2/file2'), __dirname + '/fixtures/resources/dir2/file2');
        _Assert2['default'].pathEquals(simpleRepo.path('/file'), __dirname + '/fixtures/resources/file');
    });

    it('path() discards trailing slash', function () {
        _Assert2['default'].equals(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/'));
    });

    it('path() interprets consecutive slashes as root', function () {
        _Assert2['default'].equals(simpleRepo.path('/'), simpleRepo.path('///'));
    });

    it('path() canonicalizes paths', function () {
        _Assert2['default'].equals(simpleRepo.path('/dir1/file1'), simpleRepo.path('/dir1/../dir1/./file1'));
    });

    it('path() expects existing resource', function () {
        _Assert2['default'].exception(function () {
            simpleRepo.path('/nonexisting');
        }, _distExceptionResourceNotFoundExceptionJs2['default']);
    });

    it('path() expects absolute path', function () {
        _Assert2['default'].exception(function () {
            simpleRepo.path('dir1');
        }, _distExceptionInvalidPathExceptionJs2['default']);
    });

    it('path() expects non-empty path', function () {
        _Assert2['default'].exception(function () {
            simpleRepo.path('');
        }, _distExceptionInvalidPathExceptionJs2['default']);
    });

    it('path() expects string path', function () {
        _Assert2['default'].exception(function () {
            simpleRepo.path({});
        }, _distExceptionInvalidPathExceptionJs2['default']);
    });

    it('path() get dot in directory', function () {
        _Assert2['default'].equals(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/.'));
    });

    it('path() get dot in root', function () {
        _Assert2['default'].equals(simpleRepo.path('/'), simpleRepo.path('/.'));
    });

    it('path() get dotdot in directory', function () {
        _Assert2['default'].equals(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/subdir/..'));
    });

    it('path() get dotdot in root', function () {
        _Assert2['default'].equals(simpleRepo.path('/'), simpleRepo.path('/..'));
    });

    it('paths() without glob returns path()', function () {
        var globRepo = _distPuliJs2['default'].load(__dirname + '/fixtures/glob-direct.json', __dirname);

        _Assert2['default'].pathEquals(globRepo.paths('/')[0], __dirname);
        _Assert2['default'].pathEquals(globRepo.paths('/')[0], globRepo.path('/'));
        _Assert2['default'].pathEquals(globRepo.paths('/fixtures')[0], __dirname + '/fixtures');
        _Assert2['default'].pathEquals(globRepo.paths('/fixtures')[0], globRepo.path('/fixtures'));
        _Assert2['default'].pathEquals(globRepo.paths('/fixtures/resources/dir1')[0], __dirname + '/fixtures/resources/dir1');
        _Assert2['default'].pathEquals(globRepo.paths('/fixtures/resources/dir1')[0], globRepo.path('/fixtures/resources/dir1'));
        _Assert2['default'].pathEquals(globRepo.paths('/fixtures/resources/dir2')[0], __dirname + '/fixtures/resources/dir2');
        _Assert2['default'].pathEquals(globRepo.paths('/fixtures/resources/dir2')[0], globRepo.path('/fixtures/resources/dir2'));
    });

    it('paths() with nested glob', function () {
        var expectedKeys = ['/fixtures/resources/dir1/file1', '/fixtures/resources/dir2/file2', '/fixtures/resources/dir3/resources/nested', '/fixtures/resources/file', '/fixtures/resources/nested'];

        var globRepo = _distPuliJs2['default'].load(__dirname + '/fixtures/glob-nested.json', __dirname);
        var paths = globRepo.paths('/fixtures/resources/**');

        for (var i in expectedKeys) {
            if (!expectedKeys.hasOwnProperty(i)) {
                continue;
            }

            _Assert2['default'].isTrue(paths.indexOf(globRepo.path(expectedKeys[i])) > -1);
        }
    });

    it('exists() without glob', function () {
        var globRepo = _distPuliJs2['default'].load(__dirname + '/fixtures/glob-direct.json', __dirname);

        _Assert2['default'].isTrue(globRepo.exists('/'));
        _Assert2['default'].isTrue(globRepo.exists('/fixtures'));
        _Assert2['default'].isTrue(globRepo.exists('/fixtures/resources/dir1'));
        _Assert2['default'].isTrue(globRepo.exists('/fixtures/resources/dir2'));
        _Assert2['default'].isFalse(globRepo.exists('/fixtures/resources/invalid'));
    });

    it('exists() with nested glob', function () {
        var globRepo = _distPuliJs2['default'].load(__dirname + '/fixtures/glob-nested.json', __dirname);

        _Assert2['default'].isTrue(globRepo.exists('/'));
        _Assert2['default'].isTrue(globRepo.exists('/fixtures'));
        _Assert2['default'].isTrue(globRepo.exists('/fixtures/resources/**'));
        _Assert2['default'].isFalse(globRepo.exists('/fixtures/resources/*/*/invalid'));
    });
});