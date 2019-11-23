const mongoose = require('mongoose');

visitorsSchema = new mongoose.Schema({
	name: String,
	phone: Number,
	email: String,
	checkin: Date,
	checkout: Date,
	hostName: String,
	addressVisited: String
});

module.exports = mongoose.model('Visitor', visitorsSchema);
