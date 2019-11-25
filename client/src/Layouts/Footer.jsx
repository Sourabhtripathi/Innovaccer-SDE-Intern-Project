import React, { Component, Fragment } from 'react';
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
			<Fragment style={{ position: 'fixed', top: '85vh', right: '5%' }}>
				<div class="fabContainer">
					<Transition visible={this.state.showLabel} animation="scale" duration={500}>
						<div class="fabDropdown" style={{ display: `${this.state.showLabel ? 'block' : 'none'}` }}>
							<ul style={{ listStyle: 'none' }}>
								<li
									style={{ padding: '5px 10px' }}
									onClick={() => {
										this.handleOnClick('/');
									}}
								>
									<span style={{ padding: '5px 10px', cursor: 'pointer' }}>Home</span>
									<div class="item circular ui icon orange button">
										<i class="icon home" />
									</div>
								</li>
								<li
									style={{ padding: '5px 10px' }}
									onClick={() => {
										this.handleOnClick('/add_visitor');
									}}
								>
									<span style={{ padding: '5px 10px', cursor: 'pointer' }}>Check-In</span>
									<div class="circular ui icon orange button">
										<i class="retweet icon" />
									</div>
								</li>
								<li
									style={{ padding: '5px 10px' }}
									onClick={() => {
										this.handleOnClick('/visitor_checkout');
									}}
								>
									<span style={{ padding: '5px 10px', cursor: 'pointer' }}>Checkout</span>
									<div class="circular ui icon orange button">
										<i class="checkered flag icon" />
									</div>
								</li>
							</ul>
						</div>
					</Transition>

					<div class="faButton" id="fab">
						<div
							class="ui circular large blue icon button "
							onClick={() => {
								this.setState({
									showLabel: !this.state.showLabel
								});
							}}
						>
							<i class="icon chevron up" />
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Footer;
