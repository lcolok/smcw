const chalk = require('chalk');

// 这里用到一个很实用的 npm 模块，用以在同一行打印文本
var slog = require('single-line-log').stdout;

// 封装的 ProgressBar 工具
function ProgressBar() {
    var __this = this;
    // 两个基本参数(属性)
    var params = arguments[0];
    this.description = params.description || 'Progress';       // 命令行开头的文字信息
    this.length = params.length || 25;                     // 进度条的长度(单位：字符)，默认设为 25
    this.theme_color = params.theme_color || "green";

    this.begin = new Date();

    this.step = 0;

    // 刷新进度条图案、文字的方法
    this.render = function (opts) {

        var percent = (opts.completed / opts.total).toFixed(4);    // 计算进度(子任务的 完成数 除以 总数)
        var cell_num = Math.floor(percent * this.length);             // 计算需要多少个 █ 符号来拼凑图案


        var cell = empty = processBar = status = statusICON = details = '';
        if (percent < 1) {//还没完成的时候
            // 拼接黑色条
            for (var i = 0; i < cell_num; i++) {
                cell += '█';

            }

            // 拼接灰色条
            for (var i = 0; i < this.length - cell_num; i++) {
                empty += '█';
            }
            processBar = ' ' + chalk`{${this.theme_color} ${cell}}` + chalk`{white ${empty}}`;
            status = 'Building';
            statusICON = '●';
        } else {
            status = 'Completed';
            statusICON = '✔';
            this.end = new Date();
            var duration = this.end - this.begin;//耗时,单位:ms
            function parseTime(d, u) { return u == 's' ? (d / 1000).toFixed(2) + 's' : d + 'ms' }
            details = `Compiled successfully in ${parseTime(duration, 's')}`;
        }

        // 拼接最终文本
        var cmdText = chalk`{${this.theme_color} ${statusICON} ${this.description}}${processBar} ${status}(${(100 * percent).toFixed(0)}%) ${opts.completed}/${opts.total}`

        var detailsText = chalk`{grey ${details}}`

        // 在单行输出文本
        slog('\n' + cmdText + '\n' + detailsText + '\n\n');
    };

    this.motionRender = function () {
        clearTimeout(__this.timer);//如果已经有一个正在播放的进度条,先把它清除掉

        var params = arguments[0];

        devBuild(params.begin, params.end, params.total);
        function devBuild(s, e) {
            var num = s;

            if (num <= e) {
                // 更新进度条
                __this.render({ completed: num, total: params.total });
                num++;
                __this.timer = setTimeout(function () {
                    devBuild(num, e);
                }, params.delay)
            }
        }
    };

    this.stepRender = function () {
        clearTimeout(__this.timer);//如果已经有一个正在播放的进度条,先把它清除掉
        __this.motionRender({
            begin: __this.step * params.fps,
            end: (__this.step + 1) * params.fps,
            total: params.total * params.fps
        });
        __this.step++;
    }
}





// 模块导出
module.exports = ProgressBar;