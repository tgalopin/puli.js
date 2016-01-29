'use strict';

/* global it, describe */

import {assert} from 'chai';
import Puli from '../dist/Puli.js';

describe('Puli', () => {

    var repository = Puli.load(__dirname + '/fixtures/override.json', __dirname);

    it('path()', () => {
        console.log(repository.path('/webmozart/file1'));
    });

});
