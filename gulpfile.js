var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
var minify = require('gulp-minify');
var gulpIgnore = require('gulp-ignore');
var stripDebug = require('gulp-strip-debug');
var replace = require('gulp-replace');
var gulpif = require('gulp-if');
const changed = require('gulp-changed');
const gap = require('gulp-append-prepend');
var gutil = require('gulp-util');


gulp.task('default', function () {
    // 将你的默认的任务代码放在这
});



gulp.task('docs', function (callback) {
    var docsPath = 'docs/';
    del([
        docsPath + '*',
    ], callback);
    return gulp.src('dist/**/*')
        .pipe(gulp.dest(docsPath))
});

gulp.task('minapi', function (done) {
    var destPath = 'apiMin';

    var orig = '-debug.js';
    gulp.src('api/**/*.js')
        .pipe(changed(destPath))
        .pipe(replace(/\/\*([\S]*CRISPR-GULP[\S]*)\*\/([\s\S]*?)(\/\*\1\*\/)/igm, function (match, p1, p2, p3, offset, string) {
            // Replace foobaz with barbaz and log a ton of information
            // See http://mdn.io/string.replace#Specifying_a_function_as_a_parameter
            // console.log('Found ' + match + ' with param ' + p1 + ' at ' + offset + ' inside of ' + string);

            var name = p1.match(/action:[^-*]*/im)[0]
                .match(/:[\S]*/im)[0]
                .split(':')
                .pop()
                .toUpperCase();

            console.log(name);

            /* result = actions[name]; */
            var result = match;//默认是不替换,匹配部分换成结果,就是不替换
            switch (name) {
                case 'DEL':
                    result = '';
                    break;
                case 'FILENAME':
                    result = `"${this.file.relative.split('.').shift()}"`
                    break;
                default:

                    break;
            }

            // console.log(result);

            return result;
        }))
        .pipe(stripDebug())
        .pipe(minify({
            ext: {
                src: orig,//源文件的后缀
                min: '.js'//经过minify的文件所命名的后缀
            },
        }))
        .pipe(gulpIgnore.exclude('*' + orig))//可以用于过滤文件
        .pipe(concat('bundle.min.js'))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest(destPath));
    // console.log('minapi任务已完成');
    done();
});

gulp.task('LeanCloudAPI', function (done) {
    var destPath = 'serverless';

    try {
        del([
            destPath
        ]);
    } catch (e) { console.log(e); }

    var orig = '-debug.js';
    gulp.src('api/**/*.js')
        // .pipe(gulpIgnore.exclude('public/**/*'))//用于过滤public文件
        .pipe(replace(/\/\*([\S]*CRISPR-GULP[\S]*)\*\/([\s\S]*?)(\/\*\1\*\/)/igm, (...res) => CG(res)))
        .pipe(replace(/\/\*([\S]*CG[\S]*)\*\/([\s\S]*?)(\/\*\1\*\/)/igm, (...res) => CG(res)))
        .pipe(gap.appendText(`
        AV.Cloud.define("thisFunc", async function (request) {
            return await thisFunc(request);
        });
        `))
        .pipe(replace(/thisFunc/igm, function () {
            return this.file.relative.split('.').shift();
        }))
        .pipe(stripDebug())
        .pipe(concat('bundle.min.js'))
        .pipe(gap.prependText(`var AV = require('leanengine');var requestJS = require('request');`))//统一加上需要引入的函数库
        // .pipe(minify({
        //     ext: {
        //         src: orig,//源文件的后缀
        //         min: '.js'//经过minify的文件所命名的后缀
        //     },
        // }))
        // .pipe(gulpIgnore.exclude('*' + orig))//可以用于过滤文件

        .pipe(uglify({
        toplevel: true,
        }))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest(destPath));
    // console.log('minapi任务已完成');
    done();


    function CG() {

        var [match, p1, p2, p3, offset, string] = arguments[0];

        // Replace foobaz with barbaz and log a ton of information
        // See http://mdn.io/string.replace#Specifying_a_function_as_a_parameter
        // console.log('Found ' + match + ' with param ' + p1 + ' at ' + offset + ' inside of ' + string);

        var name = p1.match(/(action)?:[a-z]+/im)[0]
            .match(/:[\S]*/im)[0]
            .split(':')
            .pop()
            .toUpperCase();

        console.log(name);

        /* result = actions[name]; */
        var result = match;//默认是不替换,匹配部分换成结果,就是不替换
        switch (name) {
            case 'D':
            case 'DEL':
                result = '';
                break;
            case 'F':
            case 'FILENAME':
                result = `"${this.file.relative.split('.').shift()}"`
                break;
            default:

                break;
        }

        // console.log(result);

        return result;
    }

});

gulp.task('prepublish',
    gulp.series(
        // done => { console.log('> gulp prepublish'); done() },//gulp 4x版本一定要"async completion" 详情请参考:http://t.cn/EXBpo2u
        // 'minapi',
        'LeanCloudAPI',
    )
);