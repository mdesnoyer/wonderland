// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import PasswordBrothers from '../wonderland/PasswordBrothers';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import Message from '../wonderland/Message';
import Icon from '../core/Icon';
import SignInForm from '../forms/SignInForm';
import AjaxMixin from '../../mixins/Ajax';

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
            legendElement = self.props.showLegend ? <legend className="title is-4">{T.get('copy.userForgot.heading')}</legend> : false,
            messageNeededComponent = false  
        ;
        switch(self.state.mode) {
            case 'quiet':
                break;
            case 'error':
                messageNeededComponent = <Message header={T.get('copy.userReset.heading')} body={E.getErrors()} flavour="danger" />;
                break;
            case 'loading':
                break;
            case 'success':
                messageNeededComponent = <div><Message header={T.get('copy.userReset.heading')} body={T.get('copy.userReset.success', {'@link': UTILS.DRY_NAV.SIGNIN.URL})} flavour="success" /><SignInForm showLegend={true} /></div>;
                break;
        }
        return(
            <div>
                {messageNeededComponent}
                <form onSubmit={self.handleSubmit} className={self.state.mode === 'success' ? 'is-hidden' : ''}>
                    <fieldset>
                        {legendElement}
                        <PasswordBrothers
                            mode={self.state.mode}
                            handlePasswordInitialChange={self.handlePasswordInitialChange}
                            handlePasswordConfirmChange={self.handlePasswordConfirmChange}
                        />
                        <p className="has-text-centered">
                            <button
                                className={'button is-medium is-primary' + (self.state.mode === 'loading' ? ' is-loading' : '')}
                                type="submit"
                            >
                                <Icon type="check-circle" />
                                {T.get('action.resetPassword')}
                            </button>
                        </p>
                    </fieldset>
                </form>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserResetForm

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
