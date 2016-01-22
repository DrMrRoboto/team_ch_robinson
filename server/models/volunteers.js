/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Event = require('./events');
var Task = require('./tasks');
var Shift = require('./shifts');

//creates a schema to standardize Volunteer creation

var VolunteerSchema = new mongoose.Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number},
    shirtSize: String,
    guests: Array,
    shift_id: {type:String, required: true}
});

// Deletes Volunteers
VolunteerSchema.statics.delete = function(id, callback){
    this.findById(id, function(err, result){
        if (err) {
            callback(err);
        } else if (result != undefined){
            result.remove(callback)
        }
    });
};

module.exports = mongoose.model('Volunteer', VolunteerSchema);