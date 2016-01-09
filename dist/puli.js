'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var Puli = (function () {
    function Puli() {
        _classCallCheck(this, Puli);

        this.json = {};
    }

    _createClass(Puli, [{
        key: 'reload',
        value: function reload(configFile) {
            try {
                this.json = JSON.parse(_fs2['default'].readFileSync(configFile, 'utf8'));
            } catch (e) {
                throw new Error('Puli configuration file was not found (file "' + configFile + '" does not exist)');
            }

            return this;
        }
    }, {
        key: 'path',
        value: function path(puliPath) {
            var filesystemPath = '';

            // Resolve ...

            return filesystemPath;
        }
    }], [{
        key: 'load',
        value: function load(configFile) {
            var repository = new Puli();

            return repository.reload(configFile);
        }
    }]);

    return Puli;
})();

exports['default'] = Puli;
module.exports = exports['default'];