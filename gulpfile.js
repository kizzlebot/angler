'use strict';

const path = require('path');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const lab = require('gulp-lab');

gulp.task('lab-test', (callback) => {

    gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(lab({ args: '-t 100 -C -S -v -a code -l -c', opts: { emitLabError: true } }))
    .on('error', (error) => {
        callback(error);
    });
});

gulp.task('watch', () => {
    gulp.watch(['lib/**/*.js', 'test/**'], ['test']);
});

gulp.task('test', ['lab-test']);
gulp.task('default', ['test']);
