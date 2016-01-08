puli.js : the Puli Javascript reader
====================================

puli.js provides a Javascript, read-only API for transform Puli path into filesystem paths using
a JSON file generated by the PHP [JsonRepository].

puli.js is a first step towards creating plugins for automation tools such as Gulp, Grunt or
Webpack.

Authors
-------

* Titouan Galopin aka [@titouangalopin]
* [The Community Contributors]

Usage
-----

The JsonRepository generates a JSON file to store its path mappings (usually
`/your/project/root/.puli/path-mappings.json`). This file is used by puli.js to transform Puli
paths into filesystem paths.

```js
var puli = require('puli').load('.puli/path-mappings.json')

puli.path('/res/foo'); // returns the filesystem path associated to the virtual path /app/foo
puli.paths('/res/**/*.js'); // find matching virtual paths and return associated filesystem paths as an array
puli.exists('/res/**/*.js'); // check if the given virtual path exists or if the given glob contain paths
```

puli.js provides a read-only API: you cannot edit the path-mappings using it.

Documentation
-------------

Read the [Puli Documentation] to learn more about Puli.

Contribute
----------

Contributions to Puli are always welcome!

**Report bugs**

You can report any bugs or issues you find on the [issue tracker].

**Pull requests**

If you want to contribute on the code, here are some informations:

- puli.js is developed using ES6 ;
- we use Babel and Grunt to compile to ES5: to compile yourself, you can either run `gulp` if
you installed Gulp CLI globally or `node_modules/gulp/bin/gulp.js` if you want to use the local Gulp ;
- the source code is located in `src` and tests are located in `test` : theses two directories are
compiled by Gulp respectively to `dist` and `test-dist` ;
- run `npm test` to launch the test suite (the tests use mocha) ;

**Create an automation tool plugin using this library**

If you are interested in creating an automation tool plugin (for Gulp, Grunt, Webpack, ...), don't
hesitate to open an issue in the [issue tracker] to discuss it. You can also join us on [Gitter].

Support
-------

If you are having problems, send a mail to galopintitouan@gmail.com or bschussek@gmail.com or shout
out to [@titouangalopin] or [@webmozart] on Twitter.

License
-------

All contents of this package are licensed under the [MIT license].

[Puli]: http://puli.io
[JsonRepository]: https://github.com/puli/repository/blob/1.0/src/JsonRepository.php
[The Community Contributors]: https://github.com/tgalopin/puli.js/graphs/contributors
[Installation guide]: http://docs.puli.io/en/latest/installation.html
[Puli Documentation]: http://docs.puli.io/en/latest/index.html
[issue tracker]: https://github.com/tgalopin/puli.js/issues
[Git repository]: https://github.com/puli/repository
[MIT license]: LICENSE
[Gitter]: https://gitter.im/puli/issues
[@webmozart]: https://twitter.com/webmozart
[@titouangalopin]: https://twitter.com/titouangalopin
