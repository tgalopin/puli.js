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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * The PuliLoader loads path-mappings configuration files generated
 * by the PHP JsonRepository and hydrate a list associating Puli paths
 * to PuliReference objects.
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */

var Loader = (function () {
    function Loader() {
        _classCallCheck(this, Loader);
    }

    _createClass(Loader, null, [{
        key: 'load',
        value: function load(configFile) {
            var json = undefined;

            try {
                json = JSON.parse(_fs2['default'].readFileSync(configFile, 'utf8'));
            } catch (e) {
                throw new Error('Puli configuration file was not found (file "' + configFile + '" does not exist)');
            }

            // Hydrate a list of PuliReference objects
            var _order = {};
            var references = {};

            for (var path in json) {
                if (!json.hasOwnProperty(path)) {
                    continue;
                }

                if ('_order' === path) {
                    _order = json[path];
                    continue;
                }

                references[path] = json[path];
            }

            return {
                references: references,
                _order: _order
            };
        }
    }]);

    return Loader;
})();

exports['default'] = Loader;
module.exports = exports['default'];