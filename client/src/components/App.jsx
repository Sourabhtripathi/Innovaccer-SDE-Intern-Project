import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Home from './Home';
import AddVisitor from './AddVisitor';
import AddHost from './AddHost';
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
						<Route path="/add_host" exact component={AddHost} />
						<Route path="/" exact component={Home} />
						<Home />
					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
