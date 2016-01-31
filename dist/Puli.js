'use strict';

/*
 * This file is part of the puli/puli.js package.
 *
 * (c) Titouan Galopin
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _LoaderJs = require('./Loader.js');

var _LoaderJs2 = _interopRequireDefault(_LoaderJs);

var _ResolverJs = require('./Resolver.js');

var _ResolverJs2 = _interopRequireDefault(_ResolverJs);

/**
 * A resource repository is similar to a filesystem. It stores Puli resources
 * objects, each of which has a path in the repository.
 *
 * This repository is a JS implementation of the PHP JsonRepository. It is used
 * by automation tools plugins (Gulp, Grunt, Webpack, etc.) to resolve puli path
 * into real filesystem paths.
 *
 * The repository provides three main methods:
 *
 *      * `path(puliPath)` resolves a Puli path into a filesystem path
 *      * `exists(puliPath)` check if a given Puli path exists and can be resolved
 *      * `paths(query)` resolves apply a glob on Puli paths and return the associated filesystem paths
 *
 * Usage:
 *
 *      ``` js
 *      let repository = Puli.load('.puli/path-mappings.json');
 *
 *      if (repository.exists('/res/views/index.html.twig')) {
 *           let path = repository.path('/res/views/index.html.twig');
 *      }
 *
 *      let paths = repository.paths('/res/*');
 *      ```
 *
 * @since  1.0
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */

var Puli = (function () {

  /**
   * puli.js contructor
   *
   * You should probably not use this and use the static method
   * "load" instead:
   *
   *      let repository = Puli.load(__dirname + '/.puli/path-mappings.json', __dirname);
   *
   */

  function Puli(references, baseDirectory) {
    _classCallCheck(this, Puli);

    this.resolver = new _ResolverJs2['default'](references, baseDirectory);
  }

  /**
   * Static method useful to load a configuration file quickly.
   */

  _createClass(Puli, [{
    key: 'path',

    /**
     * Resolve a Puli virtual path into a real filesystem path
     * using the same algorithm as the PHP JsonRepository.
     *
     * @param {string} path The Puli virtual path
     * @returns {string} The associated filesystem path
     */
    value: function path(_path) {
      var resolved = this.resolver.flatten(this.resolver.searchReferences(_path));

      if (!resolved) {
        return resolved;
      }

      return resolved[0];
    }

    /**
     * Check if a given Puli path exists (ie. can be resolved into
     * a real filesystem path)
     *
     * @param {string} puliPath The Puli virtual path
     * @returns {boolean} Whether the Puli path exists or not
     */
  }, {
    key: 'exists',
    value: function exists(puliPath) {
      // todo

      return null;
    }

    /**
     * Resolve a glob on Puli virtual paths into filesystem paths
     * using the same algorithm as the PHP JsonRepository.
     *
     * @param {string} query The query glob used to filter the Puli virtual paths
     * @returns {Array} The associated filesystem paths
     */
  }, {
    key: 'paths',
    value: function paths(query) {
      // todo

      return null;
    }
  }], [{
    key: 'load',
    value: function load(configFile, baseDirectory) {
      return new Puli(_LoaderJs2['default'].load(configFile), baseDirectory);
    }
  }]);

  return Puli;
})();

exports['default'] = Puli;
module.exports = exports['default'];