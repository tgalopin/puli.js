'use strict';

/* global it, describe */

import Assert from './Assert';
import Puli from '../dist/Puli.js';
import ResourceVirtualException from '../dist/Exception/ResourceVirtualException.js';

describe('Puli - Advanced (with order and orverride) -', () => {

    it('path() override', () => {
        let repo = Puli.load(__dirname + '/fixtures/override.json', __dirname + '/fixtures');

        Assert.pathEquals(repo.path('/webmozart/file'), __dirname + '/fixtures/resources/dir1/file1');
    });

    it('path() expects non-virtual resource', () => {
        let repo = Puli.load(__dirname + '/fixtures/override.json', __dirname + '/fixtures');

        Assert.exception(() => { repo.path('/'); }, ResourceVirtualException);
        Assert.exception(() => { repo.path('/webmozart'); }, ResourceVirtualException);
    });

    it('path() override subpath', () => {
        let repo = Puli.load(__dirname + '/fixtures/override-sub-path.json', __dirname + '/fixtures');

        Assert.pathEquals(repo.path('/webmozart/puli/file'), __dirname + '/fixtures/resources/file');
        Assert.pathEquals(repo.path('/webmozart/puli/file2'), __dirname + '/fixtures/resources/dir2/file2');
        Assert.pathEquals(repo.path('/webmozart/file1'), __dirname + '/fixtures/resources/dir1/file1');
    });

    it('path() override superpath', () => {
        let repo = Puli.load(__dirname + '/fixtures/override-super-path.json', __dirname + '/fixtures');

        Assert.pathEquals(repo.path('/webmozart/puli/file'), __dirname + '/fixtures/resources/file');
        Assert.pathEquals(repo.path('/webmozart/puli'), __dirname + '/fixtures/resources/dir1');
    });

});
