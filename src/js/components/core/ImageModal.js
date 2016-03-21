// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ImageModal = React.createClass({
	getInitialState: function () {
		return {
			src: this.props.src
			// src: '/img/tortoise.jpg'
		};
	},
	handleToggleModal: function(e) {
		this.props.toggleModal();
	},
	render() {
		var self = this,
			modalClass = 'modal' + (this.props.isModalActive ? ' is-active' : ''),
			caption = 'TODO'
		;
		return (
			<div className={modalClass}>
				<div className="modal-background"></div>
				<div className="modal-content">
					<figure
						className="wonderland-thumbnail"
					>
						<img className="wonderland-thumbnail__image" src={this.state.src} alt={caption} title={caption} />
					</figure>
				</div>
				<button className="modal-close" onClick={self.handleToggleModal}></button>
			</div>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ImageModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
