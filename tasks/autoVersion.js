var gulp = require('gulp');
var path = require('path');
var verConfigPath = path.resolve("./api/config/ver.config.js");

var ver = require(verConfigPath);
var fs = require('fs');
const child_process = require('child_process');
const spawn = child_process.spawn;
const exec = child_process.exec;

gulp.task('autoVersion', function (done) {

    const ls = exec(`git log --no-merges | grep -e 'commit [a-zA-Z0-9]*' | wc -l`);

    ls.stdout.on('data', (data) => {
        var currentCommits = parseInt(data);
        if(ver.commits!==currentCommits){
            ver.parts.build++;
        }
        console.log(`-fs ${ver.commits}`);
        console.log(`-fs ${ver.parts.build}`);//-fs代表 force show 

        fs.writeFileSync(verConfigPath,`module.exports = ${JSON.stringify(ver)}`)
    });

    done();
})