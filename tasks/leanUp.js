var gulp = require('gulp');

gulp.task('leanUp', function (done) {

/*     var fs = require('fs');
    var path = require('path');
    var customPath = fs.readFileSync(path.join(__dirname, '../.leancloud/custom_dev_port')).toString();
    var PORT = customPath;

    var app = require('../server/app');
    app.listen(PORT, function (err) {
        console.log('Node app is running on port:', PORT);

        // 注册全局未捕获异常处理器
        process.on('uncaughtException', function (err) {
            console.error('Caught exception:', err.stack);
        });
        process.on('unhandledRejection', function (reason, p) {
            console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
        });
    });


 */
    done()
})