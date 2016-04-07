// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TRACKING from '../../modules/tracking';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignInForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            errorMessageArray: [],
            isError: false
        }  
    },
    render: function() {
        var messageNeeded = this.state.isError ? <Message header={T.get('signIn') + ' ' + T.get('error')} body={this.state.errorMessageArray} flavour="danger" />  : '';
        return (
            <form onSubmit={ this.handleSubmit }>
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
    handleError: function (errorMessage, check) {
        var self = this,
            msgIndex = this.state.errorMessageArray.indexOf(errorMessage),
            newErrorMessageArray = self.state.errorMessageArray
        ;
        if (check === false && msgIndex === -1) {
            newErrorMessageArray.push(errorMessage);
            self.setState({
                errorMessageArray: newErrorMessageArray
            });
        }
        else {
            if (check === true && msgIndex > -1) {
                newErrorMessageArray.splice(msgIndex, 1);
                self.setState({
                    errorMessageArray: newErrorMessageArray
                });
            }
        }
        return check;
    },
    handleAllErrorCheck: function () {
        // return this.handleError(T.get('passwordFormatInvalid'), UTILS.isValidPassword(this.refs.password.value.trim()));
        return true; 
    },
    handleSubmit: function (e) {
        var self = this,
            isRememberMe = self.refs.isRememberMe.checked,
            username = self.refs.username.value.trim(),
            password = self.refs.password.value.trim()
        ;
        e.preventDefault();
        if (self.handleAllErrorCheck()) {
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
                    self.handleError(err.statusText, false);
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
