'use strict';

/* global it, describe */

import {expect} from 'chai';
import Puli from '../dist/puli.js';

describe('puli.js tests', () => {

    var repository = new Puli('test');

    console.log(repository);

    it('path', () => {
        expect(repository.path('test')).to.equal('');
    });

});
