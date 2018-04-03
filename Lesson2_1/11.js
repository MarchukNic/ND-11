const https = require('https');
const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df&lang=ru-en&text=подосиновик'

function process(data) {
    // let curr = JSON.parse(data);
    // curr
    //     .filter(item => item.CharCode === 'USD' || item.CharCode === 'EUR')
    //     .forEach(item => console.log(item.Name, item.Value));
    console.log(JSON.parse(data));
}
function handler(response) {
    let data = '';
    response.setEncoding('utf8')
    response.on('data', function (chunk) {
        data += chunk;
    });
    response.on('end', function () {
        process(data);
    });
}
function handler2(req, res) {
    res.writeHead(200, 'OK', { 'Content-Type': 'text/html' });
    res.end();
}
const request = https.request(url);
request.on('request', handler2)
request.on('response', handler);
request.end();
