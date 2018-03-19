const file = require('./file-promise');
const fs = require('fs');

function readAll(path){
    return new Promise((done, fail) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                fail(err);
            } else {
                // console.log(files[0]);
                // let file2 = {};
                // for (let i = 0; files.length - 1; ++i){
                //     file2.name = files[i];
                //     file2.content = files[i];
                //     files[i] = file2;
                // }
                // console.log(file2);
                done(filesContent(files,path));
                // done(files);
            };
        });
    });
};


const filesContent = (itemIds, path) => Promise.all(
    itemIds.map(
        name => {
            console.log(path + name);
            return file.read(path + name)
                .then(content => {
                    console.log({ content, name });
                    return { content, name }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    )
)

module.exports = readAll;