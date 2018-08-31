var https = require('https');
var qs = require('querystring');
var config = require('./config');

const param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': config.API_KEY,
    'client_secret': config.SECRET_KEY
});

https.get(
    {
        hostname: 'aip.baidubce.com',
        path: '/oauth/2.0/token?' + param,
        agent: false
    },
    function (res) {
        // 在标准输出中查看运行结果
        res.pipe(process.stdout);
    }
);