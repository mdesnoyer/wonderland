// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import ContactModal from '../core/ContactModal';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var CallToAction = React.createClass({
     getInitialState: function () {
         return {
             isModalActive: false
         };
     },
    toggleModal: function() {
        this.setState({
            isModalActive: !this.state.isModalActive
        });
    },
    render: function() {
        return (
            <div className="control">
                <a className="button is-primary" onClick={this.toggleModal}>{T.get('contact')}</a>
                <ContactModal isModalActive={this.state.isModalActive} toggleModal={this.toggleModal} />
            </div>  
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default CallToAction;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
