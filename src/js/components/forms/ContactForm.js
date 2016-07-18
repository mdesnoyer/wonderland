// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import Message from '../wonderland/Message';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ContactForm = React.createClass({
    mixins: [AjaxMixin, Account],
    getInitialState: function() {
        return {
            mode: 'quiet', // quiet, error, loading, success
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
        var self = this,
            options = {
                noAccountId: true,
                data: {
                    from_name: self.state.name.trim(),
                    from_email: self.state.email.trim(),
                    message: self.state.message.trim()
                }
            }
        ;
        e.preventDefault();
        self.setState({
            mode: 'loading'
        }, function() {
            self.POST('email/support', options)
                .then(function(res) {
                    self.setState({
                        mode: 'success'
                    });
                })
                .catch(function(err) {
                    E.raiseError(err);
                    self.setState({
                        mode: 'error'
                    });
                })
            ;
        });
    },
    render: function() {
        var self = this,
        	sendClassName = ['xxButton', 'xxButton--highlight'],
            isValid = (self.state.name && self.state.email && self.state.message && (self.state.mode !== 'loading')),
            userMessage = null
        ;
        if (isValid) {
            sendClassName.push('xxButton--important');
        }
        switch (self.state.mode) {
            case 'error':
                userMessage = <div className="has-error"><p className="xxLabel">{E.getErrors()}</p></div>;
                break;
            case 'loading':
                userMessage = <div className="xxLabel"><p>{T.get('copy.loading')}</p></div>;
                break;
            case 'success':
                userMessage = <div className="xxLabel"><p>{T.get('copy.contactUs.success')}</p></div>;
                break;
            default:
                break;
        }
        return (
            <form onSubmit={self.handleSubmit}>
                {userMessage}
                <fieldset>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.yourName')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            data-ref="name"
                            onChange={self.updateField}
                            required
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.yourEmail')}</label>
                        <input
                            className="xxInputText"
                            type="email"
                            data-ref="email"
                            onChange={self.updateField}
                            required
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.message')}</label>
                        <textarea
                            className="xxTextArea"
                            data-ref="message"
                            onChange={self.updateField}
                            required
                        ></textarea>
                    </div>
                    <div className="xxFormButtons">
                        <button className="xxButton" type="button" onClick={self.props.handleClose}>{T.get('back')}</button>
                        <button className={sendClassName.join(' ')} type="submit" disabled={!isValid}>{T.get('send')}</button>
                    </div>
                </fieldset>
            </form>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ContactForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -