import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Home.css';
import innovaccer from '../apis/innovaccer';

class Home extends Component {
	state = {
		data: []
	};
	async componentDidMount() {
		let response = await innovaccer.get('/get_visitors');
		this.setState({
			data: response.data
		});
		console.log(this.data);
	}

	render() {
		if (!this.state.data) {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
					<h3>Home</h3>
					<h3>Visitors :</h3>
					<ul>
						{this.state.data.map((visitor) => {
							return <li>{visitor.name}</li>;
						})}
					</ul>
					<Link to="/add_visitor">Add Visitor</Link>
					<Link to="/add_host">Add Host</Link>
				</div>
			);
		}
	}
}

export default Home;
