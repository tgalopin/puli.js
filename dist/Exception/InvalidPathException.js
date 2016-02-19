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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _PuliExceptionJs = require('./PuliException.js');

var _PuliExceptionJs2 = _interopRequireDefault(_PuliExceptionJs);

/**
 * Thrown when a given path is not valid.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */

var InvalidPathException = (function (_PuliException) {
    _inherits(InvalidPathException, _PuliException);

    function InvalidPathException(given) {
        _classCallCheck(this, InvalidPathException);

        var got = 'got: ' + typeof given;

        if (given === '') {
            got = 'got an empty string';
        }

        _get(Object.getPrototypeOf(InvalidPathException.prototype), 'constructor', this).call(this, 'A Puli path must be a non-empty string (' + got + ')');
        this.given = given;
    }

    return InvalidPathException;
})(_PuliExceptionJs2['default']);

exports['default'] = InvalidPathException;
module.exports = exports['default'];