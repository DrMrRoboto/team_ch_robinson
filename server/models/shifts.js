/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Events = require('events');
var Tasks = require('tasks');
var Volunteers = require('volunteers');

//creates a schema to standardize Shift creation

var ShiftSchema = new mongoose.Schema ({
    name: String,
    timeStart: Number,
    timeEnd: Number,
    slotsAvailabl: Number,
    slotsUsed: Number,
    task_id: String
});

module.exports = mongoose.model('Shift', ShiftSchema);