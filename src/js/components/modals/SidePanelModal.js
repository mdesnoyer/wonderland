// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ContactForm from '../forms/ContactForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Desgin Documents want this on the side hence the name
//currently no styling done
var SidePanelModal = React.createClass({
    render: function() {
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
