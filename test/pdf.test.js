/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-09-01 18:07:48
 * @description: 
 */


require('es6-promise');
const pdfModule = require('../module/pdf');
const orcModule = require('../module/ocr');


const path = require('path');
const pdfPath = path.join(__dirname, '../assets/专家意见和签名表.pdf');


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const timeout = (promise, ms) => new Promise((resolve, reject) => {
    promise.then(resolve, reject);

    (async () => {
        await delay(ms);
        reject(new Error('delay error'));
    })();
});

const test = () => new Promise((resolve, reject) => {
    let wordstr = "";
    (async () => {
        let imagePaths = await pdfModule.convertFile(pdfPath, { totalPageSize: 4 });
        const { length } = imagePaths;
        let count = -1;
        while (++count < length) {
            // 延时2秒执行，免费版百度OCR接口有qps限制
            console.log(imagePaths[count])
            let result = await timeout(orcModule.execOrcByImgPath(imagePaths[count]), 2000);
            if (!result.error_code) {
                const { words_result } = result;
                for (let row of words_result) {
                    wordstr += row.words + '\n';
                }
            }
        }
        resolve(wordstr);
    })();
});
test().then(result => console.log(result));
