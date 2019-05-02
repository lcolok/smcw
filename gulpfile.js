var requireDir = require('require-dir');
var dir = requireDir('./tasks');
var gulp = require('gulp');
const child_process = require('child_process');
const exec = child_process.exec;

gulp.task('deployLeanCloud', function (cb) {
    exec('lean deploy', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task('deploy',
    gulp.series(
        gulp.parallel(
            'buildLeanCloudAPI',
        ),
        'deployLeanCloud'
    ));

gulp.task('dev',
    gulp.series(
        gulp.parallel(
            'buildLeanCloudAPI',
        ),
        'leanUp'
    ));

gulp.task('default',
    cb => {
        cb();
    });