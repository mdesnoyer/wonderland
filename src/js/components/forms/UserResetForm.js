// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import AjaxMixin from '../../mixins/Ajax';
import Message from '../wonderland/Message';
import PasswordBrothers from '../wonderland/PasswordBrothers';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserResetForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    getInitialState: function() {
        return {
            passwordInitial: '',
            passwordConfirm: '',
            mode: 'quiet' // quiet|error|loading|success
        }
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        E.checkForError(T.get('error.passwordMatchInvalid'), (self.state.passwordInitial === self.state.passwordConfirm));
        E.checkForError(T.get('error.passwordFormatInvalid'),UTILS.isValidPassword(self.state.passwordInitial));
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
                        'username': self.props.params.username,
                        'new_password': self.state.passwordInitial,
                        'reset_password_token': self.props.params.token
                    }
                })
                .then(function(json) {
                    TRACKING.sendEvent(self, arguments, self.props.params.username);
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
    handlePasswordInitialChange: function(e) {
        var self = this;
        self.setState({
            passwordInitial: e.target.value
        });
    },
    handlePasswordConfirmChange: function(e) {
        var self = this;
        self.setState({
            passwordConfirm: e.target.value
        });
    },
    render: function() {
        var self = this,
            messageNeededComponent = false,
            sendClassName = ['xxButton', 'xxButton--highlight'],
            isValid = (self.state.passwordInitial && self.state.passwordConfirm 
                && (self.state.passwordInitial === self.state.passwordConfirm) 
                && (self.state.mode !== 'loading'))
        ;
        if (isValid) {
            sendClassName.push('xxButton--important');
        }
        switch(self.state.mode) {
            case 'quiet':
                break;
            case 'error':
                messageNeededComponent = <Message message={E.getErrors()} />;
                break;
            case 'loading':
                messageNeededComponent = <Message message={T.get('copy.loading')} />;
                break;
            case 'success':
                messageNeededComponent = <Message message={T.get('copy.userReset.success', {'@link': UTILS.DRY_NAV.SIGNIN.URL})} />;
                break;
        }
        return (
            <fieldset className="xxMainForm">
                <form onSubmit={self.handleSubmit}>
                    <h2 className="xxTitle">{T.get('copy.userReset.heading')}</h2>
                    <h1 className="xxSubtitle">{T.get('copy.userReset.body')} {T.get('error.passwordFormatInvalid')}</h1>
                    {messageNeededComponent}
                    <PasswordBrothers 
                        handlePasswordInitialChange={self.handlePasswordInitialChange}
                        handlePasswordConfirmChange={self.handlePasswordConfirmChange}
                    />
                    <div className="xxFormButtons">
                        <button  
                            className={sendClassName.join(' ')} 
                            type="submit" 
                            disabled={!isValid}
                        >
                            {T.get('action.resetPassword')}
                        </button>
                    </div>
                </form>
            </fieldset>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserResetForm

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
