const chalk = require('chalk');

function main() {

    var AV = require('leanengine');
    try {
        AV.init({
            appId: process.env.LEANCLOUD_APP_ID,
            appKey: process.env.LEANCLOUD_APP_KEY,
            masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
        });
    } catch (e) {

    }


    // 如果不希望使用 masterKey 权限，可以将下面一行删除
    AV.Cloud.useMasterKey();



    // 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
    // LeanEngine 运行时会分配端口并赋值到该变量。


    var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);



    var app = require('./app');
    app.listen(PORT, function (err) {
        setTimeout(() => {
            console.log(chalk.green.inverse(` READY `) + ' ' + 'Node app is running on', `${chalk.yellow('http://localhost:' + PORT)}`);
        }, 200);
        // 注册全局未捕获异常处理器
        process.on('uncaughtException', function (err) {
            console.error('Caught exception:', err.stack);
        });
        process.on('unhandledRejection', function (reason, p) {
            console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
        });
    });


}

module.exports = main;