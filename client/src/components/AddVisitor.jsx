import React, { Component } from 'react';
import '../stylesheets/AddVisitor.css';
import { Link } from 'react-router-dom';
import innovaccer from '../apis/innovaccer';

class AddVisitor extends Component {
	state = {
		name: '',
		phone: null,
		email: ''
	};

	handleFormSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		var object = {};

		data.forEach(function(value, key) {
			object[key] = value;
		});

		const { hostName, hostAddress } = this.props.location.state;

		object = { ...object, checkin: Date.now(), hostName: hostName, hostAddress: hostAddress };
		await innovaccer.post('/visitor/checkin', JSON.stringify(object));
		this.props.history.push('/');
	};

	render() {
		return (
			<div>
				<h3>Add Visitor</h3>
				<Link to="/">Back</Link>
				<form onSubmit={this.handleFormSubmit}>
					<label>
						Name :
						<input type="text" name="name" required />
					</label>
					<label>
						Phone : +91
						<input type="tel" name="phone" pattern="[6-9]{1}[0-9]{9}" maxLength="10" required />
					</label>
					<label>
						Email :
						<input type="email" name="email" required />
					</label>
					<button>Submit</button>
				</form>
			</div>
		);
	}
}

export default AddVisitor;
