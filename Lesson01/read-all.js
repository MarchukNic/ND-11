const fs = require('fs');

function readAll(path){
    return new Promise((done, fail) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                fail(err);
            } else {
                console.log(files[0]);
                let file2 = {};
                for (let i = 0; files.length - 1; ++i){
                    file2.name = files[i];
                    file2.content = files[i];
                    files[i] = file2;
                }
                console.log(file2);
                //done(filesContent(files));
                done(files);
            };
        });
    });
};

function filesContent(files){
    let file = [{ name: 'Петя', content: 'dsfssfsdf' },{ name: '2Петя', content: '2dsfssfsdf' },{ name: '3Петя', content: '3dsfssfsdf' }];
    file[0].name = 'bujkm';
    console.log(file);
    console.log(file[0].name)
    console.log(files);
    return file;
}

module.exports = readAll;