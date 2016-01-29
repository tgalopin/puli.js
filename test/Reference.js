'use strict';

/* global it, describe */

import {assert} from 'chai';
import Reference from '../dist/Reference.js';

describe('Reference', () => {

    it('isVirtual()', () => {
        let path = null;
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isVirtual());
        assert.isFalse(reference.isFilesystem());
        assert.isFalse(reference.isLink());
    });

    it('isLink()', () => {
        let path = '@/link';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isLink());
        assert.isFalse(reference.isFilesystem());
        assert.isFalse(reference.isVirtual());
    });

    it('isFilesystem() absolute Unix', () => {
        let path = '/tgalopin/absolute/foo/bar';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isFilesystem());
        assert.isFalse(reference.isLink());
        assert.isFalse(reference.isVirtual());
    });

    it('isFilesystem() absolute Windows', () => {
        let path = 'C:\\Users\\tgalopin\\absolute\\foo\\bar';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isFilesystem());
        assert.isFalse(reference.isLink());
        assert.isFalse(reference.isVirtual());
    });

    it('isFilesystem() relative Unix', () => {
        let path = '../../tgalopin/relative/../foo/bar';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isFilesystem());
        assert.isFalse(reference.isLink());
        assert.isFalse(reference.isVirtual());
    });

    it('isFilesystem() relative Windows', () => {
        let path = '..\\tgalopin\\relative\\..\\foo\\bar';
        let reference = new Reference(path);

        assert.equal(path, reference.getReference());
        assert.isTrue(reference.isFilesystem());
        assert.isFalse(reference.isLink());
        assert.isFalse(reference.isVirtual());
    });

});
