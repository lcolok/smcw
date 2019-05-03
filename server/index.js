'use strict';
const chalk = require('chalk');

const child_process = require('child_process');
const spawn = child_process.spawn;
const exec = child_process.exec;
const ls = spawn('gulp', ['dev'], {stdio: "inherit"});


ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
  main();
});

// 引入工具模块
var ProgressBar = require('../tools/progress-bar');

// 初始化一个进度条长度为 50 的 ProgressBar 实例
const pb = new ProgressBar({
  description: 'Gulp Dev',
  length: 25,
  theme_color: 'green',
  total: 200
});


/* var num = 0, total = 200;
function devBuild() {
  if (num <= total) {
    // 更新进度条
    pb.render({ completed: num, total: total });

    num++;
    setTimeout(function () {
      devBuild();
    }, 2)
  }
}
devBuild(); */


// if (process.env.npm_lifecycle_event === 'dev') {



//   var cmd = exec('gulp dev --ansi', {stdio: "inherit"});

//   cmd.on('error', () => {
//     console.log('error');
//   })
//   cmd.stdout.on('data', (data) => {
//     console.log(data);
//   })

//   cmd.on('exit', () => {
//     pb.motionRender(0, 100)
  
 
//       main();
//       pb.motionRender(100, 200);

//   })

// } else {
//   main();
// }



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
    console.log(chalk.green.inverse(` READY `) + ' ' + 'Node app is running on', `${chalk.yellow('http://localhost:' + PORT)}`);

    // 注册全局未捕获异常处理器
    process.on('uncaughtException', function (err) {
      console.error('Caught exception:', err.stack);
    });
    process.on('unhandledRejection', function (reason, p) {
      console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
    });
  });


}