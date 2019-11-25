import React, { Component, Fragment } from 'react';
import { Transition } from 'semantic-ui-react';

import '../stylesheets/Footer.css';

class Footer extends Component {
	state = {
		showLabel: false
	};

	handleOnClick = () => {
		this.props.history.push('/');
	};

	render() {
		return (
			<Fragment style={{ position: 'fixed', top: '85vh', right: '5%' }}>
				<div class="fabContainer">
					<Transition visible={this.state.showLabel} animation="scale" duration={500}>
						<div class="fabDropdown" style={{ display: `${this.state.showLabel ? 'block' : 'none'}` }}>
							<ul style={{ listStyle: 'none' }}>
								<li style={{ padding: '5px 10px' }}>
									<span
										style={{ padding: '5px 10px', cursor: 'pointer' }}
										onClick={() => {
											this.handleOnClick();
										}}
									>
										Home
									</span>
									<div class="item circular ui icon orange button">
										<i class="icon home" />
									</div>
								</li>
								<li style={{ padding: '5px 10px' }}>
									<span
										style={{ padding: '5px 10px', cursor: 'pointer' }}
										onClick={() => {
											this.handleOnClick();
										}}
									>
										Check-In
									</span>
									<div class="circular ui icon orange button">
										<i class="retweet icon" />
									</div>
								</li>
								<li style={{ padding: '5px 10px' }}>
									<span
										style={{ padding: '5px 10px', cursor: 'pointer' }}
										onClick={() => {
											this.handleOnClick();
										}}
									>
										Checkout
									</span>
									<div class="circular ui icon orange button">
										<i class="checkered flag icon" />
									</div>
								</li>
							</ul>
						</div>
					</Transition>

					<div class="faButton" id="fab">
						{/* <button
							onClick={() => {
								this.setState({
									showLabel: !this.state.showLabel
								});
							}}
							class="ui circular chevron up icon large blue dropdown button"
							style={{ position: 'fixed', top: '85vh', right: '5%' }}
						>
							<i class="icon chevron up" />
						</button> */}
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
