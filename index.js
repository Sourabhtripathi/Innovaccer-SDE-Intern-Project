const express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	routes = require('./routes/index'),
	Visitor = require('./models/visitor'),
	Host = require('./models/host'),
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

app.get('/get_visitors', (req, res) => {
	Visitor.find({}, (err, visitors) => {
		if (err) {
			console.log(err);
		} else {
			res.send(visitors);
		}
	});
});

app.post('/visitor/checkin', (req, res) => {
	console.log('Visitor Post Route');
	res.send(req.body);
	const data = JSON.parse(Object.keys(req.body)[0]);
	Visitor.create(
		{
			name: data.name,
			phone: data.phone,
			email: data.email,
			checkin: data.checkin,
			checkout: ''
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

app.put('/visitor/checkout/:visitorId', (req, res) => {
	const data = JSON.parse(Object.keys(req.body)[0]);
	console.log(data);
	res.send(data);
	Visitor.findByIdAndUpdate(
		req.params.visitorId,
		{
			name: data.name,
			phone: data.phone,
			email: data.email,
			checkin: data.checkin,
			checkout: data.checkout
		},
		function(err, updatedVisitor) {
			if (err) {
				console.log(err);
			} else {
				console.log(updatedVisitor);
			}
		}
	);
});

app.get('/get_hosts', (req, res) => {
	Host.find({}, (err, hosts) => {
		if (err) {
			console.log(err);
		} else {
			res.send(hosts);
		}
	});
});

app.post('/host/add', (req, res) => {
	console.log('Host Post Route');
	res.send(req.body);
	const data = JSON.parse(Object.keys(req.body)[0]);
	Host.create(
		{
			name: data.name,
			phone: data.phone,
			email: data.email,
			address: data.address
		},
		(err, host) => {
			if (err) {
				console.log(err);
			} else {
				console.log(host);
			}
		}
	);
});

app.listen(3001, () => {
	console.log('Server Started');
});
