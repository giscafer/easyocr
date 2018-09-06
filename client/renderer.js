/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2018-09-06 15:53:46
 * @description: 拖拽事件处理，对应不同文件进行OCR识别，以及结果展示等逻辑
 */

const ocr = require('./ocr');
const _ = require('./utils');
const eleHodler = document.getElementById("holder");
const eleSelectedFile = document.getElementById('selected-file');
const eleCopyBtn = document.getElementById('copyBtn');
const eleOcrResult = document.getElementById('ocr-result');
const eleLoading = document.querySelector('.loading');

const { dialog } = require('electron').remote


/* 禁止默认的drop事件 */
document.addEventListener('drop', event => {
    console.log(event)
    event.preventDefault();
    event.stopPropagation();
});

document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

eleCopyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let flag = _.copy(eleOcrResult.innerText);
    if (flag) {
        dialog.showMessageBox(null, {
            type: 'info',
            message: '文本已成功复制到剪切板！',
        });
    }
})

/* 拖拽进入holder区域 */
eleHodler.ondragenter = eleHodler.ondragover = event => {
    // 重写ondragover 和 ondragenter 使其可放置
    event.preventDefault();
    eleHodler.classList.add("holder-ondrag");
};

/* 拖拽离开holder区域 */
eleHodler.ondragleave = event => {
    event.preventDefault();
    eleHodler.classList.remove("holder-ondrag");
    eleSelectedFile.innerText = '';
};

/* 拖拽释放 */
eleHodler.ondrop = event => {
    event.preventDefault();
    event.stopPropagation();
    eleLoading.classList.remove('hide');
    eleHodler.classList.remove("holder-ondrag");
    let f = event.dataTransfer.files[0];
    console.log('File(s) you dragged here: ', f.path);
    eleSelectedFile.innerText = f.path;
    // OCR
    fileHandler(f.path);
}


function fileHandler(path) {

    if (_.isImage(path)) {
        ocr.imgOcr(path).then(result => {
            eleOcrResult.innerText = result;
            eleLoading.classList.add('hide');
        }).catch(e => {
            console.log(e);
        });
        return;
    }

    if (_.isPdf(path)) {
        // PDF
        ocr.pdfOcr(path).then(result => {
            eleOcrResult.innerText = result;
            eleLoading.classList.add('hide');
        }).catch(e => {
            console.log(e);
        });
        return;
    }

    return dialog.showMessageBox(null, {
        type: 'error',
        message: 'OCR只支持 图片 和 PDF 两种文件类型！',
    }, () => {
        eleSelectedFile.innerText = '';
        eleLoading.classList.add('hide');
    });

}


