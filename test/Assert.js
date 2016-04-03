'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import chai from 'chai';
import path from 'path';

/**
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class Assert {

    static isTrue(current) {
        chai.assert(current);
    }

    static isFalse(current) {
        chai.assert(! current);
    }

    static equals(current, expected) {
        chai.assert.equal(current, expected);
    }

    static pathEquals(current, expected) {
        Assert.equals(path.normalize(current), path.normalize(expected));
    }

    static exception(callback, exception) {
        chai.expect(callback).to.throw(exception);
    }

}
