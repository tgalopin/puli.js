'use strict';

/* global it, describe */

import {assert} from 'chai';
import Puli from '../dist/Puli.js';

describe('Puli', () => {

    var repository = Puli.load(__dirname + '/fixtures/override-sub-path.json', __dirname);

    it('path()', () => {
        console.log(repository.path('/webmozart/puli/file2'));
    });

});
