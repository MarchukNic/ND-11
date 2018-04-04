const http = require('http');
const https = require('http');
const querystring = require('querystring');
const PORT = 3000;

http.createServer()
    .listen(PORT)
    .on('error', err => console.error(err))
    .on('request', handler2)
    .on('listening', () => {
        console.log('Start HTTP on port %d', PORT);
    });

// function handler(req, res) {
//     let name = req.url.replace('/', '') || 'World';
//     let txt = require('url').parse(req.url, true).query.text;
//     res.writeHead(200, 'OK', { 'Content-Type': 'text/html; charset=utf-8' });
//     // res.write(`Hello ${name}!`);
//     res.write('<form><input type="text" name="text" /><input type="submit" name="btnTranslate" value="Перевести текст" /></form>', 'utf-8');
//     res.end();
// }
function translate(txt) {
    return new Promise((resolve, reject) => {

        let data = querystring.stringify({
            'key': 'trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df',
            'lang': 'ru-en',
            'text': txt
        });
        // console.log(data);
        let options = {
            hostname: 'translate.yandex.net',
            protocol: 'https:',
            port: 443,
            path: '/api/v1.5/tr.json/translate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(data)
            }
        };
        const https = require('https');
        // let request = http.request(options);
        const request = https.request(options, (res) => {
            let data2 = ''
            res.on('data', (chunk) => {
                data2 += chunk;
                // console.log(`BODY: ${chunk}`);
                // return chunk;
                // callback(chunk);
            });
            res.on('end', () => {
                // console.log(data2);
                // return data;
                data2 = JSON.parse(data2)
                resolve(data2.text);
            });
        });

        request.write(data);
        request.end();

    });
}

function checkFile(txt) {
    return new Promise((resolve, reject) => {
        let trans = translate(txt);

        resolve(trans);
    });
}

function handler2(req, res) {
    let txt = require('url').parse(req.url, true).query.text;
    if (txt === undefined) {
        res.writeHead(200, 'OK', { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(`Готов к переводу!`);
        res.write('<form><input type="text" name="text" /><input type="submit" name="btnTranslate" value="Перевести текст" /></form>', 'utf-8');
        res.end();
    }
    else {
        checkFile(txt)
            .then(data => {
                res.writeHead(200, 'OK', { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(`Перевод: ${data}!`);
                res.write('<form><input type="text" name="text" /><input type="submit" name="btnTranslate" value="Перевести текст" /></form>', 'utf-8');
                res.end();
            })
            .catch(err => {
                res.writeHead(404, http.STATUS_CODES[404], { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('File not found');
            });
    }
}

