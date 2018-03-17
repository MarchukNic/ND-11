const fs = require('fs');

fs.readdir('./logs/', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => console.log(file));
});