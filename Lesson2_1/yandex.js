const querystring = require('querystring');
let data = querystring.stringify({
    'key': 'trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df',
    'lang': 'ru-en',
    'text': 'попугай'
});
console.log(data);
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
    // console.log(`STATUS: ${res.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    // res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

request.write(data);
request.end();