module.exports = () => {
    const fs = require("fs");
    // console.log('haah');
    const requestJS = require("request");
    requestJS.get(`https://leancloud.cn/1/clients/self/apps`, {
        headers: {
            'Cookie': process.env.lcCookie,
            'X-XSRF-TOKEN': process.env.xsrfToken,
        }
    }, (err, httpResponse, body) => {
        if (!err) {
            console.log('\n');
            const apps = JSON.parse(body);
            // console.log(apps);


            for (var app of apps) {
                app.app_id == process.env.LEANCLOUD_APP_ID ? console.log(app.app_name) : ""
            }
            // fs.writeFileSync("smc.data.json", JSON.stringify(app));

            console.log('\n');
        } else {
            console.log(err);
        }
    })
};