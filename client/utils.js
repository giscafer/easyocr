function isImage(imgUrl) {
    let imageFormat = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];
    imgUrl = imgUrl.toLowerCase();
    return imageFormat.some(ft => {
        return imgUrl.endsWith(ft);
    });
}

function isPdf(url) {
    let format = ['.pdf'];
    url = url.toLowerCase();
    return format.some(ft => {
        return url.endsWith(ft);
    });
}

// https://github.com/sindresorhus/copy-text-to-clipboard/blob/master/index.js
/* tslint:disable */
function copy(input) {
    const el = document.createElement('textarea');

    el.value = input;

    // Prevent keyboard from showing on mobile
    el.setAttribute('readonly', '');

    el.style['contain'] = 'strict';
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.fontSize = '12pt'; // Prevent zooming on iOS

    const selection = getSelection();
    let originalRange = false;
    if (selection.rangeCount > 0) {
        originalRange = selection.getRangeAt(0);
    }

    document.body.appendChild(el);
    el.select();

    // Explicit selection workaround for iOS
    el.selectionStart = 0;
    el.selectionEnd = input.length;

    let success = false;
    try {
        success = document.execCommand('copy');
    } catch (err) { }

    document.body.removeChild(el);

    if (originalRange) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
    }

    return success;
}


module.exports = {
    copy, isImage, isPdf
}