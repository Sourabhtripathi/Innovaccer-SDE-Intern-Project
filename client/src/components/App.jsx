import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import AddVisitor from './AddVisitor';
import Checkout from './Checkout';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<div>
					<Header />
					<Switch>
						<Route path="/add_visitor" exact component={AddVisitor} />
						<Route path="/visitor_checkout" exact component={Checkout} />
						<Route path="/" exact render={() => <Redirect to="/add_visitor" />} />
					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
