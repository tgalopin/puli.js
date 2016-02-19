'use strict';

/* global it, describe */

import {expect, assert} from 'chai';
import Puli from '../dist/Puli.js';
import ResourceNotFoundException from '../dist/Exception/ResourceNotFoundException.js';
import ResourceVirtualException from '../dist/Exception/ResourceVirtualException.js';

describe('Puli - Advanced (with order and orverride) -', () => {

    it('path() override', () => {
        let repo = Puli.load(__dirname + '/fixtures/override.json', __dirname + '/fixtures');

        assert.equal(repo.path('/webmozart/file'), __dirname + '/fixtures/resources/dir1/file1');
    });

    it('path() expects non-virtual resource', () => {
        let repo = Puli.load(__dirname + '/fixtures/override.json', __dirname + '/fixtures');

        expect(() => { repo.path('/'); }).to.throw(ResourceVirtualException);
        expect(() => { repo.path('/webmozart'); }).to.throw(ResourceVirtualException);
    });

    it('path() override subpath', () => {
        let repo = Puli.load(__dirname + '/fixtures/override-sub-path.json', __dirname + '/fixtures');

        assert.equal(repo.path('/webmozart/puli/file'), __dirname + '/fixtures/resources/file');
        assert.equal(repo.path('/webmozart/puli/file2'), __dirname + '/fixtures/resources/dir2/file2');
        assert.equal(repo.path('/webmozart/file1'), __dirname + '/fixtures/resources/dir1/file1');
    });

});
