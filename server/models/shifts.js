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

// Deletes Shifts and all associated Items

ShiftSchema.statics.delete = function(id, callback){
    this.findById(id, function(err, result){
        if (err) {
            callback(err);
        } else if (result != undefined){
            result.remove(callback);
        }
    });
    Volunteer.remove({categoryID: id}, function(err){
        if(err) {
            callback(err);
        } else if (!err) {
            callback()
        }
    })
};

module.exports = mongoose.model('Shift', ShiftSchema);