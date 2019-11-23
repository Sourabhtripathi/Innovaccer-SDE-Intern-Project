const express = require('express'),
	mongoose = require('mongoose'),
	app = express();

app.get('/', (req, res) => {
	res.send('Server is running');
});

app.listen(3001, () => {
	console.log('Server Started');
});
