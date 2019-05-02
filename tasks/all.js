var gulp = require('gulp');
var del = require('del');
var minify = require('gulp-minify');
var stripDebug = require('gulp-strip-debug');
var gulpif = require('gulp-if');
const changed = require('gulp-changed');
var gutil = require('gulp-util');
// var exec = require('gulp-exec');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon');


var browserSync = require('browser-sync').create();

gulp.task('serve', function () {
    browserSync.init({
        proxy: 'http://localhost:3000',
        browser: 'chrome',
        port: 7000
    });

    gulp.watch('public/**/*.+(scss|jade|ls)')
        .on('change', browserSync.reload);
});



gulp.task('docs', function (callback) {
    var docsPath = 'docs/';
    del([
        docsPath + '*',
    ], callback);
    return gulp.src('dist/**/*')
        .pipe(gulp.dest(docsPath))
});



gulp.task('getProcessEnv', function (done) {
    done();
});
/* 
gulp.task('prepublish',
    gulp.series(
        'getProcessEnv'
    )
);
 */




