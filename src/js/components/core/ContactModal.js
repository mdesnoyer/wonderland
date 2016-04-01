// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ContactModal = React.createClass({
    handleToggleModal: function(e) {
        this.props.toggleModal();
    },
    render() {
        var self = this,
            modalClass = 'modal' + (self.props.isModalActive ? ' is-active' : '')
        ;
        return (
            <div className={modalClass}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        TODO
                    </div>
                </div>
                <button className="modal-close" onClick={self.handleToggleModal}></button>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ContactModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
