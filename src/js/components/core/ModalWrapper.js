// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ModalWrapper = React.createClass({
    handleToggleModal: function(e) {
        var self = this;
        self.props.handleToggleModal();
    },
    handleEscKey:function(e) {
        var self = this;
        if (e.keyCode === 27) {
            e.preventDefault();
            self.handleToggleModal(e);
        }
    },
    componentWillMount:function(){
        document.addEventListener("keydown", this.handleEscKey, false);
    },
    componentWillUnmount: function() {
        document.removeEventListener("keydown", this.handleEscKey, false);
    },
    render: function() {
        var self = this,
            modalClass = 'modal' + (self.props.isModalActive ? ' is-active' : '')
        ;
        return (
            <div className={modalClass}>
                <div className="modal-background" onClick={self.handleToggleModal}></div>
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
