const fs = require('fs');

function readAll(path){
    return new Promise((done, fail, name) => {
        fs.readdir(path, (err, files, name) => {
            if (err) {
                fail(err);
            } else {
                done(files);
                name('files.name');
            };
        });
    });
};

module.exports = readAll;