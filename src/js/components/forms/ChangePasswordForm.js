// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ChangePasswordForm = React.createClass({
    mixins: [AjaxMixin],
    getInitialState: function() {
        return {
            mode: 'quiet', // quiet, error, loading, success
            currentPassword: '',
            newPassword: '',
            verifyPassword: ''
        }
    },
    updateField: function(e) {
        var self = this;
        switch (e.target.getAttribute('data-ref')) {
            case 'currentPassword':
                self.setState({
                    currentPassword: e.target.value
                });
                break;
            case 'newPassword':
                self.setState({
                    newPassword: e.target.value
                });
                break;
            case 'verifyPassword':
                self.setState({
                    verifyPassword: e.target.value
                });
                break;
            default:
                break;
        }
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        E.checkForError(T.get('error.passwordMatchInvalid'), (self.state.newPassword === self.state.verifyPassword));
        E.checkForError(T.get('error.passwordFormatInvalid'),UTILS.isValidPassword(self.state.newPassword));
        if (E.isErrors()) {
            self.setState({
                mode: 'error'
            });
        }
        else {
            self.setState({
                mode: 'loading'
            }, function() {
                self.PUT('users', {
                    host: CONFIG.AUTH_HOST,
                    data: {
                        'username': self.props.username,
                        'new_password': self.state.newPassword,
                        'reset_password_token': self.props.params.token // TODO
                    }
                })
                .then(function(json) {
                    TRACKING.sendEvent(self, arguments, self.props.username);
                    self.setState({
                        mode: 'success'
                    }, function() {
                        E.clearErrors();
                    });
                })
                .catch(function(err) {
                    switch (err.code) {
                        case 401:
                        case 404:
                            console.log(err);
                            E.raiseError(T.get('copy.userReset.error', {
                                '@link': UTILS.DRY_NAV.USER_FORGOT.URL
                            }));
                            self.setState({
                                mode: 'error'
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
        }
    },
    render: function() {
        var self = this,
        	sendClassName = ['xxButton', 'xxButton--highlight'],
            isValid = (self.state.currentPassword && self.state.newPassword && self.state.verifyPassword 
                && (self.state.newPassword === self.state.verifyPassword)
                && (self.state.mode !== 'loading')),
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
                        <label className="xxLabel">Current Password</label>
                        <input
                            className="xxInputText"
                            type="password"
                            data-ref="currentPassword"
                            minLength="8"
                            maxLength="64"
                            onChange={self.updateField}
                            required
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">New Password</label>
                        <input
                            className="xxInputText"
                            type="password"
                            data-ref="newPassword"
                            minLength="8"
                            maxLength="64"
                            onChange={self.updateField}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="xxFormField">
                        {
                            self.state.verifyPassword && self.state.newPassword !== self.state.verifyPassword ? (
                                <strong className="xxFormError">{T.get('error.passwordMatchInvalid')}</strong>
                            ) : null
                        }
                        <label className="xxLabel">Verify Password</label>
                        <input
                            className="xxInputText"
                            type="password"
                            data-ref="verifyPassword"
                            minLength="8"
                            maxLength="64"
                            onChange={self.updateField}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="xxFormButtons">
                        <button 
                            className={sendClassName.join(' ')} 
                            type="submit" 
                            disabled={!isValid}
                        >
                            {T.get('change')}
                        </button>
                    </div>
                </fieldset>
            </form>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ChangePasswordForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -