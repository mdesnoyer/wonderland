// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ContactForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        console.log('submit');
    },
    render: function() {
        var self = this;
        const sendClassName = ['xxButton', 'xxButton--highlight'];
        return (
            <article className="xxPageOverlay-content">
                <h1 className="xxSubtitle">Contact Us</h1>
                <h2 className="xxTitle">Want to find out more?</h2>
                <div className="xxText">
                    <p>Get in touch with questions or comments. We’d love to hear from you!</p>
                </div>
                <form onSubmit={self.handleSubmit}>
                    <fieldset>
                        <div className="xxFormField">
                            <label className="xxLabel">Your Name</label>
                            <input
                                className="xxInputText"
                                type="text"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="xxFormField">
                            <label className="xxLabel">Your Email</label>
                            <input
                                className="xxInputText"
                                type="text"
                                placeholder="example@email.com"
                            />
                        </div>
                        <div className="xxFormField">
                            <label className="xxLabel">Message</label>
                            <textarea
                                className="xxTextArea"
                                placeholder="This demo is fantastic.
                                    This could work for me!"
                            ></textarea>
                        </div>
                        <div className="xxFormButtons">
                            <button className="xxButton" type="button" onClick={self.props.handleClose}>Back</button>
                            <button className={sendClassName.join(' ')} type="submit">Send</button>
                        </div>
                    </fieldset>
                </form>

                <section className="xxSection">
                    <h2 className="xxTitle">Our Location</h2>
                    <div className="xxText">
                        <p>
                            Neon Labs<br />
                            70 South Park Street<br />
                            San Francisco, CA 94107<br />
                            United States
                        </p>
                    </div>
                </section>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ContactForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -