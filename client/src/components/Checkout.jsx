import React, { Component } from 'react';
import '../stylesheets/Checkout.css';
import { Link } from 'react-router-dom';
import innovaccer from '../apis/innovaccer';

class Checkout extends Component {
	state = {
		visitorEmail: ''
	};

	resetState = () => {
		this.setState({
			visitorEmail: ''
		});
	};

	onFormSubmit = async (event) => {
		event.preventDefault();
		const response = await innovaccer.put(`/visitor/checkout`, JSON.stringify(this.state.visitorEmail));
		console.log(response.data);
		if (response.data !== 'Visitor Not Found') {
			this.props.history.push('/');
		} else {
			this.resetState();
		}
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
				<h3>Checkout</h3>
				<form onSubmit={this.onFormSubmit}>
					<label>
						Confirm Your Email
						<input
							type="email"
							name="visitorEmail"
							onChange={this.handleOnChange}
							value={this.state.visitorEmail}
							required
						/>
					</label>
					<button>Checkout</button>
				</form>
			</div>
		);
	}
}

export default Checkout;
