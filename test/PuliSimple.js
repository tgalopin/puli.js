'use strict';

/* global it, describe */

import {expect, assert} from 'chai';
import Puli from '../dist/Puli.js';
import ResourceNotFoundException from '../dist/Exception/ResourceNotFoundException.js';
import InvalidPathException from '../dist/Exception/InvalidPathException.js';

describe('Puli - Simple (without order nor orverride) -', () => {

    let simpleRepo = Puli.load(__dirname + '/fixtures/simple.json', __dirname + '/fixtures');

    it('path()', () => {
        assert.equal(simpleRepo.path('/'), __dirname + '/fixtures/resources');
        assert.equal(simpleRepo.path('/dir1'), __dirname + '/fixtures/resources/dir1');
        assert.equal(simpleRepo.path('/dir2'), __dirname + '/fixtures/resources/dir2');
        assert.equal(simpleRepo.path('/dir1/file1'), __dirname + '/fixtures/resources/dir1/file1');
        assert.equal(simpleRepo.path('/dir2/file2'), __dirname + '/fixtures/resources/dir2/file2');
        assert.equal(simpleRepo.path('/file'), __dirname + '/fixtures/resources/file');
    });

    it('path() discards trailing slash', () => {
        assert.equal(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/'));
    });

    it('path() interprets consecutive slashes as root', () => {
        assert.equal(simpleRepo.path('/'), simpleRepo.path('///'));
    });

    it('path() canonicalizes paths', () => {
        assert.equal(simpleRepo.path('/dir1/file1'), simpleRepo.path('/dir1/../dir1/./file1'));
    });

    it('path() expects existing resource', () => {
        expect(() => { simpleRepo.path('/nonexisting'); }).to.throw(ResourceNotFoundException);
    });

    it('path() expects absolute path', () => {
        expect(() => { simpleRepo.path('dir1'); }).to.throw(InvalidPathException);
    });

    it('path() expects non-empty path', () => {
        expect(() => { simpleRepo.path(''); }).to.throw(InvalidPathException);
    });

    it('path() expects string path', () => {
        expect(() => { simpleRepo.path({}); }).to.throw(InvalidPathException);
    });

    it('path() get dot in directory', () => {
        assert.equal(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/.'));
    });

    it('path() get dot in root', () => {
        assert.equal(simpleRepo.path('/'), simpleRepo.path('/.'));
    });

    it('path() get dotdot in directory', () => {
        assert.equal(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/subdir/..'));
    });

    it('path() get dotdot in root', () => {
        assert.equal(simpleRepo.path('/'), simpleRepo.path('/..'));
    });

    it('paths() without glob returns path()', () => {
        let globRepo = Puli.load(__dirname + '/fixtures/glob-direct.json', __dirname);

        assert.equal(globRepo.paths('/'), __dirname);
        assert.equal(globRepo.paths('/'), globRepo.path('/'));
        assert.equal(globRepo.paths('/fixtures'), __dirname + '/fixtures');
        assert.equal(globRepo.paths('/fixtures'), globRepo.path('/fixtures'));
        assert.equal(globRepo.paths('/fixtures/resources/dir1'), __dirname + '/fixtures/resources/dir1');
        assert.equal(globRepo.paths('/fixtures/resources/dir1'), globRepo.path('/fixtures/resources/dir1'));
        assert.equal(globRepo.paths('/fixtures/resources/dir2'), __dirname + '/fixtures/resources/dir2');
        assert.equal(globRepo.paths('/fixtures/resources/dir2'), globRepo.path('/fixtures/resources/dir2'));
    });

    it('paths() with nested glob', () => {
        let expectedKeys = [
            '/fixtures/resources/dir1/file1',
            '/fixtures/resources/dir2/file2',
            '/fixtures/resources/dir3/resources/nested',
            '/fixtures/resources/file',
            '/fixtures/resources/nested'
        ];

        let globRepo = Puli.load(__dirname + '/fixtures/glob-nested.json', __dirname);
        let paths = globRepo.paths('/fixtures/resources/**');

        for (let i in expectedKeys) {
            if (! expectedKeys.hasOwnProperty(i)) {
                continue;
            }

            assert(paths.indexOf(globRepo.path(expectedKeys[i])) > -1);
        }
    });

    it('exists() without glob', () => {
        let globRepo = Puli.load(__dirname + '/fixtures/glob-direct.json', __dirname);

        assert(globRepo.exists('/'));
        assert(globRepo.exists('/fixtures'));
        assert(globRepo.exists('/fixtures/resources/dir1'));
        assert(globRepo.exists('/fixtures/resources/dir2'));
        assert(! globRepo.exists('/fixtures/resources/invalid'));
    });

    it('exists() with nested glob', () => {
        let globRepo = Puli.load(__dirname + '/fixtures/glob-nested.json', __dirname);

        assert(globRepo.exists('/'));
        assert(globRepo.exists('/fixtures'));
        assert(globRepo.exists('/fixtures/resources/**'));
        assert(! globRepo.exists('/fixtures/resources/*/*/invalid'));
    });

});
