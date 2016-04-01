// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var TermsOfServiceModal = React.createClass({
    handleToggleModal: function(e) {
        this.props.handleToggleModal();
    },
    render: function() {
        var self = this,
            modalClass = 'modal' + (self.props.isModalActive ? ' is-active' : '')
        ;
        return (
            <div className={modalClass}>
                <div className="modal-background"></div>
                    <div className="modal-content">
                    	<div className="box">
    						<div className="content">
    						  TODO
    						</div>
    					</div>
                    </div>
                <button className="modal-close" onClick={self.handleToggleModal}></button>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default TermsOfServiceModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

