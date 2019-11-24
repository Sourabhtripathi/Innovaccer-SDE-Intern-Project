const express = require('express'),
	mongoose = require('mongoose'),
	app = express(),
	routes = require('./routes/index'),
	Visitor = require('./models/visitor'),
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
	const { visitorName, visitorPhone, visitorEmail, checkin, hostName, hostPhone, hostEmail, addressVisited } = data;
	Visitor.create(
		{
			visitorName,
			visitorPhone,
			visitorEmail,
			checkin,
			checkout: '',
			hostName,
			hostPhone,
			hostEmail,
			addressVisited
		},
		(err, visitor) => {
			if (err) {
				console.log(err);
			} else {
				console.log(visitor);
			}
		}
	);
	let request = mailjet.post('send', { version: 'v3.1' }).request({
		Messages: [
			{
				From: {
					Email: 'sourabhtripathi48@gmail.com',
					Name: 'Sourabh'
				},
				To: [
					{
						Email: hostEmail,
						Name: hostName
					}
				],
				Subject: 'Greetings from Sourabh.',
				TextPart: `You have a visitor\nVisitor Details :\nName : ${visitorName}\nPhone : ${visitorPhone}\nEmail : ${visitorEmail}`
				// HTMLPart:
				// 	"<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
				// CustomID: 'AppGettingStartedTest'
			}
		]
	});
	request
		.then((result) => {
			console.log(result.body);
		})
		.catch((err) => {
			console.log(err.statusCode);
		});
});

app.put('/visitor/checkout', (req, res) => {
	const data = JSON.parse(Object.keys(req.body)[0]);
	Visitor.find({ visitorEmail: data }, function(err, foundVisitor) {
		if (err) {
			res.send('Error');
		} else {
			if (foundVisitor.length > 0) {
				if (foundVisitor[0].checkout === '') {
					foundVisitor[0].checkout = Date.now();
					foundVisitor[0].save();
					let request = mailjet.post('send', { version: 'v3.1' }).request({
						Messages: [
							{
								From: {
									Email: 'sourabhtripathi48@gmail.com',
									Name: 'Sourabh'
								},
								To: [
									{
										Email: foundVisitor[0].visitorEmail,
										Name: foundVisitor[0].visitorName
									}
								],
								Subject: 'Greetings from Sourabh.',
								TextPart: `Here are the visit details :\nName : ${foundVisitor[0]
									.visitorName}\nPhone : ${foundVisitor[0]
									.visitorPhone}\nCheck-in Time : ${foundVisitor[0]
									.checkin}\nCheck-in Time : ${foundVisitor[0]
									.checkout}\nHost name : ${foundVisitor[0]
									.hostName}\nAddress Visited : ${foundVisitor[0].addressVisited}`
								// HTMLPart:
								// 	"<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
								// CustomID: 'AppGettingStartedTest'
							}
						]
					});
					request
						.then((result) => {
							console.log(result.body);
						})
						.catch((err) => {
							console.log(err.statusCode);
						});
					res.send('Visitor Found');
				} else {
					res.send('Visitor already checked out');
				}
			} else {
				res.send('Visitor Not Found');
			}
		}
	});
});

app.listen(3001, () => {
	console.log('Server Started');
});
