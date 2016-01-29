'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TYPE_FILESYSTEM = 'filesystem';
exports.TYPE_FILESYSTEM = TYPE_FILESYSTEM;
var TYPE_LINK = 'link';
exports.TYPE_LINK = TYPE_LINK;
var TYPE_VIRTUAL = 'virtual';

exports.TYPE_VIRTUAL = TYPE_VIRTUAL;
/**
 * A resource reference is the JSON representation of a resource
 * following the convention set up the the PHP JsonRepository.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */

var Reference = (function () {
    function Reference(reference) {
        _classCallCheck(this, Reference);

        this.reference = reference;

        if (reference === null) {
            this.type = TYPE_VIRTUAL;
        } else if (reference.length > 0 && '@' === reference.substr(0, 1)) {
            this.type = TYPE_LINK;
        } else {
            this.type = TYPE_FILESYSTEM;
        }
    }

    _createClass(Reference, [{
        key: 'toString',
        value: function toString() {
            return this.getReference;
        }
    }, {
        key: 'getReference',
        value: function getReference() {
            return this.reference;
        }
    }, {
        key: 'isVirtualReference',
        value: function isVirtualReference() {
            return this.type === TYPE_VIRTUAL;
        }
    }, {
        key: 'isLinkReference',
        value: function isLinkReference() {
            return this.type === TYPE_LINK;
        }
    }, {
        key: 'isFilesystemReference',
        value: function isFilesystemReference() {
            return this.type === TYPE_FILESYSTEM;
        }
    }]);

    return Reference;
})();

exports['default'] = Reference;