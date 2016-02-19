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
import ConfigFileNotFoundException from './Exception/ConfigFileNotFoundException.js';
import ConfigFileInvalidException from './Exception/ConfigFileInvalidException.js';

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
        let fileContent, json;

        try {
            fileContent = fs.readFileSync(configFile, 'utf8');
        } catch (e) {
            throw new ConfigFileNotFoundException(configFile);
        }

        try {
            json = JSON.parse(fileContent);
        } catch (e) {
            throw new ConfigFileInvalidException(configFile);
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

            references[path] = json[path];
        }

        return {
            references: references,
            _order: _order
        };
    }

}
