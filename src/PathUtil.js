'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Path from 'path';
import InvalidPathException from './Exception/InvalidPathException.js';

/**
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class PathUtil {

    /**
     * Ensure a given path is valid, not empty and absolute.
     * Internal method.
     *
     * @param {string} path
     */
    static sanitize(path) {
        // Type
        if ('string' !== typeof path) {
            throw new InvalidPathException(path);
        }

        // Non-empty
        if ('' === path) {
            throw new InvalidPathException(path);
        }

        // Absolute
        if ('/' !== path.substr(0, 1)) {
            throw new InvalidPathException(path);
        }

        return PathUtil.canonicalize(path);
    }

    static canonicalize(path) {
        return PathUtil.normalize(Path.normalize(path));
    }

    static normalize(path) {
        if ('string' !== typeof path) {
            return null;
        }

        return path.replace(/\\/g, '/');
    }

}
