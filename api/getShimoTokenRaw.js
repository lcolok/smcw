var AV = require('leanengine');
var requestJS = require('request');

var filename = __filename.split("/").pop().split(".js").shift();

AV.Cloud.define(filename, async function (request) {
    return await getShimoTokenRaw();
});


function getShimoTokenRaw() {
    return new Promise((resolve, reject) => {
        requestJS.post('https://shimo.im/api/upload/token', {
            json: true,
            headers: {
                'Cookie': process.env.shimoCookie,
            }
        }, (err, httpResponse, body) => {
            if (!err) {
                var token = body.data.accessToken.toString();
                // console.log(token);
                resolve(token)
            } else {
                reject(false);
            }
        })
    })
}