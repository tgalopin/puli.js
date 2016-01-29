'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import fs from 'fs';
import Reference from './Reference.js';

/**
 * The PuliLoader loads path-mappings configuration files generated
 * by the PHP JsonRepository and hydrate a list associating Puli paths
 * to PuliReference objects.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class Loader {

    static load(configFile) {
        let json;

        try {
            json = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        } catch (e) {
            throw new Error('Puli configuration file was not found (file "'+ configFile +'" does not exist)');
        }

        // Hydrate a list of PuliReference objects
        let _order = {};
        let references = {};

        for (let path in json) {
            if (! json.hasOwnProperty(path)) {
                continue;
            }

            if ('_order' === path) {
                _order = json[path];
                continue;
            }

            references[path] = this._buildReference(json[path]);
        }

        return {
            references: references,
            _order: _order
        };
    }

    /**
     * Build a reference object or a collection of
     * reference objects using a given JSON reference.
     *
     * @param {string|Array} reference
     * @returns Reference
     * @private
     */
    static _buildReference(reference) {
        if (reference === null || typeof reference === 'string') {
            return new Reference(reference);
        }

        let combinedReference = [];

        for (let i in reference) {
            if (reference.hasOwnProperty(i)) {
                combinedReference.push(new Reference(reference[i]));
            }
        }

        return combinedReference;
    }

}
