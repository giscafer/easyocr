/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-09-01 20:39:59
 * @description: 
 */

const PDFImage = require("./pdf2image").PDFImage;
const path = require('path');


/* pdf to images */
function convertFile(pdfPath, opts) {
    if (!opts) opts = {};
    const pdfImage = new PDFImage(pdfPath, {
        graphicsMagick: true,
        convertOptions: {
            "-quality": "100"
        },
        ...opts
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