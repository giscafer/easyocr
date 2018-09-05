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
const { timer } = require('rxjs');
const { take } = require('rxjs/operators');

const path = require('path');

function pdfOcr(pdfPath) {
    // const pdfPath = path.join(__dirname, filePath);
    pdfModule.convertFile(pdfPath, { totalPageSize: 4 }).then(imagePaths => {
        console.log(imagePaths);
        // Open api qps request limit reached
        const source = timer(0, 2000).pipe(take(imagePaths.length));
        source.subscribe(val => {
            orcModule.execOrcByImgPath(imagePaths[val]).then(result => {
                // console.log(result)
                if (!result.error_code) {
                    const { words_result } = result;
                    let wordstr = "";
                    for (let row of words_result) {
                        wordstr += row.words;
                    }
                    console.log(wordstr);
                }
            });
        });
    }).catch(err => console.log(err));
}


function imgOcr(imgPath) {
    const image = fs.readFileSync(imgPath).toString("base64");
    return new Promise((resolve, reject) => {
        client.accurateBasic(image).then(function (result) {
            if (result.words_result) {
                return resolve(wordsHandler(result.words_result));
            }
            return reject('OCR失败失败！');
        }).catch(function (err) {
            // 如果发生网络错误
            return reject(err);
        });
    })
}


function wordsHandler(words) {
    let text = '';
    for (let w of words) {
        text += w.words;
    }

    return text;
}

module.exports = {
    pdfOcr,
    imgOcr
}