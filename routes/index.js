const express = require('express'),
	app = express(),
	Visitor = require('../models/visitor');

// Landing Route
app.get('/', (req, res) => {
	res.send('Server is running');
});

app.post('/visitor/checkin', (req, res) => {
	res.send('Post Route');
	Visitor.create(req.body.visitor, (err, visitor) => {
		if (err) {
			console.log(err);
		} else {
			console.log(visitor);
		}
	});
});
app.post('/visitor/checkout', (req, res) => {});

module.exports = app;
