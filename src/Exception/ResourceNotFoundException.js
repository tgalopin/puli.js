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
 * Thrown when a requested resource was not found.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class ResourceNotFoundException extends PuliException {

    constructor(path) {
        super('The resource '+ path +' does not exist.');
        this.path = path;
    }

}
