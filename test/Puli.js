'use strict';

/* global it, describe */

import {expect, assert} from 'chai';
import Puli from '../dist/Puli.js';
import ResourceNotFoundException from '../dist/Exception/ResourceNotFoundException.js';

describe('Puli', () => {

    let repoPathSimple = Puli.load(__dirname + '/fixtures/path-simple.json', __dirname + '/fixtures');

    it('path() simple', () => {
        assert.equal(repoPathSimple.path('/'), __dirname + '/fixtures/resources');
        assert.equal(repoPathSimple.path('/dir1'), __dirname + '/fixtures/resources/dir1');
        assert.equal(repoPathSimple.path('/dir2'), __dirname + '/fixtures/resources/dir2');
        assert.equal(repoPathSimple.path('/dir1/file1'), __dirname + '/fixtures/resources/dir1/file1');
        assert.equal(repoPathSimple.path('/dir2/file2'), __dirname + '/fixtures/resources/dir2/file2');
        assert.equal(repoPathSimple.path('/file'), __dirname + '/fixtures/resources/file');
    });

    it('path() discards trailing slash', () => {
        assert.equal(repoPathSimple.path('/dir1'), repoPathSimple.path('/dir1/'));
    });

    it('path() interprets consecutive slashes as root', () => {
        assert.equal(repoPathSimple.path('/'), repoPathSimple.path('///'));
    });

    it('path() canonicalizes paths', () => {
        assert.equal(repoPathSimple.path('/dir1/file1'), repoPathSimple.path('/dir1/../dir1/./file1'));
    });

    it('path() expects existing resource', () => {
        expect(() => { repoPathSimple.path('/nonexisting'); }).to.throw(ResourceNotFoundException);
    });

});
