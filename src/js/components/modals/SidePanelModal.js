// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ContactForm from '../forms/ContactForm';
import SupportForm from '../forms/SupportForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Desgin Documents want this on the side hence the name
//currently no styling done
var SidePanelModal = React.createClass({
    proptypes: {
        type: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        var self = this; 
        return {
            type: self.props.type
        }
    },
    render: function() {
        var self = this,
            modalContent
        ; 
        switch(self.state.type){ 
            case 'support':
            modalContent = <SupportForm />
            break;
            case 'contact':
            modalContent = <ContactForm />
            break;
        }
        return (
            <section className="box wonderland-box hero is-desktop">
                <div className="hero-body">
                    <div className="container">
                        {modalContent}
                    </div>
                </div>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SidePanelModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
