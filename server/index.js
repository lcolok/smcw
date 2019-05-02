'use strict';
const chalk = require('chalk');

const child_process = require('child_process');
const spawn = child_process.spawn;
const exec = child_process.exec;
/* const ls = spawn('gulp', ['dev']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);

  main();


}); */

if (process.env.npm_lifecycle_event === 'dev') {
  exec('gulp dev', function (error, stdout, stderr) {
    if (error) {
      console.error('error: ' + error);
      return;
    }
    /*   console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr); */
    console.log(chalk.keyword('orange').bold('Gulp Dev Finished!'));
    main();

  })
}else{
  main();
}




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
    console.log('Node app is running on:', `${chalk.yellow('http://localhost:' + PORT)}`);

    // 注册全局未捕获异常处理器
    process.on('uncaughtException', function (err) {
      console.error('Caught exception:', err.stack);
    });
    process.on('unhandledRejection', function (reason, p) {
      console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
    });
  });


}