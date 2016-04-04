// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ModalWrapper = React.createClass({
	handleToggleModal: function() {
        var self = this;
	    self.props.handleToggleModal();
	},
	render: function() {
		var self = this,
            modalClass = 'modal' + (self.props.isModalActive ? ' is-active' : '')
        ;
        return (
        	<div className={modalClass}>
        		<div className="modal-background"></div>
        		<div className="wonderland-modal-content modal-content">
        			{self.props.children}
    			</div>
				<button className="modal-close" onClick={self.handleToggleModal}></button>
    		</div>
    	);
	}
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ModalWrapper;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
