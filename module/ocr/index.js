/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-09-03 20:13:23
 * @description: 
 */


const fs = require('fs');
const path = require('path');
const client = require('./AipOcrClient');

// 调用通用文字识别（高精度版）
function execOrc(image) {
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

module.exports = {
    execOrc,
    execOrcByImgPath
}
