'use strict';
const load = require('./core/load');
const developing = process.env.LEANCLOUD_APP_ENV == "development";

const tasks = {
  gulp: [//开发模式下会进行构建
    'dev',
    'autoVersion',
  ],
  module: [//开发环境和生产环境都会运行的组件
    load
  ]
}

// 引入进度条显示工具模块
const ProgressBar = require('./utils/progress_bar');

// 初始化一个进度条长度为 50 的 ProgressBar 实例
const pb = new ProgressBar({
  description: 'Server',
  length: 25,
  theme_color: `keyword('orange')`,
  // total: sum(tasks),
  total: (_ => {
    var count = 0;
    for (var i in tasks) {
      count += tasks[i].length
    }
    return count
  })(),
  fps: 30,
  delay: 0
});

developing ? pb.stepRender() : "";//初次呈现 ProgressBar

if (developing) {//leancloud的开发环境下

  const child_process = require('child_process');
  const spawn = child_process.spawn;
  const exec = child_process.exec;

  const ls = spawn('gulp', tasks.gulp, { stdio: "pipe" });//如果使用stdio:"inherit",就能显示彩色的console结果

  var i = 0;

  ls.stdout.on('data', (data) => {

    var sign = '-fs';
    if (data.toString().match(sign)) {
      console.log('\n' + (data.toString().replace(sign, '')));
    }
    if (i % 2 == 0 && i < tasks.gulp.length * 2 - 2) {
      pb.stepRender();
    }
    i++
  });

  ls.stderr.on('data', (data) => {

    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    // console.log(`child process exited with code ${code}`);


  });

}

for (var i in tasks.module) {
  developing ? pb.stepRender() : "";
  (tasks.module[i])();
}