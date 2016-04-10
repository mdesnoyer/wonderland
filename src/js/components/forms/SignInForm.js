// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TRACKING from '../../modules/tracking';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignInForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            isError: false
        }  
    },
    render: function() {
        var self = this,
            messageNeeded = self.state.isError ? <Message header={T.get('signIn') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" />  : '';
        return (
            <form onSubmit={self.handleSubmit}>
                {messageNeeded}
                <fieldset>  
                    <legend className="title is-2">{T.get('signIn')}</legend>
                    <p className="control">
                        <input className="input" type="text" required ref="username" placeholder={T.get('username')} defaultValue={SESSION.rememberedUsername()} />
                    </p>
                    <p className="control">
                        <input className="input" type="password" required ref="password" placeholder={T.get('password')} />
                    </p>
                    <p className="control">
                        <input className="checkbox" type="checkbox" ref="isRememberMe" id="isRememberMe" defaultValue={SESSION.rememberMe()} defaultChecked={SESSION.rememberMe()} /><label htmlFor="isRememberMe">&nbsp;{T.get('rememberMe')}</label>
                    </p>
                    <p className="is-text-centered">
                        <button className="button is-primary" type="submit">{T.get('signIn')}</button>
                    </p>
                </fieldset>
            </form>
        );
    },
    handleSubmit: function (e) {
        var self = this,
            isRememberMe = self.refs.isRememberMe.checked,
            username = self.refs.username.value.trim(),
            password = self.refs.password.value.trim(),
            errorList = [
                {message: T.get('error.passwordFormatInvalid'), check: UTILS.isValidPassword(self.state.password)}
            ]
        ;
        e.preventDefault();
        self.setState({
            isError: false
        });
        // if (!E.checkForErrors(errorList)) {
        //placeholder for error handling later 
        if (true) {
            TRACKING.sendEvent(self, arguments, username);
            AJAX.doPost('authenticate', {
                    host: CONFIG.AUTH_HOST,
                    data: {
                        username: username,
                        password: password
                    }
                })
                .then(function (res) {
                    SESSION.set(res.access_token, res.refresh_token, res.account_ids[0]);
                    if (SESSION.rememberMe(isRememberMe)) {
                        SESSION.rememberedUsername(username);
                    }
                    self.setState({
                        isError: false
                    });
                    self.context.router.push('/dashboard/');
                })
                .catch(function (err) {
                    E.checkForError(err.statusText, false);
                    self.setState({
                        isError: true
                    });
                });
        }
        else {
            self.setState({
                isError: true
            });
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignInForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
