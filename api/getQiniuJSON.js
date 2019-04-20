


async function thisFunc(request) {

    var fileNameArr = request.params.fileNameArr;
    var shimoToken = await AV.Cloud.run('getShimoTokenRaw');
    console.log(shimoToken);
    return new Promise((resolve, reject) => {
        requestJS.post(`https://uploader.shimo.im/token?server=qiniu&type=attachments&accessToken=${shimoToken}`, {
            json: true,
            body: fileNameArr
            /*             headers: {
                            'Cookie': process.env.shimoCookie,
                        } */
        }, (err, httpResponse, body) => {
            if (!err) {
                console.log(body);
                resolve(body)
            } else {
                reject(false);
            }
        })
    })
}

/*CG:D*/

require('../tools/identifier.js').run({
    rules: '!vscode||local',
    func: async () => {

        var feedback = await thisFunc({
            params: {
                fileNameArr: ['test.mp4']
            }
        })
        // console.log(feedback);
    }
})

/*CG:D*/