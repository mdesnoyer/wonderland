// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportForm = React.createClass({
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
                <div className="content">
                    <h5>Need our Assistance?</h5>
                    <h1 className="title">Want to find out more?</h1>
                    <p>Nulla efficitur eleifend nisi, sit amet bibendum sapien fringilla ac. Mauris euismod metus a tellus laoreet, at elementum ex efficitur.</p>
                    <p>Maecenas eleifend sollicitudin dui, faucibus sollicitudin augue cursus non. Ut finibus eleifend arcu ut vehicula.</p>
                </div>
                <label className="label">YOUR NAME</label>
                <p className="control">
                    <input className="input" type="text" />
                </p>
                <label className="label">YOUR EMAIL</label>
                <p className="control">
                    <input className="input" type="email" />
                </p>
                <label className="label">ISSUE</label>
                <p className="control">
                  <textarea className="textarea"></textarea>
                </p>
                <div className="container">
                    <button className="button is-large">Back</button>
                    <button className="button is-large" type="submit" >Send</button>
                </div>
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
        var self = this; 
        e.preventDefault();
        //TODO CRM SETUP
        self.setState({
            isSubmited: true
        },
            function(){
                self.sendContactEmail()
            }
        );
    },
    sendContactEmail: function (){
        debugger 
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
