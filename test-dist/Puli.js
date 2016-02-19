'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distPuliJs = require('../dist/Puli.js');

var _distPuliJs2 = _interopRequireDefault(_distPuliJs);

var _distExceptionResourceNotFoundExceptionJs = require('../dist/Exception/ResourceNotFoundException.js');

var _distExceptionResourceNotFoundExceptionJs2 = _interopRequireDefault(_distExceptionResourceNotFoundExceptionJs);

describe('Puli', function () {

    var repoPathSimple = _distPuliJs2['default'].load(__dirname + '/fixtures/path-simple.json', __dirname + '/fixtures');

    it('path() simple', function () {
        _chai.assert.equal(repoPathSimple.path('/'), __dirname + '/fixtures/resources');
        _chai.assert.equal(repoPathSimple.path('/dir1'), __dirname + '/fixtures/resources/dir1');
        _chai.assert.equal(repoPathSimple.path('/dir2'), __dirname + '/fixtures/resources/dir2');
        _chai.assert.equal(repoPathSimple.path('/dir1/file1'), __dirname + '/fixtures/resources/dir1/file1');
        _chai.assert.equal(repoPathSimple.path('/dir2/file2'), __dirname + '/fixtures/resources/dir2/file2');
        _chai.assert.equal(repoPathSimple.path('/file'), __dirname + '/fixtures/resources/file');
    });

    it('path() discards trailing slash', function () {
        _chai.assert.equal(repoPathSimple.path('/dir1'), repoPathSimple.path('/dir1/'));
    });

    it('path() interprets consecutive slashes as root', function () {
        _chai.assert.equal(repoPathSimple.path('/'), repoPathSimple.path('///'));
    });

    it('path() canonicalizes paths', function () {
        _chai.assert.equal(repoPathSimple.path('/dir1/file1'), repoPathSimple.path('/dir1/../dir1/./file1'));
    });

    it('path() expects existing resource', function () {
        (0, _chai.expect)(function () {
            repoPathSimple.path('/nonexisting');
        }).to['throw'](_distExceptionResourceNotFoundExceptionJs2['default']);
    });
});