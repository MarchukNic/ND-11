const fs = require("fs");
const crypto = require('crypto');
const path = require(`path`);
const { Transform } = require('stream')
const filenameIn = path.join(__dirname, 'data.txt');
const filenameOut = path.join(__dirname, 'copy.txt');
const pump = require('pump');
const input = fs.createReadStream(filenameIn);
const output = fs.createWriteStream(filenameOut, { encoding: 'utf8' });

var hash = crypto.createHash('md5');

class HashStream extends Transform{
    constructor(options){
        super(options);
    }
    _transform(chunk,encoding,callback) {
        this.push(chunk);
        callback();
    }

    _flush(doneCallback){
        let md5  = hash.digest('hex');
        console.log(`\nmd5(hex): ${md5}`);
        this.push(md5);
        doneCallback();
    }
}


const myvar = new HashStream(); 

// input.on('end', function() {
//     hash.end();
//     let md5  = hash.digest('hex');
//     console.log(`\nmd5(hex): ${md5}`);
//     output.end('\r\nmd5(hex): ' + md5);
// });

// input.pipe(myvar);
// input.pipe(output);

// input.pipe(myvar).pipe(output);

// input.pipe(myvar.pipe(output));

pump(input, myvar, output, (e) => console.error(e));
// input.pipe(process.stdout);