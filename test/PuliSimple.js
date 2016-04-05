'use strict';

/* global it, describe */

import Assert from './Assert';
import Puli from '../dist/Puli.js';
import ResourceNotFoundException from '../dist/Exception/ResourceNotFoundException.js';
import InvalidPathException from '../dist/Exception/InvalidPathException.js';

describe('Puli - Simple (without order nor orverride) -', () => {

    let simpleRepo = Puli.load(__dirname + '/fixtures/simple.json', __dirname + '/fixtures');

    it('path()', () => {
        Assert.pathEquals(simpleRepo.path('/'), __dirname + '/fixtures/resources');
        Assert.pathEquals(simpleRepo.path('/dir1'), __dirname + '/fixtures/resources/dir1');
        Assert.pathEquals(simpleRepo.path('/dir2'), __dirname + '/fixtures/resources/dir2');
        Assert.pathEquals(simpleRepo.path('/dir1/file1'), __dirname + '/fixtures/resources/dir1/file1');
        Assert.pathEquals(simpleRepo.path('/dir2/file2'), __dirname + '/fixtures/resources/dir2/file2');
        Assert.pathEquals(simpleRepo.path('/file'), __dirname + '/fixtures/resources/file');
    });

    it('path() discards trailing slash', () => {
        Assert.equals(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/'));
    });

    it('path() interprets consecutive slashes as root', () => {
        Assert.equals(simpleRepo.path('/'), simpleRepo.path('///'));
    });

    it('path() canonicalizes paths', () => {
        Assert.equals(simpleRepo.path('/dir1/file1'), simpleRepo.path('/dir1/../dir1/./file1'));
    });

    it('path() expects existing resource', () => {
        Assert.exception(() => { simpleRepo.path('/nonexisting'); }, ResourceNotFoundException);
    });

    it('path() expects absolute path', () => {
        Assert.exception(() => { simpleRepo.path('dir1'); }, InvalidPathException);
    });

    it('path() expects non-empty path', () => {
        Assert.exception(() => { simpleRepo.path(''); }, InvalidPathException);
    });

    it('path() expects string path', () => {
        Assert.exception(() => { simpleRepo.path({}); }, InvalidPathException);
    });

    it('path() get dot in directory', () => {
        Assert.equals(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/.'));
    });

    it('path() get dot in root', () => {
        Assert.equals(simpleRepo.path('/'), simpleRepo.path('/.'));
    });

    it('path() get dotdot in directory', () => {
        Assert.equals(simpleRepo.path('/dir1'), simpleRepo.path('/dir1/subdir/..'));
    });

    it('path() get dotdot in root', () => {
        Assert.equals(simpleRepo.path('/'), simpleRepo.path('/..'));
    });

    it('paths() without glob returns path()', () => {
        let globRepo = Puli.load(__dirname + '/fixtures/glob-direct.json', __dirname);

        Assert.pathEquals(globRepo.paths('/')[0], __dirname);
        Assert.pathEquals(globRepo.paths('/')[0], globRepo.path('/'));
        Assert.pathEquals(globRepo.paths('/fixtures')[0], __dirname + '/fixtures');
        Assert.pathEquals(globRepo.paths('/fixtures')[0], globRepo.path('/fixtures'));
        Assert.pathEquals(globRepo.paths('/fixtures/resources/dir1')[0], __dirname + '/fixtures/resources/dir1');
        Assert.pathEquals(globRepo.paths('/fixtures/resources/dir1')[0], globRepo.path('/fixtures/resources/dir1'));
        Assert.pathEquals(globRepo.paths('/fixtures/resources/dir2')[0], __dirname + '/fixtures/resources/dir2');
        Assert.pathEquals(globRepo.paths('/fixtures/resources/dir2')[0], globRepo.path('/fixtures/resources/dir2'));
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

            Assert.isTrue(paths.indexOf(globRepo.path(expectedKeys[i])) > -1);
        }
    });

    it('exists() without glob', () => {
        let globRepo = Puli.load(__dirname + '/fixtures/glob-direct.json', __dirname);

        Assert.isTrue(globRepo.exists('/'));
        Assert.isTrue(globRepo.exists('/fixtures'));
        Assert.isTrue(globRepo.exists('/fixtures/resources/dir1'));
        Assert.isTrue(globRepo.exists('/fixtures/resources/dir2'));
        Assert.isFalse(globRepo.exists('/fixtures/resources/invalid'));
    });

    it('exists() with nested glob', () => {
        let globRepo = Puli.load(__dirname + '/fixtures/glob-nested.json', __dirname);

        Assert.isTrue(globRepo.exists('/'));
        Assert.isTrue(globRepo.exists('/fixtures'));
        Assert.isTrue(globRepo.exists('/fixtures/resources/**'));
        Assert.isFalse(globRepo.exists('/fixtures/resources/*/*/invalid'));
    });

});
