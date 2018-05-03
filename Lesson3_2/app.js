const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017";

app.use(express.static(__dirname + "/public"));
app.get("/api/users", function(req, res){
      
    mongoClient.connect(url, function(err, db){
        db.db('usersdb').collection("users").find({}).toArray(function(err, users){
            res.send(users)
            db.close();
        });
    });
});
app.get("/api/users/:id", function(req, res){
      
    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, db){
        db.db('usersdb').collection("users").findOne({_id: id}, function(err, user){
             
            if(err) return res.status(400).send();
             
            res.send(user);
            db.close();
        });
    });
});
 
app.post("/api/users", jsonParser, function (req, res) {
     
    if(!req.body) return res.sendStatus(400);
     
    var userName = req.body.name;
    var userLastName = req.body.lastname;
    var userPhone = req.body.phone;
    var user = {lastname: userLastName, name: userName, phone: userPhone};
     
    mongoClient.connect(url, function(err, db){
        db.db('usersdb').collection("users").insertOne(user, function(err, result){
             
            if(err) return res.status(400).send();
             
            res.send(user);
            db.close();
        });
    });
});
  
app.delete("/api/users/:id", function(req, res){
      
    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, db){
        db.db('usersdb').collection("users").findOneAndDelete({_id: id}, function(err, result){
             
            if(err) return res.status(400).send();
             
            var user = result.value;
            res.send(user);
            db.close();
        });
    });
});
 
app.put("/api/users", jsonParser, function(req, res){
      
    if(!req.body) return res.sendStatus(400);
    var id = new objectId(req.body.id);
    var userLastName = req.body.lastname;
    var userName = req.body.name;
    var userPhone = req.body.phone;
     
    mongoClient.connect(url, function(err, db){
        db.db('usersdb').collection("users").findOneAndUpdate({_id: id}, { $set: {phone: userPhone, name: userName, lastname: userLastName}},
             {returnOriginal: false },function(err, result){
             
            if(err) return res.status(400).send();
             
            var user = result.value;
            res.send(user);
            db.close();
        });
    });
});
  
app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});