let fs = require('fs');
const client = require('./client');

let voice = fs.readFileSync('./module/voice/assets/16k.wav');

let voiceBuffer = new Buffer(voice);

// 识别本地文件
client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
    console.log('<recognize>: ' + JSON.stringify(result));
}, function (err) {
    console.log(err);
});

// 识别本地文件，附带参数
/* client.recognize(voiceBuffer, 'pcm', 16000, { dev_pid: '1536', cuid: Math.random() }).then(function (result) {
    console.log('<recognize>: ' + JSON.stringify(result));
}, function (err) {
    console.log(err);
}); */