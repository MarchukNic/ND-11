const fs = require('fs');
const conf = { encoding: 'utf8' };

function pathInfo(path, callback) {
    let info = {};
    info.path = path;
    fs.stat(path, getType);
    function getType(err, stats) {
        if (err) return err;
        if (stats.isFile()) {
            info.type = 'file';
            fs.readFile(path, conf, fileRead);
            function fileRead(err, content) {
                if (err) return (err);
                info.content = content;
                return callback(null, info);
            };
        } else {
            info.type = 'directory';
            fs.readdir(path, readAll);
            function readAll(err, files) {
                if (err) return (err);
                info.childs = files;
                return callback(null, info);
            };
        };

    };

};

module.exports = pathInfo;