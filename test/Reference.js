'use strict';

/* global it, describe */

import {assert} from 'chai';
import Reference from '../dist/Reference.js';

describe('Reference', () => {

    it('isVirtualReference()', () => {
        let path = null;
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isVirtualReference());
        assert.isFalse(reference.isFilesystemReference());
        assert.isFalse(reference.isLinkReference());
    });

    it('isLinkReference()', () => {
        let path = '@/link';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isLinkReference());
        assert.isFalse(reference.isFilesystemReference());
        assert.isFalse(reference.isVirtualReference());
    });

    it('isFilesystemReference() absolute Unix', () => {
        let path = '/tgalopin/absolute/foo/bar';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isFilesystemReference());
        assert.isFalse(reference.isLinkReference());
        assert.isFalse(reference.isVirtualReference());
    });

    it('isFilesystemReference() absolute Windows', () => {
        let path = 'C:\\Users\\tgalopin\\absolute\\foo\\bar';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isFilesystemReference());
        assert.isFalse(reference.isLinkReference());
        assert.isFalse(reference.isVirtualReference());
    });

    it('isFilesystemReference() relative Unix', () => {
        let path = '../../tgalopin/relative/../foo/bar';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isFilesystemReference());
        assert.isFalse(reference.isLinkReference());
        assert.isFalse(reference.isVirtualReference());
    });

    it('isFilesystemReference() relative Windows', () => {
        let path = '..\\tgalopin\\relative\\..\\foo\\bar';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isFilesystemReference());
        assert.isFalse(reference.isLinkReference());
        assert.isFalse(reference.isVirtualReference());
    });

});
