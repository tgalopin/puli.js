'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distPuliJs = require('../dist/Puli.js');

var _distPuliJs2 = _interopRequireDefault(_distPuliJs);

var _distExceptionResourceNotFoundExceptionJs = require('../dist/Exception/ResourceNotFoundException.js');

var _distExceptionResourceNotFoundExceptionJs2 = _interopRequireDefault(_distExceptionResourceNotFoundExceptionJs);

var _distExceptionInvalidPathExceptionJs = require('../dist/Exception/InvalidPathException.js');

var _distExceptionInvalidPathExceptionJs2 = _interopRequireDefault(_distExceptionInvalidPathExceptionJs);

describe('Puli - Simple (without order nor orverride) -', function () {

    var simpleRepo = _distPuliJs2['default'].load(__dirname + '/fixtures/simple.json', __dirname + '/fixtures');

    it('path()', function () {
        _chai.assert.equal(simpleRepo.path('/'), __dirname + '/fixtures/resources');
        _chai.assert.equal(simpleRepo.path('/dir1'), __dirname + '/fixtures/resources/dir1');
        _chai.assert.equal(simpleRepo.path('/dir2'), __dirname + '/fixtures/resources/dir2');
        _chai.assert.equal(simpleRepo.path('/dir1/file1'), __dirname + '/fixtures/resources/dir1/file1');
        _chai.assert.equal(simpleRepo.path('/dir2/file2'), __dirname + '/fixtures/resources/dir2/file2');
        _chai.assert.equal(simpleRepo.path('/file'), __dirname + '/fixtures/resources/file');
    });

    it('path() discards trailing slash', function () {
        _chai.assert.equal(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/'));
    });

    it('path() interprets consecutive slashes as root', function () {
        _chai.assert.equal(simpleRepo.path('/'), simpleRepo.path('///'));
    });

    it('path() canonicalizes paths', function () {
        _chai.assert.equal(simpleRepo.path('/dir1/file1'), simpleRepo.path('/dir1/../dir1/./file1'));
    });

    it('path() expects existing resource', function () {
        (0, _chai.expect)(function () {
            simpleRepo.path('/nonexisting');
        }).to['throw'](_distExceptionResourceNotFoundExceptionJs2['default']);
    });

    it('path() expects absolute path', function () {
        (0, _chai.expect)(function () {
            simpleRepo.path('dir1');
        }).to['throw'](_distExceptionInvalidPathExceptionJs2['default']);
    });

    it('path() expects non-empty path', function () {
        (0, _chai.expect)(function () {
            simpleRepo.path('');
        }).to['throw'](_distExceptionInvalidPathExceptionJs2['default']);
    });

    it('path() expects string path', function () {
        (0, _chai.expect)(function () {
            simpleRepo.path({});
        }).to['throw'](_distExceptionInvalidPathExceptionJs2['default']);
    });

    it('path() get dot in directory', function () {
        _chai.assert.equal(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/.'));
    });

    it('path() get dot in root', function () {
        _chai.assert.equal(simpleRepo.path('/'), simpleRepo.path('/.'));
    });

    it('path() get dotdot in directory', function () {
        _chai.assert.equal(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/subdir/..'));
    });

    it('path() get dotdot in root', function () {
        _chai.assert.equal(simpleRepo.path('/'), simpleRepo.path('/..'));
    });

    it('paths() without glob returns path()', function () {
        var globRepo = _distPuliJs2['default'].load(__dirname + '/fixtures/glob-direct.json', __dirname);

        _chai.assert.equal(globRepo.paths('/'), __dirname);
        _chai.assert.equal(globRepo.paths('/'), globRepo.path('/'));
        _chai.assert.equal(globRepo.paths('/fixtures'), __dirname + '/fixtures');
        _chai.assert.equal(globRepo.paths('/fixtures'), globRepo.path('/fixtures'));
        _chai.assert.equal(globRepo.paths('/fixtures/resources/dir1'), __dirname + '/fixtures/resources/dir1');
        _chai.assert.equal(globRepo.paths('/fixtures/resources/dir1'), globRepo.path('/fixtures/resources/dir1'));
        _chai.assert.equal(globRepo.paths('/fixtures/resources/dir2'), __dirname + '/fixtures/resources/dir2');
        _chai.assert.equal(globRepo.paths('/fixtures/resources/dir2'), globRepo.path('/fixtures/resources/dir2'));
    });

    it('paths() with nested glob', function () {
        var globRepo = _distPuliJs2['default'].load(__dirname + '/fixtures/glob-nested.json', __dirname);

        console.log(globRepo.paths('/fixtures/resources/**'));
    });
});