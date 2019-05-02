var requireDir = require('require-dir');
var dir = requireDir('./tasks');
var gulp = require('gulp');

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