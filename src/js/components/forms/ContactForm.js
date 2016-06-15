// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ContactForm = React.createClass({
    getInitialState: function() {
        return {
            isSubmited: false
        }
    },
    render: function() {
        var self = this,
            successForm,
            initialForm,
            formContent
        ;
        initialForm = (
            <form onSubmit={self.handleSubmit}>
                <h1 className="title">TODO CONTACT MESSAGE</h1>
                <label className="label">YOUR NAME</label>
                <p className="control has-icon">
                    <input className="input" type="text" />
                    <i className="fa fa-user"></i>
                </p>
                <label className="label">YOUR EMAIL</label>
                <p className="control has-icon">
                    <input className="input" type="email" />
                    <i className="fa fa-phone"></i>
                </p>
                <label className="label">MESSAGE</label>
                <p className="control">
                  <textarea class="textarea" placeholder="Textarea"></textarea>
                </p>
                <p className="is-text-centered">
                    <button className="button is-success">
                        TODO CONTACT BUTTON
                    </button>
                    <button className="button is-success">
                        TODO CONTACT BUTTON
                    </button>
                </p>
            </form>
        );
        successForm = (
            <div>
                <h1 className="title">TODO CONTACT THANK YOU</h1>
            </div>
        );
        formContent = self.state.isSubmited ? successForm : initialForm
        return (
            <div>
                {formContent}
            </div>
        );
    },
    handleSubmit: function(e) {
        e.preventDefault();
        //TODO CRM SETUP
        this.setState({
            isSubmited: true
        });
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ContactForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
