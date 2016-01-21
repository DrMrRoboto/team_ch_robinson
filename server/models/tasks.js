/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Events = require('./events');
var Shifts = require('./shifts');
var Volunteers = require('./volunteers');

//creates a schema to standardize Task creation

var TaskSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    description: {type: String, required: true},
    event_id: {type: String, required: true}
});

// Deletes Tasks and all associated Items

TaskSchema.statics.delete = function(id, callback){
    this.findById(id, function(err, result){
        if (err) {
            callback(err);
        } else if (result != undefined){
            result.remove(callback);
        }
    });
    Shifts.remove({task_id: id}, function(err){
        if(err) {
            callback(err);
        } else if (!err); {
            callback()
        }
    })
};

module.exports = mongoose.model('Task', TaskSchema);