const fs = require("fs");
const crypto = require('crypto');
const filename = 'c:\\curs\\data.txt';

//Указан абсолютный путь, т.к. пути с пробелами (название директории с пробелами между словами) вызывают ошибку.
const input = fs.createReadStream(filename);
const output = fs.createWriteStream('c:\\curs\\copy.txt', { encoding: 'utf8' });

var hash = crypto.createHash('md5');

input.on('end', function() {
    hash.end();
    let md5  = hash.digest('hex');
    console.log(`\nmd5(hex): ${md5}`);
    output.end('\r\nmd5(hex): ' + md5);
});

input.pipe(hash);
input.pipe(output);

// input.pipe(process.stdout);