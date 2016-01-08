'use strict';

/* global it, describe */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chai = require('chai');

var _distPuliJs = require('../dist/puli.js');

var _distPuliJs2 = _interopRequireDefault(_distPuliJs);

describe('puli.js tests', function () {

    var repository = new _distPuliJs2['default']('test');

    console.log(repository);

    it('path', function () {
        (0, _chai.expect)(repository.path('test')).to.equal('');
    });
});