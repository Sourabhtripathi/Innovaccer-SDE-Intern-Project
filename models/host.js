const mongoose = require('mongoose');

hostsSchema = new mongoose.Schema({
	name: String,
	phone: Number,
	email: String,
	address: String
});

module.exports = mongoose.model('Host', hostsSchema);
