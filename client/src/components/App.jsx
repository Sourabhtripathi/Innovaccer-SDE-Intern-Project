import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import LandingPage from './LandingPage';
import AddVisitor from './AddVisitor';
import Checkout from './Checkout';

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<div style={{ background: '#3d403e', height: '40vh' }}>
					<Switch>
						<Route path="/add_visitor" exact component={AddVisitor} />
						<Route path="/visitor_checkout" exact component={Checkout} />
						<Route path="/" exact component={LandingPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
