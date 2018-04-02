const fs = require("fs");
const crypto = require('crypto');
const path = require(`path`);
const filenameIn = path.join(__dirname, 'data.txt');
const filenameOut = path.join(__dirname, 'copy.txt');

const input = fs.createReadStream(filenameIn);
const output = fs.createWriteStream(filenameOut, { encoding: 'utf8' });

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