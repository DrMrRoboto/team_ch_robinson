/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Events = require('events');
var Tasks = require('tasks');
var Volunteers = require('volunteers');

//creates a schema to standardize Shift creation

var ShiftSchema = new mongoose.Schema ({
    name: {String, required: true},
    timeStart: {Number, required: true},
    timeEnd: {Number, required: true},
    slotsAvailabl: {Number, required: true},
    slotsUsed: {Number, required: true},
    task_id: {String, required: true}
});

module.exports = mongoose.model('Shift', ShiftSchema);