const mongoose = require('mongoose');

visitorsSchema = new mongoose.Schema({
	visitorName: String,
	visitorPhone: Number,
	visitorEmail: String,
	checkin: Date,
	checkout: Date,
	hostName: String,
	hostPhone: Number,
	hostEmail: String,
	addressVisited: String
});

module.exports = mongoose.model('Visitor', visitorsSchema);
