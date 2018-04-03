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
            return file.read(path + name)
                .then(content => {
                    return { content, name }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    )
)

module.exports = readAll;