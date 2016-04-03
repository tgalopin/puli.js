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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ExceptionInvalidPathExceptionJs = require('./Exception/InvalidPathException.js');

var _ExceptionInvalidPathExceptionJs2 = _interopRequireDefault(_ExceptionInvalidPathExceptionJs);

/**
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */

var PathUtil = (function () {
    function PathUtil() {
        _classCallCheck(this, PathUtil);
    }

    _createClass(PathUtil, null, [{
        key: 'sanitize',

        /**
         * Ensure a given path is valid, not empty and absolute.
         * Internal method.
         *
         * @param {string} path
         */
        value: function sanitize(path) {
            // Type
            if ('string' !== typeof path) {
                throw new _ExceptionInvalidPathExceptionJs2['default'](path);
            }

            // Non-empty
            if ('' === path) {
                throw new _ExceptionInvalidPathExceptionJs2['default'](path);
            }

            // Absolute
            if ('/' !== path.substr(0, 1)) {
                throw new _ExceptionInvalidPathExceptionJs2['default'](path);
            }

            return PathUtil.canonicalize(path);
        }
    }, {
        key: 'canonicalize',
        value: function canonicalize(path) {
            return PathUtil.normalize(_path2['default'].normalize(path));
        }
    }, {
        key: 'normalize',
        value: function normalize(path) {
            if ('string' !== typeof path) {
                return null;
            }

            return path.replace(/\\/g, '/');
        }
    }]);

    return PathUtil;
})();

exports['default'] = PathUtil;
module.exports = exports['default'];