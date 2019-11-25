import React, { Component } from 'react';
import '../stylesheets/ModalComponent.css';
import checkImage from '../images/check.jpg';
import { Header, Image, Modal, Transition } from 'semantic-ui-react';

class ModalComponent extends Component {
	render() {
		return (
			<Transition visible={this.props.open} animation="scale" duration={500}>
				<Modal open={this.props.open} onClose={this.props.onModalClose} style={{ width: '40%' }}>
					<Modal.Content>
						<Image size="medium" src={checkImage} style={{ margin: '0 auto' }} />
						<Modal.Description style={{ textAlign: 'center' }}>
							<Header style={{ margin: '0' }}>{this.props.description}</Header>
							<button
								onClick={this.props.onModalClose}
								className="ui button blue"
								style={{ marginTop: '20px' }}
							>
								Okay
							</button>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			</Transition>
		);
	}
}

export default ModalComponent;
