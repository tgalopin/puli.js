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
 * Thrown when a requested resource is virtual.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class ResourceVirtualException extends PuliException {

    constructor(path) {
        super('The resource '+ path +' is virtual and cannot be used by puli.js.');
        this.path = path;
    }

}
