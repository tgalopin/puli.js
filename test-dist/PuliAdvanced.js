'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distPuliJs = require('../dist/Puli.js');

var _distPuliJs2 = _interopRequireDefault(_distPuliJs);

var _distExceptionResourceNotFoundExceptionJs = require('../dist/Exception/ResourceNotFoundException.js');

var _distExceptionResourceNotFoundExceptionJs2 = _interopRequireDefault(_distExceptionResourceNotFoundExceptionJs);

var _distExceptionResourceVirtualExceptionJs = require('../dist/Exception/ResourceVirtualException.js');

var _distExceptionResourceVirtualExceptionJs2 = _interopRequireDefault(_distExceptionResourceVirtualExceptionJs);

describe('Puli - Advanced (with order and orverride) -', function () {

    it('path() override', function () {
        var repo = _distPuliJs2['default'].load(__dirname + '/fixtures/override.json', __dirname + '/fixtures');

        _chai.assert.equal(repo.path('/webmozart/file'), __dirname + '/fixtures/resources/dir1/file1');
    });

    it('path() expects non-virtual resource', function () {
        var repo = _distPuliJs2['default'].load(__dirname + '/fixtures/override.json', __dirname + '/fixtures');

        (0, _chai.expect)(function () {
            repo.path('/');
        }).to['throw'](_distExceptionResourceVirtualExceptionJs2['default']);
        (0, _chai.expect)(function () {
            repo.path('/webmozart');
        }).to['throw'](_distExceptionResourceVirtualExceptionJs2['default']);
    });

    it('path() override subpath', function () {
        var repo = _distPuliJs2['default'].load(__dirname + '/fixtures/override-sub-path.json', __dirname + '/fixtures');

        _chai.assert.equal(repo.path('/webmozart/puli/file'), __dirname + '/fixtures/resources/file');
        _chai.assert.equal(repo.path('/webmozart/puli/file2'), __dirname + '/fixtures/resources/dir2/file2');
        _chai.assert.equal(repo.path('/webmozart/file1'), __dirname + '/fixtures/resources/dir1/file1');
    });

    it('path() override superpath', function () {
        var repo = _distPuliJs2['default'].load(__dirname + '/fixtures/override-super-path.json', __dirname + '/fixtures');

        _chai.assert.equal(repo.path('/webmozart/puli/file'), __dirname + '/fixtures/resources/file');
        _chai.assert.equal(repo.path('/webmozart/puli'), __dirname + '/fixtures/resources/dir1');
    });
});