/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Events = require('events');
var Shifts = require('shifts');
var Volunteers = require('volunteers');

//creates a schema to standardize Task creation

var TaskSchema = new mongoose.Schema ({
    name: String,
    description: String,
    event_id: String

});

module.exports = mongoose.model('Task', TaskSchema);