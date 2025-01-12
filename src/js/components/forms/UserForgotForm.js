// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import AjaxMixin from '../../mixins/Ajax';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserForgotForm = React.createClass({
    mixins: [AjaxMixin],
    propTypes: {
        showLegend: React.PropTypes.bool.isRequired
    },
    getDefaultProps: function() {
        return {
            showLegend: true
        }
    },
    getInitialState: function() {
        return {
            mode: 'quiet', // quiet|error|loading|success
            email: ''
        }
    },
    componentWillUnmount: function(e) {
        E.clearErrors();
    },
    updateEmail: function(e) {
        var self = this;
        self.setState({
            email: e.target.value
        });
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        TRACKING.sendEvent(self, arguments, self.refs.email.value.trim());
        self.setState({
            mode: 'loading'
        }, function() {
            self.POST('users/forgot_password', {
                host: CONFIG.AUTH_HOST,
                data: {
                    username: self.refs.email.value.trim()
                }
            })
            .then(function(json) {
                self.setState({
                    mode: 'success'
                });
            })
            .catch(function(err) {
                switch (err.code) {
                    case 400:
                    case 404:
                        // We ignore the 404, we don't want to alert that the
                        // account doesn't exist
                        console.log(err);
                        self.setState({
                            mode: 'success'
                        });
                        break;
                    default:
                        console.log(err);
                        E.raiseError(err);
                        self.setState({
                            mode: 'error'
                        });
                        break;
                }
            });
        });
    },
    render: function() {
        var self = this,
            messageNeededComponent = false,
            submitClassName = ['xxButton', 'xxButton--highlight'],
            isValid = (self.state.email)
        ;
        if (self.state.email) {
            submitClassName.push('xxButton--important');
        }
        switch(self.state.mode) {
            case 'error':
                messageNeededComponent = <Message message={T.get('copy.userForgot.error')} type="formError" />;
                break;
            case 'loading':
                messageNeededComponent = <Message message={T.get('copy.loading')} />;
                break;
            default:
                break;
        }
        return (
            <div className="xxMainForm">
                <form onSubmit={self.handleSubmit}>
                    <h2 className="xxTitle">{T.get('copy.userForgot.heading')}</h2>
                    {
                        (self.state.mode === 'success') ? (
                            <div className="xxText">
                                <p>{T.get('copy.userForgot.success')}</p>
                            </div>
                        ) : (
                            <div>
                                <div className="xxText">
                                    <p>{T.get('copy.userForgot.body')}</p>
                                </div>
                                {messageNeededComponent}
                                <div className="xxFormField">
                                    <label className="xxLabel">{T.get('label.yourEmail')}</label>
                                    <input className="xxInputText"
                                        type="email"
                                        ref="email"
                                        required
                                        minLength="6"
                                        maxLength="1024"
                                        placeholder={T.get('email')}
                                        onChange={self.updateEmail}
                                    />
                                </div>
                                <div className="xxFormButtons">
                                    <button
                                        className={submitClassName.join(' ')}
                                        type="submit"
                                        disabled={!isValid}
                                    >
                                        {T.get('action.resetPassword')}
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </form>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserForgotForm

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
