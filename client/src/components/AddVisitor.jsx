import React, { Component } from 'react';
import '../stylesheets/AddVisitor.css';
import { Link } from 'react-router-dom';
import innovaccer from '../apis/innovaccer';
import checkImage from '../images/check.jpg';
import { Header, Button, Image, Modal, Transition } from 'semantic-ui-react';

class AddVisitor extends Component {
	constructor(props) {
		super(props);
		this.modalRef = React.createRef();
	}
	state = {
		visitorName: '',
		visitorPhone: null,
		visitorEmail: '',
		checkin: '',
		hostName: '',
		hostPhone: null,
		hostEmail: '',
		addressVisited: '',
		visitors: [],
		modalOpen: false
	};

	async componentDidMount() {
		const response = await innovaccer.get('/get_visitors');
		this.setState({
			visitors: response.data
		});
	}

	resetState = () => {
		this.setState({
			visitorName: '',
			visitorPhone: '',
			visitorEmail: '',
			checkin: '',
			hostName: '',
			hostPhone: '',
			hostEmail: '',
			addressVisited: '',
			emailError: false,
			modalOpen: false
		});
	};

	handleFormSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		var object = {};

		data.forEach(function(value, key) {
			object[key] = value;
		});

		const result = this.state.visitors.find((obj) => {
			return obj.visitorEmail === object.visitorEmail;
		});

		if (result != undefined) {
			console.log('email already exists');
			this.setState({
				emailError: true
			});
		} else {
			object = { ...object, checkin: Date.now(), addressVisited: 'Innovaccer Headquarters' };
			await innovaccer.post('/visitor/checkin', JSON.stringify(object));
			this.setState({
				modalOpen: true
			});
			// this.resetState();
		}
	};

	handleOnChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;

		this.setState({
			[key]: value
		});
	};

	onModalClose = () => {
		this.resetState();
	};

	render() {
		return (
			<div style={{ textAlign: 'center', marginTop: '7vh' }}>
				<h3 style={{ margin: '0 auto', color: '#ffffff' }}>Add Visitor</h3>
				<div
					className="ui card visitorForm"
					style={{
						textAlign: 'left',
						margin: '10vh auto',
						marginTop: '10px',
						width: '70%',
						maxWidth: '672px',
						padding: '5vh 2%'
					}}
				>
					{/* <Link to="/">Back</Link> */}
					<form class="ui form" onSubmit={this.handleFormSubmit}>
						<h4 class="ui dividing header" style={{ margin: '20px 0' }}>
							Visitor Details
						</h4>
						<div class="field" style={{ width: '95%', margin: '0 auto' }}>
							<div className="two fields">
								<div className="field">
									<label>Name</label>
									<div class="field">
										<input
											type="text"
											name="visitorName"
											onChange={this.handleOnChange}
											value={this.state.visitorName}
											placeholder="Name"
											required
										/>
									</div>
								</div>
								<div className="field">
									<label>Phone</label>
									<div class="field">
										<input
											type="tel"
											name="visitorPhone"
											onChange={this.handleOnChange}
											value={this.state.visitorPhone}
											pattern="[6-9]{1}[0-9]{9}"
											maxLength="10"
											placeholder="Phone (10 digits valid number only)"
											required
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="field" style={{ width: '95%', margin: '0 auto' }}>
							<label>Email</label>
							<input
								type="email"
								name="visitorEmail"
								onChange={this.handleOnChange}
								value={this.state.visitorEmail}
								placeholder="Email"
								required
							/>
							{this.state.emailError ? <div className="ui message">Email Already Exists</div> : null}
						</div>
						<h4 class="ui dividing header" style={{ margin: '20px 0', marginTop: '40px' }}>
							Host Details
						</h4>
						<div class="field" style={{ width: '95%', margin: '0 auto' }}>
							<div className="two fields">
								<div className="field">
									<label>Name</label>
									<div class="field">
										<input
											type="text"
											name="hostName"
											onChange={this.handleOnChange}
											value={this.state.hostName}
											placeholder="Name"
											required
										/>
									</div>
								</div>
								<div className="field">
									<label>Phone</label>
									<div class="field">
										<input
											type="tel"
											name="hostPhone"
											onChange={this.handleOnChange}
											value={this.state.hostPhone}
											pattern="[6-9]{1}[0-9]{9}"
											maxLength="10"
											placeholder="Phone (10 digits valid number only)"
											required
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="field" style={{ width: '95%', margin: '0 auto' }}>
							<label>Email</label>
							<input
								type="email"
								name="hostEmail"
								onChange={this.handleOnChange}
								value={this.state.hostEmail}
								placeholder="Email"
								required
							/>
						</div>
						<button
							class="ui button red"
							style={{ margin: '20px auto', marginLeft: '40%', marginBottom: 0 }}
							type="submit"
						>
							Submit
						</button>
					</form>
					{/* <Modal open={true} onClose={this.onModalClose} > */}
					<Transition visible={this.state.modalOpen} animation="scale" duration={500}>
						<Modal open={this.state.modalOpen} onClose={this.onModalClose} style={{ width: '40%' }}>
							<Modal.Content>
								<Image size="medium" src={checkImage} style={{ margin: '0 auto' }} />
								<Modal.Description style={{ textAlign: 'center' }}>
									<Header style={{ margin: '0' }}>Your Entry Has Been Recorded.</Header>
									<button
										onClick={this.onModalClose}
										className="ui button blue"
										style={{ marginTop: '20px' }}
									>
										Okay
									</button>
								</Modal.Description>
							</Modal.Content>
						</Modal>
					</Transition>
				</div>
				<Link to="/visitor_checkout">Checkout</Link>
			</div>
		);
	}
}

export default AddVisitor;