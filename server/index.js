'use strict';
const main = require('./main');

const chalk = require('chalk');

// 引入工具模块
var ProgressBar = require('../tools/progress-bar');

Function.prototype.getname = function () {
  return this.name || this.tostring().match(/function\s*([^(]*)\(/)[1]
}


const child_process = require('child_process');
const spawn = child_process.spawn;
const exec = child_process.exec;

// console.log(two.getname());

const tasks = {
  gulp: [
    'dev',
    'leanUp',
    'leanUp',
    'leanUp',
    'leanUp',
  ],
  function: [
    main
  ]
}

function sum(tasksArray) {
  var count = 0;
  for (var i in tasksArray) {
    count += tasksArray[i].length
  }
  return count
}



// 初始化一个进度条长度为 50 的 ProgressBar 实例
const pb = new ProgressBar({
  description: 'Server',
  length: 25,
  theme_color: `keyword('orange')`,
  total: sum(tasks),
  fps: 30,
  delay: 0
});

pb.stepRender();//初始化

const ls = spawn('gulp', tasks.gulp, { stdio: "pipe" });//如果使用stdio:"inherit",就能显示彩色的console结果

var i = 0;

ls.stdout.on('data', (data) => {
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

  for (var i in tasks.function) {
    pb.stepRender();

    (tasks.function[i])();
  }

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


