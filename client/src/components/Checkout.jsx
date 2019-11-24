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
			<div style={{ textAlign: 'center', marginTop: '7vh' }}>
				<h3 style={{ margin: '0 auto', color: '#ffffff' }}>Checkout</h3>
				<div
					className="ui card visitorForm"
					style={{
						margin: '10vh auto',
						marginTop: '10px',
						width: '70%',
						maxWidth: '672px',
						padding: '5vh 2%'
					}}
				>
					<form class="ui form" onSubmit={this.onFormSubmit}>
						<h4 class="ui dividing header" style={{ margin: '20px auto', textAlign: 'center' }}>
							Confirm Your Email
						</h4>
						<div class="field" style={{ width: '95%', margin: '0 auto' }}>
							<div className="field">
								<input
									type="email"
									name="visitorEmail"
									onChange={this.handleOnChange}
									value={this.state.visitorEmail}
									placeholder="Enter your Email"
									required
								/>
							</div>
						</div>
						<button class="ui button red" style={{ margin: '20px auto', marginBottom: 0 }} type="submit">
							Submit
						</button>
					</form>
				</div>

				<Link to="/add_visitor">Add Visitor</Link>
			</div>
		);
	}
}

export default Checkout;
