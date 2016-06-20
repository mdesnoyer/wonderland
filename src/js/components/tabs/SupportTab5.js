// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import ModalParent from '../core/ModalParent';
import EmailModal from '../modals/EmailModal';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportTab5 = React.createClass({
	getInitialState: function() {
	    var self = this;
	    return {
	        activeModal: false
	    }
	},
    render: function() {
        var self = this;
        return (
            <section className="content">
                <h2 className="title is-3">Contact Support</h2>
                <a className="button is-large" data-target="contact-modal" onClick={self.openModal}>{T.get('nav.contact')}</a>,
            	<ModalParent isModalActive={self.state.activeModal === 'contact-modal'} handleToggleModal={self.closeModal}>
            	    <EmailModal type="support" />
            	</ModalParent>
            </section>
        );
    },
    openModal: function (e) {
        var self = this;
        self.setState({
            activeModal: e.target.dataset.target
        });
    },
    closeModal: function () {
        var self = this;
        self.setState({
            activeModal: false
        });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportTab5;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
