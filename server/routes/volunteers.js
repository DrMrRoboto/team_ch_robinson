var express = require('express');
var router = express.Router();
var Volunteer = require('../models/volunteers');

/*------------------------Volunteers------------------------*/
/* GET Volunteer listing for a specific Shift */
router.get('/:id', function(req, res, next) {
	var shiftID = req.params.id;
	Volunteer.find({shift_id: shiftID}, function(err, data){
		res.send(data);
	});
});

/*POST new Volunteer*/
router.post('/', function(req, res, next) {
	var newVolunteer = req.body;

	if(newVolunteer.name != undefined) {
		Volunteer.create(newVolunteer, function (err, data) {
			res.send(data);
		});
	}

});

/*Update Volunteer*/
router.put('/:id', function(req, res, next) {
	var volunteerID = req.params.id;
	var volunteer = req.body;
	Volunteer.findByIdAndUpdate(volunteerID, volunteer, {new:true}, function(err, data){
		res.send(data);
	});
});

/*DELETE Volunteer*/
router.delete('/:id', function(req, res, next) {
	var ID = req.params.id;
	Volunteer.delete(ID, function(err){
		if(err) throw err;
		res.send();
	});
});
