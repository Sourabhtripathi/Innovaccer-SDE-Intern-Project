const express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	routes = require('./routes/index'),
	Visitor = require('./models/visitor'),
	cors = require('cors'),
	bodyParser = require('body-parser');

// MongoDB Configure
const url = process.env.DATABASEURL || 'mongodb://localhost/innovaccer';
mongoose.connect(url, { useNewUrlParser: true });

// App Config
// app.use('/', routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false
	})
);

app.get('/', (req, res) => {
	res.send('Server is running');
});

app.post('/visitor/checkin', (req, res) => {
	console.log('Post Route');
	res.send(req.body);
	const data = JSON.parse(Object.keys(req.body)[0]);
	Visitor.create(
		{
			name: data.name,
			phone: data.phone,
			email: data.email,
			checkin: data.checkin
		},
		(err, visitor) => {
			if (err) {
				console.log(err);
			} else {
				console.log(visitor);
			}
		}
	);
});

app.listen(3001, () => {
	console.log('Server Started');
});
