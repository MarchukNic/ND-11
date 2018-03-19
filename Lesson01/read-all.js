const file = require('./file-promise');
const fs = require('fs');

function readAll(path){
    return new Promise((done, fail) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                fail(err);
            } else {
                done(filesContent(files,path));
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