// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ModalParent = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        isModalActive: React.PropTypes.bool.isRequired,
        isModalContentClipped: React.PropTypes.bool.isRequired,
        handleToggleModal: React.PropTypes.func.isRequired,
        isModalContentMax: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            isModalContentMax: false
        }
    },
    handleToggleModal: function(e) {
        var self = this;
        self.props.handleToggleModal();
    },
    componentWillMount:function() {
        var self = this;
        document.addEventListener('keydown', self.handleEscKey, false);
    },
    componentWillUnmount: function() {
        var self = this;
        document.removeEventListener('keydown', self.handleEscKey, false);
    },
    render: function() {
        var self = this,
            modalClass = self.props.isModalActive ? ' is-active' : '',
            modalContentClass = (self.props.isModalContentClipped ? ' is-clipped' : '') + (self.props.isModalContentMax ? ' is-max' : '')
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
    },
    handleEscKey:function(e) {
        var self = this;
        if (e.keyCode === 27 && self.props.isModalActive) { // 27 = Escape
            e.preventDefault();
            self.handleToggleModal(e);
        }
    },
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ModalParent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
