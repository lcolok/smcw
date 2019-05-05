var gulp = require('gulp');
var path = require('path');
var verConfigPath = path.resolve("./api/config/ver.config.js");

var ver = require(verConfigPath);
var fs = require('fs');
const child_process = require('child_process');
const spawn = child_process.spawn;
const exec = child_process.exec;

gulp.task('autoVersion', function (done) {

    const ls = exec(`git log --no-merges | grep -e 'commit [a-zA-Z0-9]*' | wc -l`);//查询git的commits数量

    ls.stdout.on('data', (data) => {
        /* 根据保存次数进行build的版本自增(也就是每次运行这个gulp都会加一) */

        ver.parts.build++;

        /* 根据commits进行revision的版本自增 */

        var currentCommits = parseInt(data);
        if (ver.commits !== currentCommits) {
            ver.parts.minor++;
            // ver.parts.build = 0;//build号归零(小括号内的)
        }
        ver.commits = currentCommits;

        /* 根据major和minor的变动,进行revision的归零操作 */

        var arr = ver.whole.split('.');
        var oldMajor = parseInt(arr[0]);
        var oldMinor = parseInt(arr[1]);
        if (ver.parts.major > oldMajor) {
            ver.parts.minor = 0;
            ver.parts.build = 0;
        }

        if (ver.parts.minor > oldMinor) {
            ver.parts.build = 0;
        }

        /* 对major/minor/revision/build进行合成,合成模式为 → [开发者手动升级版本].[commits自增].[每次保存自增]([总build版本])  例子:3.1.2(462) */

        ver.whole = `${ver.parts.major}.${ver.parts.minor}.${ver.parts.build}(${ver.commits})`;

        /* var arr = [];
        for (var i in ver.parts) {
            if (i == 'build') { continue }
            arr.push(ver.parts[i]);
        }
        // console.log(`-fs ${arr.join('.')}`);
        ver.whole = arr.join('.') + `(${ver.commits})`; */

        /* 进行stringify和去除key两边的双引号的格式化 */

        var json = JSON.stringify(ver, null, '\t');
        json.replace(/\\"/g, "\uFFFF"); //U+ FFFF
        json = json.replace(/\"([^"]+)\":/g, "$1:").replace(/\uFFFF/g, "\\\"");


        fs.writeFileSync(verConfigPath, `module.exports = ${json}`)//写入文件
    });

    done();
})