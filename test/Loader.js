'use strict';

/* global it, describe */

import {assert} from 'chai';
import Loader from '../dist/Loader.js';
import Reference from '../dist/Reference.js';

describe('Loader', () => {

    it('_buildReference() single virtual', () => {
        let built = Loader._buildReference(null);

        assert.isObject(built);
        assert.isTrue(built.isVirtualReference());
    });

    it('_buildReference() single link', () => {
        let built = Loader._buildReference('@/tgalopin/link');

        assert.isObject(built);
        assert.isTrue(built.isLinkReference());
    });

    it('_buildReference() single filesystem', () => {
        let built = Loader._buildReference('/tgalopin/filesystem');

        assert.isObject(built);
        assert.isTrue(built.isFilesystemReference());
    });

    it('_buildReference() collection virtuals', () => {
        let built = Loader._buildReference([
            null,
            null
        ]);

        assert.isArray(built);

        for (let i in built) {
            assert.isObject(built[i]);
            assert.isTrue(built[i].isVirtualReference());
        }
    });

    it('_buildReference() collection links', () => {
        let built = Loader._buildReference([
            '@/tgalopin/link1',
            '@/tgalopin/link2'
        ]);

        assert.isArray(built);

        for (let i in built) {
            assert.isObject(built[i]);
            assert.isTrue(built[i].isLinkReference());
        }
    });

    it('_buildReference() collection filesystems', () => {
        let built = Loader._buildReference([
            '/tgalopin/filesystem1',
            '/tgalopin/filesystem2'
        ]);

        assert.isArray(built);

        for (let i in built) {
            assert.isObject(built[i]);
            assert.isTrue(built[i].isFilesystemReference());
        }
    });

    it('_buildReference() collection mixed', () => {
        let built = Loader._buildReference([
            null,
            '@/tgalopin/link1',
            '/tgalopin/filesystem2'
        ]);

        assert.isArray(built);

        assert.isObject(built[0]);
        assert.isTrue(built[0].isVirtualReference());

        assert.isObject(built[1]);
        assert.isTrue(built[1].isLinkReference());

        assert.isObject(built[2]);
        assert.isTrue(built[2].isFilesystemReference());
    });


    let fixtures = getLoadFixtures();

    for (let i in fixtures) {
        let file = fixtures[i];

        it('load("' + file + '")', () => {
            let loaded = Loader.load(__dirname + '/fixtures/' + file);

            assert.isObject(loaded);
            assert.isObject(loaded._order);
            assert.isObject(loaded.references);

            for (let path in loaded.references) {
                let reference = loaded.references[path];
                assert.isTrue(Array.isArray(reference) || reference instanceof Reference);
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
