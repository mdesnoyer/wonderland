// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SupportForm from '../forms/SupportForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Desgin Documents want this on the side hence the name
//currently no styling done
var EmailModal = React.createClass({
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

export default EmailModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
