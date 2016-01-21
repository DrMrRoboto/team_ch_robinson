/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Tasks = require('tasks');
var Shifts = require('shifts');
var Volunteers = require('volunteers');

//creates a schema to standardize Event creation

var EventSchema = new mongoose.Schema ({
    name: {String, required: true},
    description: {String, required: true},
    startDate: {Date, required: true},
    endDate: {Date, required: true},
    startTime: {Number, required: true},
    endTime: {Number, required: true},
    host: {String, required: true}
});

//Deletes Event and all associated Categories and Items

EventSchema.statics.delete = function(id, callback){
    //Deletes the Event using the Event id
    this.findById(id, function(err, data){
        if(err) {
            callback(err);
        } else if (result != undefined){
            result.remove(callback);
        }
    });
    //Deletes all associated Tasks, Shifts, and Volunteers by using Category.delete method
    Task.find({eventID: id}, function(err, data){
        if(err) {
            callback(err);
        } else if (data) {
            data.forEach(function(record){
                console.log(record._id);
                var ID = record._id;
                Task.delete(ID, function(err){
                    if(err) {
                        callback(err);
                    }
                })
            });
        }
    });
};

module.exports = mongoose.model('Event', EventSchema);