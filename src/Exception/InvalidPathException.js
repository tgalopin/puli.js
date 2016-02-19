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
 * Thrown when a given path is not valid.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class InvalidPathException extends PuliException {

    constructor(given) {
        let got = 'got: ' + (typeof given);

        if (given === '') {
            got = 'got an empty string';
        }

        super('A Puli path must be a non-empty string ('+ got +')');
        this.given = given;
    }

}
