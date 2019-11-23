import React, { Component } from 'react';
import '../stylesheets/AddHost.css';
import { Link } from 'react-router-dom';
import innovaccer from '../apis/innovaccer';

class AddHost extends Component {
	state = {
		name: '',
		phone: null,
		email: '',
		address: ''
	};

	handleFormSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		var object = {};

		data.forEach(function(value, key) {
			object[key] = value;
		});

		const response = await innovaccer.post('/host/add', JSON.stringify(object));
	};

	render() {
		return (
			<div>
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
					<label>
						Address :
						<input type="text" name="address" required />
					</label>
					<button>Submit</button>
				</form>
			</div>
		);
	}
}

export default AddHost;
