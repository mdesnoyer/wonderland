// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ModalParent = React.createClass({
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
            modalClass = self.props.isModalActive ? ' is-active' : '',
            modalContentClass = self.props.isModalContentClipped ? ' is-clipped' : ''
        ;
        return (
            <div className={'wonderland-modal modal' + modalClass}>
                <div className="wonderland-modal-background modal-background" onClick={self.handleToggleModal}></div>
                <div className={'wonderland-modal-content modal-content' + modalContentClass}>
                    {self.props.children}
                </div>
                <button className="wonderland-modal-close modal-close" onClick={self.handleToggleModal}></button>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ModalParent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
