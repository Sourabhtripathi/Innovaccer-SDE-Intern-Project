const express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	routes = require('./routes/index'),
	Visitor = require('./models/visitor'),
	Host = require('./models/host'),
	cors = require('cors'),
	bodyParser = require('body-parser');

const mailjet = require('node-mailjet').connect('aab1a722b8bdb2869e26d6d7dd7d1018', 'dc02c5006fb42809e1fe4fd4a63722b9');

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
	const { name, phone, email, checkin, hostName, hostAddress } = data;
	Visitor.create(
		{
			name,
			phone,
			email,
			checkin,
			checkout: '',
			hostName,
			hostAddress
		},
		(err, visitor) => {
			if (err) {
				console.log(err);
			} else {
				console.log(visitor);
			}
		}
	);
	// const request = mailjet.post('send', { version: 'v3.1' }).request({
	// 	Messages: [
	// 		{
	// 			From: {
	// 				Email: 'sourabhtripathi48@gmail.com',
	// 				Name: 'Sourabh'
	// 			},
	// 			To: [
	// 				{
	// 					Email: 'wastea33@gmail.com',
	// 					Name: 'Akshat'
	// 				}
	// 			],
	// 			Subject: 'Greetings from Sourabh.',
	// 			TextPart: 'My first Mailjet email',
	// 			HTMLPart:
	// 				"<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
	// 			CustomID: 'AppGettingStartedTest'
	// 		}
	// 	]
	// });
	// request
	// 	.then((result) => {
	// 		console.log(result.body);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err.statusCode);
	// 	});
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
