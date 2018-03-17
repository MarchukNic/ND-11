const fs = require('fs');

function readAll(path){
    
    return new Promise((done, fail) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                fail(err);
            } else {
                //file = {name: files}
                let file = [{ name: 'Петя', content: 'dsfssfsdf' },{ name: 'Петя', content: 'dsfssfsdf' },{ name: 'Петя', content: 'dsfssfsdf' }];
                console.log(file);
                console.log(files);
                //done(files);
                done(file);
                //done([{ name: 'Петя', content: 'dsfssfsdf' },{ name: 'Петя', content: 'dsfssfsdf' },{ name: 'Петя', content: 'dsfssfsdf' }]);
            };
            //console.log(files);
        });
        //console.log(file.name);
    });
    //console.log(file.name);
};

module.exports = readAll;