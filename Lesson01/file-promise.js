const fs = require('fs');
const conf = { encoding: 'utf8' };

function read(path){
    return new Promise((done, fail) => {
        fs.readFile(path, conf, (err, content) => {
            if (err) {
                fail(err);
            } else {
                done(content);
            };
        });
    });
};

function write(filepath, data){
    return new Promise((done, fail) => {
        fs.writeFile(filepath, data, conf, err => {
            if (err) {
                fail(err);
            } else {
                done(filepath);
            };
        });
    });
};

module.exports = {
    read, write
};