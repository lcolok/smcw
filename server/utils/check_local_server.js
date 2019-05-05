var path = require('path');
var net = require('net');
const chalk = require('chalk');
var axios = require('axios');
var CircularJSON = require('circular-json');
var fs = require('fs');
// 检测端口是否被占用
function checkLocalServer(port) {
    /*     // 创建服务并监听该端口
        var server = net.createServer().listen(port)
      
        server.on('listening', function () { // 执行这块代码说明端口未被占用
            server.close() // 关闭服务
            console.log('The port【' + port + '】 is available.') // 控制台输出信息
    
    
        })
    
        server.on('error', function (err) {
            if (err.code === 'EADDRINUSE') { // 端口已经被使用
                console.log('The port【' + port + '】 is occupied, please change other port.')
            }
        }) */

    // axios.get(`http://localhost:${port}`, {
    //     params: {

    //     }
    // })
    //     .then(function (response) {
    //         // console.log(response.headers.etag);
    //         if (response.headers.etag == `W/"665-BkYaAS0FaeL/9rTmpnxKwmu3L5Y"`){
    //           tellReady(port);
    //         }
    //         fs.writeFileSync(__dirname + '/catchFeatures.json', CircularJSON.stringify(response, null, '\t'));
    //     })
    //     .catch(function (error) {
    //         // console.log(error);
    //         // console.log("并没有"+port);
    //     });


    axios.get(`http://localhost:${port}`, {
        params: {

        }
    })
        .then(function (response) {
            // var code = '看到这句话你就知道它正在开发中|特殊编号:Vue_Vuetify_LCO_Dev';
            var code = require(path.resolve('package.json')).name;
            // console.log(response.headers.etag);
            if (response.data.match(code)) {
                tellReady(port)
            }

        })
        .catch(function (error) {
            // console.log(error.status);
            // console.log("并没有"+port);
        });

    function tellReady(currentPort) {
        var publicPath = require(path.resolve('vue.config.js')).publicPath;//获取公共路径
        console.log(chalk.green.inverse(` CLIENT READY `) + ' ' + 'Vue App running at', `${chalk.green('http://localhost:' + currentPort + publicPath)}`);
    }

}

module.exports = checkLocalServer