// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ContactForm from '../forms/ContactForm';

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
        var self = this; 
        switch(self.state.type){
            case: 
        }
        return (
            <section className="box wonderland-box hero is-desktop">
                <div className="hero-body">
                    <div className="container">
                        <ContactForm />
                    </div>
                </div>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SidePanelModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
