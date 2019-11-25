import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react';

import '../stylesheets/Footer.css';

class Footer extends Component {
	state = {
		showLabel: false
	};

	handleOnClick = (path) => {
		this.props.history.push(path);
	};

	render() {
		return (
			<div style={{ position: 'fixed', top: '85vh', right: '5%' }}>
				<div className="fabContainer">
					<Transition visible={this.state.showLabel} animation="scale" duration={500}>
						<div className="fabDropdown" style={{ display: `${this.state.showLabel ? 'block' : 'none'}` }}>
							<ul style={{ listStyle: 'none' }}>
								<li
									style={{ padding: '5px 10px' }}
									onClick={() => {
										this.handleOnClick('/');
									}}
								>
									<span style={{ padding: '5px 10px', cursor: 'pointer', fontWeight: 800 }}>
										Home
									</span>
									<div className="item circular ui icon orange button">
										<i className="icon home" />
									</div>
								</li>
								<li
									style={{ padding: '5px 10px' }}
									onClick={() => {
										this.handleOnClick('/add_visitor');
									}}
								>
									<span style={{ padding: '5px 10px', cursor: 'pointer', fontWeight: 800 }}>
										Check-In
									</span>
									<div className="circular ui icon orange button">
										<i className="retweet icon" />
									</div>
								</li>
								<li
									style={{ padding: '5px 10px' }}
									onClick={() => {
										this.handleOnClick('/visitor_checkout');
									}}
								>
									<span style={{ padding: '5px 10px', cursor: 'pointer', fontWeight: 800 }}>
										Checkout
									</span>
									<div className="circular ui icon orange button">
										<i className="checkered flag icon" />
									</div>
								</li>
							</ul>
						</div>
					</Transition>

					<div className="faButton" id="fab">
						<div
							className="ui circular large blue icon button "
							onClick={() => {
								this.setState({
									showLabel: !this.state.showLabel
								});
							}}
						>
							<i className="icon chevron up" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
