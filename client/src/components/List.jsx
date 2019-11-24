import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/List.css';
import innovaccer from '../apis/innovaccer';

class List extends Component {
	handleOnCheckoutClick = async (index) => {
		const data = { ...this.props.entries[index], checkout: Date.now() };
		await innovaccer.put(`/visitor/checkout/${this.props.entries[index]._id}`, JSON.stringify(data));
		this.props.handler();
	};
	render() {
		return (
			<ul>
				{this.props.entries.map((data, index) => {
					return (
						<li key={index}>
							<h4>
								{data.name}
								{this.props.buttonType === 'Checkout' ? (
									<div>
										{data.checkout === null ? (
											<button onClick={() => this.handleOnCheckoutClick(index)}>
												{this.props.buttonType}
											</button>
										) : (
											<h4>Checked Out</h4>
										)}
									</div>
								) : (
									<Link
										to={{
											pathname: '/add_visitor',
											state: {
												hostName: data.name,
												hostAddress: data.address
											}
										}}
									>
										<button>{this.props.buttonType}</button>
									</Link>
								)}
							</h4>
						</li>
					);
				})}
			</ul>
		);
	}
}

export default List;
