'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distReferenceJs = require('../dist/Reference.js');

var _distReferenceJs2 = _interopRequireDefault(_distReferenceJs);

describe('Reference', function () {

    it('isVirtual()', function () {
        var path = null;
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isVirtual());
        _chai.assert.isFalse(reference.isFilesystem());
        _chai.assert.isFalse(reference.isLink());
    });

    it('isLink()', function () {
        var path = '@/link';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isLink());
        _chai.assert.isFalse(reference.isFilesystem());
        _chai.assert.isFalse(reference.isVirtual());
    });

    it('isFilesystem() absolute Unix', function () {
        var path = '/tgalopin/absolute/foo/bar';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isFilesystem());
        _chai.assert.isFalse(reference.isLink());
        _chai.assert.isFalse(reference.isVirtual());
    });

    it('isFilesystem() absolute Windows', function () {
        var path = 'C:\\Users\\tgalopin\\absolute\\foo\\bar';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isFilesystem());
        _chai.assert.isFalse(reference.isLink());
        _chai.assert.isFalse(reference.isVirtual());
    });

    it('isFilesystem() relative Unix', function () {
        var path = '../../tgalopin/relative/../foo/bar';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isFilesystem());
        _chai.assert.isFalse(reference.isLink());
        _chai.assert.isFalse(reference.isVirtual());
    });

    it('isFilesystem() relative Windows', function () {
        var path = '..\\tgalopin\\relative\\..\\foo\\bar';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isFilesystem());
        _chai.assert.isFalse(reference.isLink());
        _chai.assert.isFalse(reference.isVirtual());
    });
});