import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Home.css';
import List from './List';
import innovaccer from '../apis/innovaccer';

class Home extends Component {
	state = {
		visitors: [],
		hosts: []
	};

	async componentDidMount() {
		let visitorsResponse = await innovaccer.get('/get_visitors');
		this.setState({
			visitors: visitorsResponse.data
		});

		let hostsResponse = await innovaccer.get('/get_hosts');
		this.setState({
			hosts: hostsResponse.data
		});
	}

	handler = () => {
		this.componentDidMount();
	};

	render() {
		if (!this.state.visitors || !this.state.hosts) {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
					<h3>Home</h3>
					<div>
						<h3>Visitors :</h3>
						<List entries={this.state.visitors} buttonType="Checkout" handler={this.handler} />
					</div>
					<div>
						<h3>Hosts :</h3>
						<List entries={this.state.hosts} buttonType="Visit Host" linkDest="/add_visitor" />
					</div>
					<Link to="/add_host">Add Host</Link>
				</div>
			);
		}
	}
}

export default Home;
