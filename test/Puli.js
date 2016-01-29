'use strict';

/* global it, describe */

import {expect} from 'chai';
import Puli from '../dist/Puli.js';

describe('puli.js tests', () => {

    var repository = Puli.load(__dirname + '/fixtures/override-sub-path.json', __dirname);

});
