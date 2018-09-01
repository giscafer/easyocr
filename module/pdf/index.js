/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-09-01 15:39:59
 * @description: 
 */

const PDFImage = require("./pdf2image").PDFImage;
const path = require('path');


/* pdf to images */
function convertFile(pdfPath) {
    const pdfImage = new PDFImage(pdfPath, {
        convertOptions: {
            "-quality": "95"
        }
    });
    console.log(pdfImage)
    return new Promise((resolve, reject) => {
        pdfImage.convertFile().then((imagePaths) => {
            return resolve(imagePaths);
        }).catch(err => {
            return reject(err);
        });
    });
}


module.exports = {
    convertFile
}