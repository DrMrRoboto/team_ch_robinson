var mongoose = require('mongoose');
var Event = require('./events');
var Task = require('./tasks');
var Volunteer = require('./volunteers');
var Shift = require('./shifts');

//schema for Host
var HostSchema = new mongoose.Schema ({
  name: String
});

module.exports = mongoose.model ('Host', HostSchema);