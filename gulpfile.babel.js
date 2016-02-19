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

gulp.task('babel', ['babel-src', 'babel-test']);

gulp.task('babel-src', ['lint-src'], () =>
    gulp.src(config.paths.js.src)
        .pipe(plumber())
        .pipe(babel({ sourceRoot: config.paths.js.sourceRoot }))
        .pipe(gulp.dest(config.paths.js.dist))
);

gulp.task('babel-test', ['lint-test'], () =>
    gulp.src(config.paths.test.src)
        .pipe(plumber())
        .pipe(babel({ sourceRoot: config.paths.test.sourceRoot }))
        .pipe(gulp.dest(config.paths.test.dist))
);

gulp.task('lint-src', () =>
    gulp.src(config.paths.js.src)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
);

gulp.task('lint-test', () =>
    gulp.src(config.paths.test.src)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
);

gulp.task('lint', ['lint-src', 'lint-test']);

gulp.task('watch', () => {
    gulp.run('test');
    gulp.watch(config.paths.js.src, ['babel-src', 'test']);
    gulp.watch(config.paths.test.src, ['babel-test', 'test']);
});

gulp.task('test', ['babel'], () =>
    gulp.src([config.paths.test.run]).pipe(mocha({ reporter: 'min' }))
);

// Default Task
gulp.task('default', ['watch']);
