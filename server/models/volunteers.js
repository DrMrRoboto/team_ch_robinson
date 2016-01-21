/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Events = require('events');
var Tasks = require('tasks');
var Shifts = require('shifts');

//creates a schema to standardize Volunteer creation

var VolunteerSchema = new mongoose.Schema ({
    firstName: String,
    lastName: String,
    email: String,
    shirtSize: String,
    guests: Array,
    shift_id: String
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);