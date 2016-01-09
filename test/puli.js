'use strict';

/* global it, describe */

import {expect} from 'chai';
import puli from '../dist/puli.js';

describe('puli.js tests', () => {

    var repository = puli.load(__dirname + '/fixtures/find.json');

    it('path', () => {
        expect(repository.path('test')).to.equal('');
    });

});
