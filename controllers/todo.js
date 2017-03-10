var Todo = require('../models/todo');

exports.all = function (req, res) {
	Todo.all(function (err, docs) {
		if (err) {
			console.log(err);
			return res.sentStatus(500);
		};
		res.send(docs);
	});
};

exports.findById = function (req, res) {
	Todo.findById(req.params.id, function (err, doc) {
		if (err) {
            console.log(err);
            return res.sendStatus(500);
        };
        return res.send(doc);
    });
};

exports.create = function (req, res) {
	var todoItem = {
        id: Date.now(),
        age: req.body.age,
        status: "todo"
    };
    Todo.create(todoItem, function (err, result) {
    	if (err) {
            console.log(err);
            return res.sendStatus(500);
        };
        return res.send(todoItem);
    });
};
