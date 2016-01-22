/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Event = require('./events');
var Shift = require('./shifts');
var Volunteer = require('./volunteers');

//creates a schema to standardize Task creation
var TaskSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    event_id: {type: String, required: true}
});

// Deletes Tasks and all associated Shifts and Volunteers
TaskSchema.statics.delete = function(id, callback){
    //Deletes the Task using the Task id
    this.findById(id, function(err, result){
        if(err) {
            callback(err);
        } else if (result != undefined){
            result.remove(callback);
        }
    });
    //Deletes all associated Shifts, and Volunteers by using Shift.delete method
    Shift.find({task_id: id}, function(err, data){
        if(err) {
            callback(err);
        } else if (data) {
            data.forEach(function(record){
                console.log(record._id);
                var ID = record._id;
                Shift.delete(ID, function(err){
                    if(err) {
                        callback(err);
                    }
                })
            });
        }
    });
};

module.exports = mongoose.model('Task', TaskSchema);