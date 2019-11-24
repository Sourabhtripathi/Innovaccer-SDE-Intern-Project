import React, { Component } from 'react';
import '../stylesheets/AddVisitor.css';
import { Link } from 'react-router-dom';
import innovaccer from '../apis/innovaccer';

class AddVisitor extends Component {
	state = {
		visitorName: '',
		visitorPhone: null,
		visitorEmail: '',
		checkin: '',
		hostName: '',
		hostPhone: null,
		hostEmail: '',
		addressVisited: ''
	};

	resetState = () => {
		this.setState({
			visitorName: '',
			visitorPhone: '',
			visitorEmail: '',
			checkin: '',
			hostName: '',
			hostPhone: '',
			hostEmail: '',
			addressVisited: ''
		});
	};

	handleFormSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		var object = {};

		data.forEach(function(value, key) {
			object[key] = value;
		});

		object = { ...object, checkin: Date.now(), addressVisited: 'Innovaccer Headquarters' };
		await innovaccer.post('/visitor/checkin', JSON.stringify(object));
		this.resetState();
	};

	handleOnChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;

		this.setState({
			[key]: value
		});
	};

	render() {
		return (
			<div>
				<h3>Add Visitor</h3>
				<Link to="/">Back</Link>
				<form onSubmit={this.handleFormSubmit}>
					<div>
						<h4>Visitor Details</h4>
						<label>
							Name :
							<input
								type="text"
								name="visitorName"
								onChange={this.handleOnChange}
								value={this.state.visitorName}
								required
							/>
						</label>
						<label>
							Phone : +91
							<input
								type="tel"
								name="visitorPhone"
								onChange={this.handleOnChange}
								value={this.state.visitorPhone}
								pattern="[6-9]{1}[0-9]{9}"
								maxLength="10"
								required
							/>
						</label>
						<label>
							Email :
							<input
								type="email"
								name="visitorEmail"
								onChange={this.handleOnChange}
								value={this.state.visitorEmail}
								required
							/>
						</label>
					</div>
					<div>
						<h4>Host Details</h4>
						<label>
							Name :
							<input
								type="text"
								name="hostName"
								onChange={this.handleOnChange}
								value={this.state.hostName}
								required
							/>
						</label>
						<label>
							Phone : +91
							<input
								type="tel"
								name="hostPhone"
								onChange={this.handleOnChange}
								value={this.state.hostPhone}
								pattern="[6-9]{1}[0-9]{9}"
								maxLength="10"
								required
							/>
						</label>
						<label>
							Email :
							<input
								type="email"
								name="hostEmail"
								onChange={this.handleOnChange}
								value={this.state.hostEmail}
								required
							/>
						</label>
					</div>
					<button>Submit</button>
				</form>

				<Link to="/visitor_checkout">Checkout</Link>
			</div>
		);
	}
}

export default AddVisitor;
