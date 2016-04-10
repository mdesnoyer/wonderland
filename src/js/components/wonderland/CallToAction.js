// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import ModalWrapper from '../core/ModalWrapper';
import ContactModal from '../core/ContactModal';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var CallToAction = React.createClass({
     getInitialState: function () {
         return {
             isModalActive: false
         };
     },
    handleToggleModal: function() {
        var self = this;
        self.setState({
            isModalActive: !self.state.isModalActive
        });
    },
    render: function() {
        var self = this;
        return (
            <div className="control">
                <a className="button is-medium is-primary" onClick={self.handleToggleModal}>{T.get('contact')}</a>
                <ModalWrapper isModalActive={self.state.isModalActive} handleToggleModal={self.handleToggleModal}>
                    <ContactModal />
                </ModalWrapper>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CallToAction;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
