// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import Message from '../wonderland/Message';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ContactForm = React.createClass({
    mixins: [AjaxMixin, Account],
    getInitialState: function() {
        return {
            mode: 'quiet', // quiet, error, loading, success
            name: '',
            email: '',
            message: '',
            errorMessage: ''
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
                    switch(err.message) {
                        // Checking with message rather than code because there are two 400 errors, one for invalid email and another related to #1449 Once #1449 is resolved we should be able to check on code instead - AK
                        case "not a valid email address for dictionary value @ data[u'from_email']":
                            self.setState({
                                mode: 'error',
                                errorMessage: T.get('error.invalidEmail')
                            });
                            break;
                        default:
                            self.setState({
                                mode: 'error',
                                errorMessage: T.get('error.contactUs')
                            });
                            break;
                    }
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
                userMessage = <Message message={self.state.errorMessage} type="formError" />;
                break;
            case 'loading':
                userMessage = <Message message={T.get('copy.loading')} />;
                break;
            default:
                break;
        }
        return (
            <form onSubmit={self.handleSubmit}>
                {
                    (self.state.mode === 'success') ? (
                        <div>
                            <div className="xxText">
                                <p>{T.get('copy.contactUs.success')}</p>
                            </div>
                            <div className="xxFormButtons">
                                <button className="xxButton" type="button" onClick={self.props.handleClose}>{T.get('back')}</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="xxText">
                                <p>Get in touch with questions or comments. We&rsquo;d love to hear from you!</p>
                            </div>
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
                        </div>
                    )
                }                
            </form>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ContactForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -