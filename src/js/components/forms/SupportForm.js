// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportForm = React.createClass({
    mixins: [AjaxMixin, Account],
    getInitialState: function() {
        return {
            isSubmited: false
        }
    },
    componentDidUpdate(){
        var self = this; 
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
                    <h5>Support</h5>
                    <h1 className="title">What can we help you with?</h1>
                    <p>Nulla efficitur eleifend nisi, sit amet bibendum sapien fringilla ac. Mauris euismod metus a tellus laoreet, at elementum ex efficitur.</p>
                    <p>Maecenas eleifend sollicitudin dui, faucibus sollicitudin augue cursus non. Ut finibus eleifend arcu ut vehicula.</p>
                </div>
                <label className="label">YOUR NAME</label>
                <p className="control">
                    <input className="input" type="text" ref="firstName" />
                </p>
                <label className="label">YOUR EMAIL</label>
                <p className="control">
                    <input className="input" type="email" ref="contactEmail" required/>
                </p>
                <label className="label">ISSUE</label>
                <p className="control">
                  <textarea className="textarea" ref="supportMessage" required></textarea>
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
            // isSubmited: true
        },
            function(){
                self.sendSupportEmail()
            }
        );
    },
    sendSupportEmail: function (){
        var self = this,
            options = self.dataMaker('support')
        ;
        debugger 
        // self.POST('email/', options)
        //     .then(function(res){ 
        //         self.sendConfirmationEmail(options) 
        //     })
        //     .catch(function(err){
        //         console.log(err)
        //     })
        self.sendConfirmationEmail();

    },
    sendConfirmationEmail: function(){
        var self = this,
            options = self.dataMaker('confirm')
        ;
        debugger 
        // self.POST('email/', optionsNew)
        //     .then(function(res){
        //         debugger 
        //     })
        //     .catch(function(err){
        //         debugger 
        //     })
    },
    dataMaker: function(emailType) {
        var self = this,
            email,
            slug,
            data
        ;
        switch(emailType) {
            case 'support':
                email = 'caulfield@neon-lab.com';
                slug =  'support-email-admin';
            break; 
            case 'confirm':
                email = self.refs.contactEmail.value.trim();
                slug = 'support-email'; 
            break;
        }
        data = {data: {
                    subject: "Neon Support Email",
                    // to_email_address: 'support@neon-lab.com',
                    to_email_address: email,
                    template_slug: 'support-email-admin',
                    template_args:{
                        "first_name": self.refs.firstName.value.trim(),
                        "contact_email": self.refs.contactEmail.value.trim(),
                        "support_message": self.refs.supportMessage.value.trim()
                    }
                }}
        return data; 
    }
})



















// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



















