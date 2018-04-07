const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.status(200);
    res.send('Hello, Express.js');
});

app.get('/hello', function (req, res) {
    res.status(200);
    res.send('Hello stranger!');
});

app.get('/hello/:name', function (req, res) {
    res.status(200);
    res.send(`Hello, ${req.params.name}`);
});

app.all('/sub/*', function (req, res) {
    res.status(200);
    res.send(`You requested URI: ${req.url}`);
});

app.post('/post', function (req, res) {
    if (Object.keys(req.body).length == 0) {
        res.status(404).json({ error: 'нет тела запроса' });
    } else {
        if (req.headers.key == undefined) {
            res.status(401).json({ error: 'не указан ключ' });
         }
        else {
            res.status(200);
            res.json(req.body);
        }
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});