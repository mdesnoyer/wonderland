// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ContactForm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            email: '',
            message: ''
        }
    },
    updateField: function(e) {
        var self = this;
        switch (e.target.getAttribute('data-ref')) {
            case 'name':
                self.setState({
                    name: e.target.value
                });
                break;
            case 'email':
                self.setState({
                    email: e.target.value
                });
                break;
            case 'message':
                self.setState({
                    message: e.target.value
                });
                break;
            default:
                break;
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();
        console.log('submit');
    },
    render: function() {
        var self = this,
            sendClassName = ['xxButton', 'xxButton--highlight'],
            isValid = (self.state.name && self.state.email && self.state.message) ? true : false
        ;
        if (isValid) {
            sendClassName.push('xxButton--important');
        }
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
                                data-ref="name"
                                placeholder="John Doe"
                                onChange={self.updateField}
                            />
                        </div>
                        <div className="xxFormField">
                            <label className="xxLabel">Your Email</label>
                            <input
                                className="xxInputText"
                                type="text"
                                data-ref="email"
                                placeholder="example@email.com"
                                onChange={self.updateField}
                            />
                        </div>
                        <div className="xxFormField">
                            <label className="xxLabel">Message</label>
                            <textarea
                                className="xxTextArea"
                                type="text"
                                data-ref="message"
                                placeholder="This demo is fantastic. This could work for me!"
                                onChange={self.updateField}
                            >
                            </textarea>
                        </div>
                        <div className="xxFormButtons">
                            <button className="xxButton" type="button" onClick={self.props.handleClose}>Back</button>
                            <button className={sendClassName.join(' ')} type="submit" disabled={!isValid}>Send</button>
                        </div>
                    </fieldset>
                </form>

                <section className="xxSection">
                    <h2 className="xxTitle">Our Location</h2>
                    <div className="xxText">
                        <p>
                            Neon Labs<br />
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

export default ContactForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -