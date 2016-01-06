const Babel = require('gulp-babel');
const Gulp = require('gulp');
const Nodemon = require('gulp-nodemon');
const Sequence = require('run-sequence');
const Webpack = require('webpack');


Gulp.task('compile', () => {

    return Gulp.src('src/**/*.js')
        .pipe(Babel({ presets: ['es2015'] }))
        .pipe(Gulp.dest('dist'));
});


Gulp.task('transpile', () => {

    return Gulp.src('src/**/*.jsx')
        .pipe(Babel({ presets: ['es2015', 'react'] }))
        .pipe(Gulp.dest('dist'));
});


Gulp.task('watch', () => {

    Gulp.watch('src/**/*.js', ['compile']);
    Gulp.watch('src/**/*.jsx', ['transpile']);
});


Gulp.task('webpack', (callback) => {

    Webpack(
        require('./webpack.config.js'),
        (err, stats) => {

            if (err) {
                console.error(err);
            }

            // console.log(stats);

            callback();
        }
    );
});


Gulp.task('start', () => {

    Nodemon({
        watch: 'dist',
        script: 'dist/index.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
});


Gulp.task('default', (callback) => {

    Sequence(['compile', 'transpile', 'webpack', 'watch'], 'start', callback);
});
