/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Events = require('events');
var Tasks = require('tasks');
var Shifts = require('shifts');

//creates a schema to standardize Volunteer creation

var VolunteerSchema = new mongoose.Schema ({
    firstName: {String, required: true},
    lastName: {String, required: true},
    email: {String, required: true},
    shirtSize: {String},
    guests: {Array},
    guestShirt: {String},
    shift_id: {String, required: true}
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);