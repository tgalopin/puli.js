'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export const TYPE_FILESYSTEM = 'filesystem';
export const TYPE_LINK = 'link';
export const TYPE_VIRTUAL = 'virtual';

/**
 * A resource reference is the JSON representation of a resource
 * following the convention set up the the PHP JsonRepository.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class Reference {

    constructor(reference) {
        this.reference = reference;

        if (reference === null) {
            this.type = TYPE_VIRTUAL;
        } else if (reference.length > 0 && '@' === reference.substr(0, 1)) {
            this.type = TYPE_LINK;
        } else {
            this.type = TYPE_FILESYSTEM;
        }
    }

    toString() {
        return this.getReference;
    }

    getReference() {
        return this.reference;
    }

    isVirtualReference() {
        return this.type === TYPE_VIRTUAL;
    }

    isLinkReference() {
        return this.type === TYPE_LINK;
    }

    isFilesystemReference() {
        return this.type === TYPE_FILESYSTEM;
    }

}
