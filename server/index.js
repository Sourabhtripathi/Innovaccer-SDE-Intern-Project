const express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	visitorRoutes = require('./routes/visitorRoutes'),
	cors = require('cors'),
	bodyParser = require('body-parser');
require('dotenv').config();

// MongoDB Configure
const url = process.env.DATABASEURL;
const port = process.env.PORT;
mongoose.connect(url, {
	useNewUrlParser: true
});

// App Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false
	})
);
app.use(visitorRoutes);

app.listen(port, () => {
	console.log('Server Started');
});
