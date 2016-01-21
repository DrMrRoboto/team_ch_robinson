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
//
//EventSchema.statics.delete = function(id, callback){
//    //Deletes the Event using the Event id
//    this.findById(id, function(err, data){
//        if(err) {
//            callback(err);
//        } else if (result != undefined){
//
//        }
//    })
//}

module.exports = mongoose.model('Event', EventSchema);