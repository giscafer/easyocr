
const express = require('express');
const app = express();

app.get('/', (res, rep) => {
    rep.send('Hello Express!');
});

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})