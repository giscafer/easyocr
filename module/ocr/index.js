const fs = require('fs');
const path = require('path');
const client = require('./AipOcrClient');

// 调用通用文字识别（高精度版）
function execOrc() {
    return new Promise((resolve, reject) => {
        client.accurateBasic(image).then(result => {
            return resolve(result);
        }).catch(err => {
            // 如果发生网络错误
            return reject(err);
        });

    });
}

function execOrcByImgPath(imgPath) {
    const image = fs.readFileSync(imgPath).toString("base64");
    return new Promise((resolve, reject) => {
        client.accurateBasic(image).then(result => {
            return resolve(result);
        }).catch(err => {
            // 如果发生网络错误
            return reject(err);
        });

    });
}


// 如果有可选参数
/* let options = {};
options["detect_direction"] = "true";
options["probability"] = "true";

// 带参数调用通用文字识别（高精度版）
client.accurateBasic(image, options).then(function (result) {
    console.log(JSON.stringify(result));
}).catch(function (err) {
    // 如果发生网络错误
    console.log(err);
}); */


module.exports = {
    execOrc,
    execOrcByImgPath
}