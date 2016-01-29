'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distReferenceJs = require('../dist/Reference.js');

var _distReferenceJs2 = _interopRequireDefault(_distReferenceJs);

describe('Reference', function () {

    it('isVirtualReference()', function () {
        var path = null;
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isVirtualReference());
        _chai.assert.isFalse(reference.isFilesystemReference());
        _chai.assert.isFalse(reference.isLinkReference());
    });

    it('isLinkReference()', function () {
        var path = '@/link';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isLinkReference());
        _chai.assert.isFalse(reference.isFilesystemReference());
        _chai.assert.isFalse(reference.isVirtualReference());
    });

    it('isFilesystemReference() absolute Unix', function () {
        var path = '/tgalopin/absolute/foo/bar';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isFilesystemReference());
        _chai.assert.isFalse(reference.isLinkReference());
        _chai.assert.isFalse(reference.isVirtualReference());
    });

    it('isFilesystemReference() absolute Windows', function () {
        var path = 'C:\\Users\\tgalopin\\absolute\\foo\\bar';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isFilesystemReference());
        _chai.assert.isFalse(reference.isLinkReference());
        _chai.assert.isFalse(reference.isVirtualReference());
    });

    it('isFilesystemReference() relative Unix', function () {
        var path = '../../tgalopin/relative/../foo/bar';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isFilesystemReference());
        _chai.assert.isFalse(reference.isLinkReference());
        _chai.assert.isFalse(reference.isVirtualReference());
    });

    it('isFilesystemReference() relative Windows', function () {
        var path = '..\\tgalopin\\relative\\..\\foo\\bar';
        var reference = new _distReferenceJs2['default'](path);

        _chai.assert.equal(path, reference.getReference());
        _chai.assert.isTrue(reference.isFilesystemReference());
        _chai.assert.isFalse(reference.isLinkReference());
        _chai.assert.isFalse(reference.isVirtualReference());
    });
});