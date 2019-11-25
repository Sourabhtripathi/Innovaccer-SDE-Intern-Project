import React, { Component } from 'react';
import '../stylesheets/LandingPage.css';

class LandingPage extends Component {
	render() {
		return (
			<div class="pusher">
				<div class="ui inverted vertical masthead center aligned segment">
					<div class="ui grid">
						<div class="row" style={{ height: '100vh' }}>
							<div class="sixteen wide column">
								<div class="ui text container">
									<h1 class="ui inverted header" style={{ textAlign: 'center' }}>
										Innovaccer
									</h1>
									<h2 style={{ textAlign: 'center' }}>Make a visit to your host at Innovaccer</h2>
									<div
										class="ui blue inverted animated button"
										style={{ margin: '10px' }}
										tabindex="0"
										onClick={() => {
											this.props.history.push('/add_visitor');
										}}
									>
										<div class="visible content">Enter</div>
										<div class="hidden content">
											<i class="right check icon" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LandingPage;
