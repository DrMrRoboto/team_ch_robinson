var express = require('express');
var router = express.Router();
var Event = require('../models/events');

/*------------------------Events------------------------*/
/* GET Events listing. */
router.get('/', function(req, res, next) {
	Event.find({_id: {$exists: true}}, function(err, data){
		res.send(data);
	});
});

/* GET single Event information */
router.get('/:id', function(req, res, next) {
	var eventId = req.params.id;
	Event.find({_id: eventId}, function(err, data){
		console.log(data);
		res.send(data[0]);
	});

});

/*POST new Event*/
router.post('/', function(req, res, next) {
	var newEvent = req.body;

	if(newEvent.title != undefined) {
		Event.create(newEvent, function (err, data) {
			res.send(data);
		});
	}

});

/*Update Event*/
router.put('/:id', function(req, res, next) {
	var eventID = req.params.id;
	var event = req.body;
	Event.findByIdAndUpdate(eventID, event, {new:true}, function(err, data){
		res.send(data);
	});
});

/*DELETE Event*/
router.delete('/:id', function(req, res, next) {
	var ID = req.params.id;
	Event.delete(ID, function(err){
		if(err) throw err;
		res.send();
	});
});

module.exports = router;