const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer()
    .listen(PORT)
    .on('error'
        , err => console.error(err))
    .on('request'
        , handler)
    .on('listening'
        , () => {
            console.log('Start HTTP on port %d', PORT);
        });

function handler(req, res) {
    let name = req.url.replace('/', '') || 'World';
    res.writeHead(200, 'OK', { 'Content-Type': 'text/plain' });
    res.write(`Hello ${name}!`);
    res.end();
}
