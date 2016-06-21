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
            isSubmitted: false
        }
    },
    render: function() {
        var self = this,
            initialForm = ( 
                <form onSubmit={self.handleSubmit} className={'support-form'}>
                    <div className="content">
                        <h1 className="title">What can we help you with?</h1>
                    </div>
                    <label className="label">your name</label>
                    <p className="control">
                        <input className="input" type="text" ref="firstName" required />
                    </p>
                    <label className="label">your email</label>
                    <p className="control">
                        <input className="input" type="email" ref="contactEmail" required/>
                    </p>
                    <label className="label">issue</label>
                    <p className="control">
                      <textarea className="textarea" ref="supportMessage" required></textarea>
                    </p>
                    <div className="container">
                        <button className="button is-large" type="submit" >Send</button>
                    </div>
                </form>
            ),
            successForm = <h1 className="title">TODO CONTACT THANK YOU</h1>,
            formContent = self.state.isSubmitted ? successForm : initialForm
        return (
            <div>
                {formContent}
            </div>
        );
    },
    handleSubmit: function(e) {
        var self = this; 
        e.preventDefault();
        self.sendSupportEmail();
    },
    sendSupportEmail: function () {
        var self = this,
            options = self.dataMaker('support')
        ;
        self.POST('email', options)
            .then(function(res) { 
                self.sendConfirmationEmail() 
            })
            .catch(function(err) {
                console.log(err)
            })
    },
    sendConfirmationEmail: function() {
        var self = this,
            optionsNew = self.dataMaker('confirm')
        ;
        self.POST('email', optionsNew)
            .then(function(res){
                self.setState({isSubmitted: true})
            })
            .catch(function(err){
                console.log(err)
            })
    },
    dataMaker: function(emailType) {
        var self = this,
            email,
            slug,
            data
        ;
        switch(emailType) {
            case 'support':
                email = UTILS.SUPPORT_EMAIL;
                slug =  UTILS.SUPPORT_MANDRILL_SLUG;
            break; 
            case 'confirm':
                email = self.refs.contactEmail.value.trim();
                slug = UTILS.CONFIRM_MANDRILL_SLUG;
            break;
        }
        data = {
            data: {
                    subject: 'Neon Support Email',
                    to_email_address: email,
                    template_slug: slug,
                    template_args:{
                        "first_name": self.refs.firstName.value.trim(),
                        "contact_email": self.refs.contactEmail.value.trim(),
                        "support_message": self.refs.supportMessage.value.trim()
                    }
                }
        }
        return data; 
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
