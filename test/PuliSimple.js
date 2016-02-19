'use strict';

/* global it, describe */

import {expect, assert} from 'chai';
import Puli from '../dist/Puli.js';
import ResourceNotFoundException from '../dist/Exception/ResourceNotFoundException.js';
import InvalidPathException from '../dist/Exception/InvalidPathException.js';

describe('Puli - Simple (without order nor orverride) -', () => {

    let repo = Puli.load(__dirname + '/fixtures/simple.json', __dirname + '/fixtures');

    it('path()', () => {
        assert.equal(repo.path('/'), __dirname + '/fixtures/resources');
        assert.equal(repo.path('/dir1'), __dirname + '/fixtures/resources/dir1');
        assert.equal(repo.path('/dir2'), __dirname + '/fixtures/resources/dir2');
        assert.equal(repo.path('/dir1/file1'), __dirname + '/fixtures/resources/dir1/file1');
        assert.equal(repo.path('/dir2/file2'), __dirname + '/fixtures/resources/dir2/file2');
        assert.equal(repo.path('/file'), __dirname + '/fixtures/resources/file');
    });

    it('path() discards trailing slash', () => {
        assert.equal(repo.path('/dir1'), repo.path('/dir1/'));
    });

    it('path() interprets consecutive slashes as root', () => {
        assert.equal(repo.path('/'), repo.path('///'));
    });

    it('path() canonicalizes paths', () => {
        assert.equal(repo.path('/dir1/file1'), repo.path('/dir1/../dir1/./file1'));
    });

    it('path() expects existing resource', () => {
        expect(() => { repo.path('/nonexisting'); }).to.throw(ResourceNotFoundException);
    });

    it('path() expects absolute path', () => {
        expect(() => { repo.path('dir1'); }).to.throw(InvalidPathException);
    });

    it('path() expects non-empty path', () => {
        expect(() => { repo.path(''); }).to.throw(InvalidPathException);
    });

    it('path() expects string path', () => {
        expect(() => { repo.path({}); }).to.throw(InvalidPathException);
    });

    it('path() get dot in directory', () => {
        assert.equal(repo.path('/dir1'), repo.path('/dir1/.'));
    });

    it('path() get dot in root', () => {
        assert.equal(repo.path('/'), repo.path('/.'));
    });

    it('path() get dotdot in directory', () => {
        assert.equal(repo.path('/dir1'), repo.path('/dir1/subdir/..'));
    });

    it('path() get dotdot in root', () => {
        assert.equal(repo.path('/'), repo.path('/..'));
    });

});
