const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let users = [
    {
        // "id": 1,
        "name": "John",
        "score": 4
    },
    {
        // "id": 2,
        "name": "Tom",
        "score": 8
    },
    {
        // "id": 3,
        "name": "Tom",
        "score": 5
    }
];

app.get('/users/', (req, res) => {
    res.status(200);
    res.json(users.filter(u => u))
});

app.post('/users/', (req, res) => {
    users.push(req.body)
    res.status(200);
    res.send()
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    if (users[id]) {
        users[id] = null;
        res.status(200);
        res.send();
    } else {
        res.status(400);
        res.write('Данного пользователя нет!');
        res.send();
    }
});

// app.get('/users/:id', (req, res) => {
//     const id = req.params.id;
//     let item = users.find(item => item.id == id);
//     if (item !== undefined) {
//         res.json(item);
//     } else {
//         res.status(404);
//         res.send();
//     }
// });

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    if (users[id]) {
        res.json(users[id]);
    } else {
        res.status(400);
        res.write('Данного пользователя нет!');
        res.send();
    }
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    if (users[id]) {
        users[id] = Object.assign(users[id], req.body);
        res.status(200);
        res.json(users[id]);
    } else {
        res.status(400);
        res.write('Данного пользователя нет!');
        res.send();
    }
});

var RPC = {
    // call {"jsonrpc": "2.0", "method": "userAll"}
    userAll: function (params, callback) {
        callback(null, users);
    },
    // call {"jsonrpc": "2.0", "method": "user", "id": 0}
    user: function(params, callback){
        // console.log(params)
        callback(null, users[params])
    }
};

//http://www.jsonrpc.org/specification#examples
app.post("/rpc", function (req, res) {
    const method = RPC[req.body.method];
    if (method !== undefined) {
    method(req.body.id, function (error, result) {
        if (error) {
            res.status(400);
            res.write('Ошибка запроса!');
            res.send();
        }
        else {
            res.status(200);
            res.json(result);
        }
    })}
    else {
        res.status(400);
            res.write('Такого метода не существует!');
            res.send();
    }
});
//https://bcb.github.io/jsonrpc/node
//https://www.npmjs.com/package/node-json-rpc

app.listen(3000);