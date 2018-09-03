const fs = require('fs');
const path = require('path');
const client = require('../module/ocr/AipOcrClient');

const imgPath = path.join(__dirname, '../assets/');
const image = fs.readFileSync(imgPath + "example.jpg").toString("base64");

// 调用通用文字识别（高精度版）
client.accurateBasic(image).then(function (result) {
    console.log(JSON.stringify(result));
}).catch(function (err) {
    // 如果发生网络错误
    console.log(err);
});

// 如果有可选参数
let options = {};
options["detect_direction"] = "true";
options["probability"] = "true";

// 带参数调用通用文字识别（高精度版）
// client.accurateBasic(image, options).then(function (result) {
//     console.log(JSON.stringify(result));
// }).catch(function (err) {
//     // 如果发生网络错误
//     console.log(err);
// });;