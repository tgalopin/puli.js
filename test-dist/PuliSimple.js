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

    var repo = _distPuliJs2['default'].load(__dirname + '/fixtures/simple.json', __dirname + '/fixtures');

    it('path()', function () {
        _chai.assert.equal(repo.path('/'), __dirname + '/fixtures/resources');
        _chai.assert.equal(repo.path('/dir1'), __dirname + '/fixtures/resources/dir1');
        _chai.assert.equal(repo.path('/dir2'), __dirname + '/fixtures/resources/dir2');
        _chai.assert.equal(repo.path('/dir1/file1'), __dirname + '/fixtures/resources/dir1/file1');
        _chai.assert.equal(repo.path('/dir2/file2'), __dirname + '/fixtures/resources/dir2/file2');
        _chai.assert.equal(repo.path('/file'), __dirname + '/fixtures/resources/file');
    });

    it('path() discards trailing slash', function () {
        _chai.assert.equal(repo.path('/dir1'), repo.path('/dir1/'));
    });

    it('path() interprets consecutive slashes as root', function () {
        _chai.assert.equal(repo.path('/'), repo.path('///'));
    });

    it('path() canonicalizes paths', function () {
        _chai.assert.equal(repo.path('/dir1/file1'), repo.path('/dir1/../dir1/./file1'));
    });

    it('path() expects existing resource', function () {
        (0, _chai.expect)(function () {
            repo.path('/nonexisting');
        }).to['throw'](_distExceptionResourceNotFoundExceptionJs2['default']);
    });

    it('path() expects absolute path', function () {
        (0, _chai.expect)(function () {
            repo.path('dir1');
        }).to['throw'](_distExceptionInvalidPathExceptionJs2['default']);
    });

    it('path() expects non-empty path', function () {
        (0, _chai.expect)(function () {
            repo.path('');
        }).to['throw'](_distExceptionInvalidPathExceptionJs2['default']);
    });

    it('path() expects string path', function () {
        (0, _chai.expect)(function () {
            repo.path({});
        }).to['throw'](_distExceptionInvalidPathExceptionJs2['default']);
    });

    it('path() get dot in directory', function () {
        _chai.assert.equal(repo.path('/dir1'), repo.path('/dir1/.'));
    });

    it('path() get dot in root', function () {
        _chai.assert.equal(repo.path('/'), repo.path('/.'));
    });

    it('path() get dotdot in directory', function () {
        _chai.assert.equal(repo.path('/dir1'), repo.path('/dir1/subdir/..'));
    });

    it('path() get dotdot in root', function () {
        _chai.assert.equal(repo.path('/'), repo.path('/..'));
    });
});