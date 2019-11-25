import React, { Component } from 'react';
import '../stylesheets/Checkout.css';
import innovaccer from '../apis/innovaccer';
import Modal from './Modal';
import Footer from '../Layouts/Footer';

class Checkout extends Component {
	state = {
		visitorEmail: '',
		modalOpen: false,
		error: false,
		errorDesc: ''
	};

	resetState = () => {
		this.setState({
			visitorEmail: '',
			modalOpen: false,
			error: false,
			errorDesc: ''
		});
	};

	onModalClose = () => {
		this.resetState();
		this.props.history.push('/add_visitor');
	};

	onFormSubmit = async (event) => {
		event.preventDefault();
		const response = await innovaccer.put(`/visitor/checkout`, JSON.stringify(this.state.visitorEmail));
		console.log(response.data);
		if (response.data === 'Visitor Found') {
			this.setState({
				modalOpen: true
			});
		} else {
			this.setState({
				error: true,
				errorDesc: response.data
			});
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
			<div style={{ textAlign: 'center' }}>
				<h3
					style={{
						padding: '20px',
						paddingTop: '5%',
						margin: '0 auto',
						color: '#ffffff',
						fontSize: '25px',
						fontWeight: '500',
						fontFamily: "'Varela Round', sans-serif"
					}}
				>
					Checkout
				</h3>
				<div className="ui card " id="checkout">
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
								{this.state.error ? (
									<div className="ui pointing red basic label">{this.state.errorDesc}</div>
								) : null}
							</div>
						</div>
						<button class="ui button red" style={{ margin: '20px auto', marginBottom: 0 }} type="submit">
							Submit
						</button>
					</form>
					<Modal
						open={this.state.modalOpen}
						description="Your have been checked out"
						onModalClose={this.onModalClose}
					/>
				</div>
				<Footer history={this.props.history} />
			</div>
		);
	}
}

export default Checkout;
