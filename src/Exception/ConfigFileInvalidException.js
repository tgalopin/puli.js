'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import PuliException from './PuliException.js';

/**
 * Thrown when the configuration file does not contain valid JSON.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class ConfigFileInvalidException extends PuliException {

    constructor(file) {
        super('File '+ file +' cannot be loaded by Puli as it does not contain valid JSON.');
        this.file = file;
    }

}
