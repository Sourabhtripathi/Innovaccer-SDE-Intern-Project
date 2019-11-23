import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Home.css';

class Home extends Component {
	render() {
		return (
			<div>
				<h3>Home</h3>
				<Link to="/add_visitor">Add Visitor</Link>
			</div>
		);
	}
}

export default Home;
