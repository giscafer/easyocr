/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-09-01 18:07:48
 * @description: 
 */


require('es6-promise');
const fs = require('fs');
const client = require('../module/ocr/AipOcrClient');
const pdfModule = require('../module/pdf');
const orcModule = require('../module/ocr');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const timeout = (promise, ms) => new Promise((resolve, reject) => {
    promise.then(resolve, reject);

    (async () => {
        await delay(ms);
        reject(new Error('delay error'));
    })();
});

/* PDF OCR */
const pdfOcr = pdfPath => new Promise((resolve, reject) => {
    let wordstr = "";
    (async () => {
        let imagePaths = await pdfModule.convertFile(pdfPath, { totalPageSize: 4 });
        const { length } = imagePaths;
        let count = -1;
        while (++count < length) {
            // 延时2秒执行原因：免费版百度OCR 接口有qps限制
            console.log(imagePaths[count]);
            try {
                let result = await timeout(orcModule.execOrcByImgPath(imagePaths[count]), 2000);
                if (!result.error_code) {
                    const { words_result } = result;
                    for (let row of words_result) {
                        wordstr += row.words + '\n';
                    }
                }
            } catch (error) {
                reject(error);
            }

        }
        resolve(wordstr);
    })();
});

/* 图片OCR */
const imgOcr = imgPath => {
    const image = fs.readFileSync(imgPath).toString("base64");
    return new Promise((resolve, reject) => {
        client.accurateBasic(image).then(function (result) {
            if (result.words_result) {
                return resolve(wordsHandler(result.words_result));
            }
            return reject('OCR 失败！');
        }).catch(function (err) {
            // 如果发生网络错误
            return reject(err);
        });
    })
}


function wordsHandler(words) {
    let text = '';
    for (let w of words) {
        text += w.words + '\n';
    }

    return text;
}

module.exports = {
    pdfOcr,
    imgOcr
}