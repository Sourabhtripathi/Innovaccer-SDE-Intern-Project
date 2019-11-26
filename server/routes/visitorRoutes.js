const express = require('express'),
	app = express(),
	Visitor = require('../models/visitor'),
	mail = require('node-mailjet'),
	nexmo = require('../modules/nexmo');

const mailjet = mail.connect(process.env.mailJetId, process.env.mailJetToken);

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
	nexmo(
		`91${hostPhone}`,
		`You have a visitor\nVisitor Details :\nName : ${visitorName}\nPhone : ${visitorPhone}\nEmail : ${visitorEmail}`
	);
});

app.put('/visitor/checkout', (req, res) => {
	const data = JSON.parse(Object.keys(req.body)[0]);
	Visitor.find({ visitorEmail: data, checkout: null }, function(err, foundVisitor) {
		if (err) {
			res.send('Error');
		} else {
			if (foundVisitor.length > 0) {
				if (foundVisitor[0].checkout === null) {
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

module.exports = app;
