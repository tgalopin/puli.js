'use strict';

/* global it, describe */

import {expect, assert} from 'chai';
import Loader from '../dist/Loader.js';
import ConfigFileNotFoundException from '../dist/Exception/ConfigFileNotFoundException.js';
import ConfigFileInvalidException from '../dist/Exception/ConfigFileInvalidException.js';

describe('Loader', () => {

    // Exceptions
    it('load() expects existing configuration file', () => {
        expect(() => { Loader.load('/non-existing'); }).to.throw(ConfigFileNotFoundException);
    });

    it('load() expects valid JSON configuration file', () => {
        expect(() => { Loader.load(__dirname + '/fixtures/invalid-json.json'); }).to.throw(ConfigFileInvalidException);
    });

    // Test reference
    let fixtures = getLoadFixtures();

    for (let i in fixtures) {
        let file = fixtures[i];

        it('load("' + file + '")', () => {
            let loaded = Loader.load(__dirname + '/reference/' + file);

            assert.isObject(loaded);
            assert.isObject(loaded._order);
            assert.isObject(loaded.references);

            for (let path in loaded.references) {
                let reference = loaded.references[path];
                assert.isTrue(Array.isArray(reference) || typeof reference === 'string' || null === reference);
            }
        });
    }

    function getLoadFixtures() {
        return [
            'contains-discards-trailing-slash.json',
            'contains-expects-absolute-path.json',
            'contains-expects-non-empty-path.json',
            'contains-expects-string-path.json',
            'contains-interprets-consecutive-slashes-as-root.json',
            'contains-logs-warning-if-reference-not-found.json',
            'contains-path.json',
            'contains-pattern.json',
            'directory-link.json',
            'file-link.json',
            'find-brackets.json',
            'find-canonicalizes-glob.json',
            'find-directory.json',
            'find-expects-absolute-path.json',
            'find-expects-non-empty-path.json',
            'find-expects-string-path.json',
            'find-file.json',
            'find-full.json',
            'find.json',
            'find-logs-warning-if-reference-not-found.json',
            'find-no-matches.json',
            'get-body-resource.json',
            'get-canonicalizes-directory-paths.json',
            'get-canonicalizes-file-paths.json',
            'get-discards-trailing-slash.json',
            'get-dot-dot-in-directory.json',
            'get-dot-dot-in-file.json',
            'get-dot-dot-in-root.json',
            'get-dot-in-directory.json',
            'get-dot-in-file.json',
            'get-dot-in-root.json',
            'get-expects-absolute-path.json',
            'get-expects-existing-resource.json',
            'get-expects-non-empty-path.json',
            'get-expects-string-path.json',
            'get-interprets-consecutive-slashes-as-root.json',
            'get-logs-warning-if-reference-not-found.json',
            'get-resource.json',
            'get-root-versions.json',
            'get-versions-does-not-include-deleted-resources.json',
            'get-versions-fails-for-children-of-deleted-resources.json',
            'get-versions-fails-for-deleted-resources.json',
            'get-versions-fails-if-none-found.json',
            'get-versions.json',
            'get-versions-logs-warning-if-reference-not-found.json',
            'override-four-levels.json',
            'override.json',
            'override-sub-path.json',
            'override-super-and-sub-path-long-first.json',
            'override-super-and-sub-path-medium-first.json',
            'override-super-and-sub-path-short-first.json',
            'override-super-path.json'
        ];
    }

});
