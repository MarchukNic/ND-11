const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const mongoClient = require("mongodb").MongoClient;
// const objectId = require("mongodb").ObjectID;
const jsonParser = bodyParser.json();
// const url = "mongodb://localhost:27017";

const app = express();

mongoose.connect('mongodb://localhost/taskList');

const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', console.error.bind(console,'connection error: '));
db.once('open', function(){
    console.log('Connection!')
});

var userSchema = new Schema({
    name: String
});

var taskSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    user: ObjectId
});

var User = mongoose.model('users', userSchema);
var Task = mongoose.model('tasks', taskSchema);
// user = new User();
// user.name = 'Alex';
// user.save();

// Пользователи (имя) [список, добавление, редактирование, удаление];
// Создание нового пользователя
// { "name": "Oleg" }
app.post("/api/users", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    user = new User();
    user.name = req.body.name;
    user.save(function (err, result) {
        if (err) return res.status(400).send();
        res.send(user);
    });
});

// Редактирование пользователя по его id
// http://localhost:3000/api/users/5b3469c628bbfc3518124185
// { "name": "Oleg" }
app.put("/api/users/:id", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    User.findByIdAndUpdate(req.params.id, {$set: {name: req.body.name}}, { new: true }, function (err, result) {
        if (err) return res.status(400).send();
        res.send(result);
    });
});

// Удаление пользователя
app.delete("/api/users/:id", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    User.findOneAndDelete(req.params.id, function (err, result) {
        if (err) return res.status(400).send();
        res.send(result);
    });
});

// Получения списка всех пользователей
app.get("/api/users", function (req, res) {
    User.find({}, function (err, users) {
        res.send(users)
    });
});

// Задачи (название, описание, открыта/закрыта, пользователь) [список, добавление, редактирование, удаление];
// Создание новой задачи
// { "name": "Задача 1", "description": "Описание задачи номер 1", "status": 1 , "user": "5b347b3ce903b4379c5f4fae" }
app.post("/api/tasks", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    task = new Task();
    task.name = req.body.name;
    task.description = req.body.description;
    task.status = req.body.status;
    task.user = req.body.user;
    task.save(function (err, result) {
        if (err) return res.status(400).send();
        res.send(task);
    });
});

// Редактирование задачи по её id
// http://localhost:3000/api/tasks/5b34a362ee92452f20063af6
// { "name": "Задача 1 upd", "description": "Описание задачи номер 1 upd", "status": 0 , "user": "5b347b3ce903b4379c5f4fae" }
app.put("/api/tasks/:id", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    Task.findByIdAndUpdate(req.params.id, {$set: {
        name: req.body.name, 
        description: req.body.description,
        status: req.body.status,
        user: req.body.user
        }}, { new: true }, function (err, result) {
        if (err) return res.status(400).send();
        res.send(result);
    });
});

// Удаление задачи
app.delete("/api/tasks/:id", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    Task.findOneAndDelete(req.params.id, function (err, result) {
        if (err) return res.status(400).send();
        res.send(result);
    });
});

// Получения списка всех задач
app.get("/api/tasks", function (req, res) {
    Task.find({}, function (err, tasks) {
        res.send(tasks)
    });
});

// Задачу можно открыть/закрывать, делегировать на пользователя;
// Закрыть/открыть задачу по её id
// { "status": 0 } или { "status": 1 }
app.put("/api/status/:id", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    Task.findByIdAndUpdate(req.params.id, {$set: { status: req.body.status }}, { new: true }, function (err, result) {
        if (err) return res.status(400).send();
        res.send(result);
    });
});

// Делегировать задачу по её id
// { "user": "5b347b3ce903b4379c5f4fae" }
app.put("/api/delegate/:id", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    Task.findByIdAndUpdate(req.params.id, {$set: { user: req.body.user }}, { new: true }, function (err, result) {
        if (err) return res.status(400).send();
        res.send(result);
    });
});

// Поиск по названию и описанию задач.
app.post("/api/search", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    Task.find({ $or:[ { name: new RegExp( req.body.name, "i") } , { description: new RegExp( req.body.name, "i") }]}, function (err, result) {
        if (err) return res.status(400).send();
        res.send(result);
    });
});

// Используя aggregation framework в mongodb сделать статистику: 
// список пользователей и количество у них закрытых задач, отсортированных по убыванию.
app.get("/api/aggregrate", function (req, res) {
    Task.aggregate([
        {
            $lookup: {
               from: "users",
               localField: "user",    // field in the orders collection
               foreignField: "_id",  // field in the items collection
               as: "fromUsers"
            }
         },      
        {
            $match: {
                status: false
            }
        },
        {
            $group: {
                _id: '$users.name', 
                count: {$sum: 1}
            }
        },
        { 
            $sort: { 
                count : -1 
            } 
        }
    ], function (err, result) {
        if (err) return res.status(400).send();
        res.send(result);
    });
});



// user 
// // Equality Match
// {
//     from: "tasks",
//     localField: "_id",
//     foreignField: "user",
//     as: "<output>"
// }

app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
});