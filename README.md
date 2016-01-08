# puli.js

Puli JsonRepository Javascript implementation for automation tools plugins.

Developped in ES6 using Babel.

## Usage

``` js
'use strict';

/*global require*/

var Puli = require('./dist/puli.js');

var repository = new Puli('.puli/path-mappings.json');

repository.path('/puli/path'); // returns the filesystem path
```

## Test

Run `npm test`

## Contributing

Source code is in `src` and tests are in `test`. All the code is developed in ES6 meaning 
you should use Gulp to build ES5 files.

To do so, use your global Gulp if you installed it (run `gulp`) or the local one if you didn't
(run `node_modules/gulp/bin/gulp.js`).
