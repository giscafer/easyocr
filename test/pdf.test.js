/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-09-01 18:07:48
 * @description: 
 */


require('es6-promise');
const pdfModule = require('../module/pdf');
const orcModule = require('../module/ocr');
const { timer } = require('rxjs');
const { take } = require('rxjs/operators');


const path = require('path');
const pdfPath = path.join(__dirname, '../assets/专家意见和签名表.pdf');

function test() {
    pdfModule.convertFile(pdfPath, { totalPageSize: 4 }).then(imagePaths => {
        console.log(imagePaths);
        // Open api qps request limit reached
        const source = timer(0, 2000).pipe(take(imagePaths.length));
        source.subscribe(val => {
            orcModule.execOrcByImgPath(imagePaths[val]).then(result => {
                console.log(val);
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

test();