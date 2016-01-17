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

/**
 * A resource repository is similar to a filesystem. It stores Puli resources
 * objects, each of which has a path in the repository.
 *
 * This repository is a JS implementation of the PHP JsonRepository. It is used
 * by automation tools plugins (Gulp, Grunt, Webpack, etc.) to resolve puli path
 * into real filesystem paths.
 *
 * The repository provides three main methods:
 *
 *      * `path(puliPath)` resolves a Puli path into a filesystem path
 *      * `exists(puliPath)` check if a given Puli path exists and can be resolved
 *      * `paths(query)` resolves apply a glob on Puli paths and return the associated filesystem paths
 *
 * Usage:
 *
 *      ``` js
 *      let repository = Puli.load('.puli/path-mappings.json');
 *
 *      if (repository.exists('/res/views/index.html.twig')) {
 *           let path = repository.path('/res/views/index.html.twig');
 *      }
 *
 *      let paths = repository.paths('/res/*');
 *      ```
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class Puli {

    /**
     * puli.js contructor
     *
     * You should probably not use this and use the static method
     * "load" instead:
     *
     *      let repository = Puli.load('.puli/path-mappings.json');
     *
     */
    constructor() {
        this.json = {};
    }

    /**
     * Static method useful to load a configuration file quickly.
     */
    static load(configFile) {
        let repository = new Puli();

        return repository.reload(configFile);
    }

    /**
     * Change the configuration file used dynamically
     *
     * @param {string} configFile
     * @returns {Puli}
     */
    reload(configFile) {
        try {
            this.json = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        } catch (e) {
            throw new Error('Puli configuration file was not found (file "'+ configFile +'" does not exist)');
        }

        return this;
    }

    /**
     * Resolve a Puli virtual path into a real filesystem path
     * using the same algorithm as the PHP JsonRepository.
     *
     * @param {string} puliPath The Puli virtual path
     * @returns {string} The associated filesystem path
     */
    path(puliPath) {
        // todo

        return null;
    }

    /**
     * Check if a given Puli path exists (ie. can be resolved into
     * a real filesystem path)
     *
     * @param {string} puliPath The Puli virtual path
     * @returns {boolean} Whether the Puli path exists or not
     */
    exists(puliPath) {
        // todo

        return null;
    }

    /**
     * Resolve a glob on Puli virtual paths into filesystem paths
     * using the same algorithm as the PHP JsonRepository.
     *
     * @param {string} query The query glob used to filter the Puli virtual paths
     * @returns {Array} The associated filesystem paths
     */
    paths(query) {
        // todo

        return null;
    }

}
