var db = require('../db');

exports.all = function (callback) {
	db.get().collection('todo').find().toArray(function (err, docs) {
		callback(err, docs);
	});
};

exports.findById = function (id, callback) {
	db.get().collection('todo').findOne({id:id}, function(err, doc) {
        callback(err, doc);
    });
};

exports.create = function (todoItem, callback) {
	db.get().collection('todo').insert(todoItem, function (err, result) {
      callback(err, result);
    });
}