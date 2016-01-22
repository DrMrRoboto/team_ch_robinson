/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Event = require('./events');
var Task = require('./tasks');
var Volunteer = require('./volunteers');

//creates a schema to standardize Shift creation
var ShiftSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    timeStart: {type: Number, required: true},
    timeEnd: {type: Number, required: true},
    slotsAvailable: {type: Number, required: true},
    slotsUsed: {type: Number, required: true},
    task_id: {type: String, required: true}
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
    Volunteer.remove({shift_id: id}, function(err){
        if(err) {
            callback(err);
        } else if (!err) {
            callback()
        }
    })
};

module.exports = mongoose.model('Shift', ShiftSchema);