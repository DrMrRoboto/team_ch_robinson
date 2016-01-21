var express = require('express');
var router = express.Router();
var Task = require('../models/tasks');

/*------------------------Tasks------------------------*/
/* GET Task listing for a specific Event */
router.get('/:id', function(req, res, next) {
	var eventID = req.params.id;
	Task.find({event_id: eventID}, function(err, data){
		res.send(data);
	});
});

/*POST new Task*/
router.post('/', function(req, res, next) {
	var newTask = req.body;

	if(newTask.name != undefined) {
		Task.create(newTask, function (err, data) {
			res.send(data);
		});
	}

});

/*Update Task*/
router.put('/:id', function(req, res, next) {
	var taskID = req.params.id;
	var task = req.body;
	Task.findByIdAndUpdate(taskID, task, {new:true}, function(err, data){
		res.send(data);
	});
});

/*DELETE Task*/
router.delete('/:id', function(req, res, next) {
	var ID = req.params.id;
	Task.delete(ID, function(err){
		if(err) throw err;
		res.send();
	});
});

module.exports = router;