import gulp from 'gulp';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import jshint from 'gulp-jshint';

var config = {
    paths: {
        js: {
            src: 'src/**/*.js',
            sourceRoot: 'src/',
            dist: 'dist/'
        },
        test: {
            src: 'test/**/*.js',
            sourceRoot: 'test-dist/',
            dist: 'test-dist/',
            run: 'test-dist/**/*.js'
        }
    }
};

/*
 * Babel
 */
gulp.task('babel-src', ['jshint-src'], () =>
    gulp.src(config.paths.js.src)
        .pipe(plumber())
        .pipe(babel({ sourceRoot: config.paths.js.sourceRoot }))
        .pipe(gulp.dest(config.paths.js.dist))
);

gulp.task('babel-test', ['jshint-test'], () =>
    gulp.src(config.paths.test.src)
        .pipe(plumber())
        .pipe(babel({ sourceRoot: config.paths.test.sourceRoot }))
        .pipe(gulp.dest(config.paths.test.dist))
);

gulp.task('babel', ['babel-src', 'babel-test']);

/*
 * JSHint
 */
gulp.task('jshint-src', () =>
    gulp.src(config.paths.js.src)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
);

gulp.task('jshint-test', () =>
    gulp.src(config.paths.test.src)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
);

gulp.task('jshint', ['jshint-src', 'jshint-test']);

/*
 * Useful commands
 */
gulp.task('test', ['jshint', 'babel'], () =>
    gulp.src([config.paths.test.run]).pipe(mocha({ reporter: 'dot' }))
);

gulp.task('watch-run', () => {
    gulp.src([config.paths.test.run]).pipe(mocha({ reporter: 'min' }));
});

gulp.task('watch', ['babel', 'watch-run'], () => {
    gulp.watch(config.paths.js.src, ['babel-src', 'watch-run']);
    gulp.watch(config.paths.test.src, ['babel-test', 'watch-run']);
});

/*
 * Default task
 */
gulp.task('default', ['watch']);
