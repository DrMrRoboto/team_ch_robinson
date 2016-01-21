/**
 * Created by Totep on 1/21/16.
 */
var mongoose = require('mongoose');
var Tasks = require('tasks');
var Shifts = require('shifts');
var Volunteers = require('volunteers');

//creates a schema to standardize Event creation

var EventSchema = new mongoose.Schema ({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    //need to figure out time schema.
    startTime: Number,
    endTime: Number,
    host: String
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