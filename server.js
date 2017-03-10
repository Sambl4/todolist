var express = require('express'); // загружаем библиотеку express  и сохраняем в соотв-щей переменной
var bodyParser = require('body-parser'); //библиотека, которая парсит тело запроса и в requst body записывает то, что мы туда передаем
var MongoClient = require('mongodb').MongoClient;    // импортируем пакет с монго 
var path = require('path');
var mongojs = require('mongojs');
var mongoose = require('mongoose');

var ObjectID = require('mongodb').ObjectID; 

//var ObjectID = require('mongodb').ObjectID; //для конвертации id mongo, т.к. монго создает свои id

var app = express(); // переменная, которая будет являться нашим сервером
var db; // описываем переменную, которая будет видна во всем app  и будет ссылкой на базу данных
app.use(bodyParser.json()); // чтобы парсить json который мы передаем в боди
app.use(bodyParser.urlencoded({extended: true})); // чтабы парсить данные формы
app.use(express.static(__dirname));


// app.get('/', function(req, res) {       //описываем метод get, когда мы заходим на url: "/" нам на страницу отправляется hello
//     res.sendFile(__dirname + "/index.html");
// });

app.get('/todo', function(req, res) {
    db.collection('todo').find().toArray(function(err, docs) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        };
        res.send(docs)
    });
});

app.get('/todo/:id', function(req, res) {
    //db.collection('todoArr').findOne({_id: ObjectID(req.params.id)}, function(err, doc) {
        console.log(req.params);
    db.collection('todo').findOne({id:Number(req.params.id)}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        };
       return res.send(doc);
    });
});

















app.post('/todo', function(req, res) {
    var todoItem = {
        id: req.body.id,
        status: req.body.status,
        name: req.body.name,
        deadline: req.body.deadline,
        priority: req.body.priority,
        description: req.body.description
    };

    db.collection('todo').insert(todoItem, function (err, result) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        };
        res.send(todoItem);
    });
});

// app.put('/todo/:id', function(req, res) {
//     db.collection('todo').updateOne(
//         {id: Number(req.params.id)},
//         // {priority: req.body.priority},
//         {status: req.body.status},
//         function(err, result) {
//             if(err) {
//                 console.log(err);
//                 return res.sendStatus(500);
//             };

//             res.sendStatus(200);
//         }
//     );

// });

app.put('/todo/:id', function(req, res) {
    
    db.collection('todo').updateOne(
        {id: Number(req.params.id)},
        {
            id: req.body.id,
            status: req.body.status,
            name: req.body.name,
            deadline: req.body.deadline,
            priority: req.body.priority,
            description: req.body.description
        },
        function(err, result) {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            };

            res.sendStatus(200);
        }
    );

});






app.delete('/todo/:id', function(req, res) {
    db.collection('todo').deleteOne(
        // {id: Number(req.params.id)},
        {_id: "todo"},
        function(err, result) {
            if(err) {
                console.log(err);
                return res.sendStatus(500);
            };
            res.sendStatus(200);
        });
});







/*                                              */
/*  настраеваем сервер на определенный порт     */
/*                                              */


// MongoClient.connect('mongodb://localhost:27017/myTodo', function(err, database) {
MongoClient.connect('mongodb://sambl4todo:sambl4todopass@ds145379.mlab.com:45379/todolist', function(err, database) {
    if (err) {
        return console.log(err);
    }
    db = database;
    
    app.listen(8080, function() {       //проект запустится только тогда, когда будет загружена базаданных
        console.log("server started");
    }) 
});