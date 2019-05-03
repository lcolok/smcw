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
            ver.parts.revision++;
        }
        ver.commits = currentCommits;

        /* 对major/minor/revision/build进行合成,合成模式为 3.1.2(462) */

        var arr = [];
        for (var i in ver.parts) {
            if (i == 'build') { continue }
            arr.push(ver.parts[i]);
        }
        // console.log(`-fs ${arr.join('.')}`);
        ver.whole = arr.join('.') + `(${ver.parts.build})`;

        /* 进行stringify和去除key两边的双引号的格式化 */

        var json = JSON.stringify(ver, null, '\t');
        json.replace(/\\"/g, "\uFFFF"); //U+ FFFF
        json = json.replace(/\"([^"]+)\":/g, "$1:").replace(/\uFFFF/g, "\\\"");


        fs.writeFileSync(verConfigPath, `module.exports = ${json}`)//写入文件
    });

    done();
})