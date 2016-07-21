// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ContactForm from '../forms/ContactForm';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Contact = React.createClass({
    render: function() {
        var self = this;
        return (
            <article className="xxPageOverlay-content">
                <h1 className="xxSubtitle">{T.get('nav.contact')}</h1>
                <h2 className="xxTitle">Want to find out more?</h2>
                <ContactForm handleClose={self.props.handleClose} />
                <section className="xxSection">
                    <h2 className="xxTitle">{T.get('label.ourLocation')}</h2>
                    <div className="xxText">
                        <p>
                            {T.get('app.companyLongName')}<br />
                            70 South Park Street<br />
                            San Francisco, CA 94107<br />
                            United States
                        </p>
                    </div>
                </section>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Contact;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -