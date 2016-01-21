var express = require('express');
var router = express.Router();
var Shift = require('../models/shifts');

/*------------------------Shifts------------------------*/
/* GET Shift listing for a specific Task */
router.get('/:id', function(req, res, next) {
	var taskID = req.params.id;
	Shift.find({task_id: taskID}, function(err, data){
		res.send(data);
	});
});

/*POST new Shift*/
router.post('/', function(req, res, next) {
	var newShift = req.body;

	Shift.create(newShift, function (err, data) {
		res.send(data);
	});

});

/*Update Shift*/
router.put('/:id', function(req, res, next) {
	var shiftID = req.params.id;
	var shift = req.body;
	Shift.findByIdAndUpdate(shiftID, shift, {new:true}, function(err, data){
		res.send(data);
	});
});

/*DELETE Shift*/
router.delete('/:id', function(req, res, next) {
	var ID = req.params.id;
	Shift.delete(ID, function(err){
		if(err) throw err;
		res.send();
	});
});
