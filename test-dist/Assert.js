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

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

/**
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */

var Assert = (function () {
    function Assert() {
        _classCallCheck(this, Assert);
    }

    _createClass(Assert, null, [{
        key: 'isTrue',
        value: function isTrue(current) {
            _chai2['default'].assert(current);
        }
    }, {
        key: 'isFalse',
        value: function isFalse(current) {
            _chai2['default'].assert(!current);
        }
    }, {
        key: 'equals',
        value: function equals(current, expected) {
            _chai2['default'].assert.equal(current, expected);
        }
    }, {
        key: 'pathEquals',
        value: function pathEquals(current, expected) {
            Assert.equals(_path2['default'].normalize(current), _path2['default'].normalize(expected));
        }
    }, {
        key: 'exception',
        value: function exception(callback, _exception) {
            _chai2['default'].expect(callback).to['throw'](_exception);
        }
    }]);

    return Assert;
})();

exports['default'] = Assert;
module.exports = exports['default'];