'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distPuliJs = require('../dist/Puli.js');

var _distPuliJs2 = _interopRequireDefault(_distPuliJs);

describe('puli.js tests', function () {

    var repository = _distPuliJs2['default'].load(__dirname + '/fixtures/override-sub-path.json', __dirname);
});