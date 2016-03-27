
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TRACKING from '../../tracking';
import AJAX from '../../ajax';
import SESSION from '../../session';
import Message from './Message';
import T from '../../translation';

// TODO: Using sample values until account creation works:
const USERNAME ='wonderland_demo',
    PASSWORD ='ad9f8g4n3ibna9df',
    ACCOUNT_ID = 'uhet29evso83qb7ys70hvj3z';

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
        var MessageNeeded = this.state.isError === true ? <Message header={T.get('signIn') + ' ' + T.get('error')} body={this.state.errorMessageArray} flavour="danger" />  : '';
        // TODO: default username isn't an email... (set type="email" on email field)
        return (
            <form onSubmit={ this.handleSubmit }>
                {MessageNeeded}
                <fieldset>  
                    <legend className="title is-2">{T.get('signIn')}</legend>
                    <p className="control is-grouped">
                        <input className="input" type="text" required ref="email" placeholder={T.get('email')} defaultValue={SESSION.rememberedEmail()} />(example: {USERNAME})
                    </p>
                    <p className="control is-grouped">
                        <input className="input" type="password" required ref="password" placeholder={T.get('password')} />(example: {PASSWORD})
                    </p>
                    <p className="control is-grouped">
                        <input className="checkbox" type="checkbox" ref="rememberMe" id="rememberMe" defaultValue={SESSION.rememberMe()} defaultChecked={SESSION.rememberMe()} /><label htmlFor="rememberMe">&nbsp;{T.get('rememberMe')}</label>
                    </p>
                    <p className="is-text-centered">
                        <button className="button is-primary" type="submit">{T.get('signIn')}</button>
                    </p>
                </fieldset>
            </form>
        );
    },
    validatePassword: function () {
        // TODO: default pwd doesn't match regex...
        return true;

        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return re.test(this.refs.password.value.trim());
    },
    handleError: function (errorMessage, check) {
        var msgIndex = this.state.errorMessageArray.indexOf(errorMessage);
        if (check === false && msgIndex === -1) {
            this.state.errorMessageArray.push(errorMessage);
        } else if (check === true && msgIndex > -1) {
            this.state.errorMessageArray.splice(msgIndex, 1);
        }
        return check;
    },
    handleAllErrorCheck: function () {
        return this.handleError(T.get('passwordFormatInvalid'), this.validatePassword());
    },
    handleSubmit: function (e) {
        var self = this,
            email, rememberMe;

        e.preventDefault();

        if (self.handleAllErrorCheck()) {

            email = self.refs.email.value.trim();

            TRACKING.sendEvent(self, arguments, email);

            AJAX.doPost('authenticate', {
                    host: AJAX.AUTH_HOST,
                    data: {
                        username: email,
                        password: self.refs.password.value.trim()
                    }
                })
                .then(function (res) {
                    SESSION.set(res.access_token, res.refresh_token, ACCOUNT_ID || res.account_id);
                    
                    if (SESSION.rememberMe(self.refs.rememberMe.checked)) {
                        SESSION.rememberedEmail(email);
                    }
                    self.setState({isError: false});

                    // TODO: What to do after a succesfull login?
                    alert('Good login');
                })
                .catch(function (err) {
                    self.handleError(err.responseText, false);
                    self.setState({isError: true});
                });
        } else {
            self.setState({isError: true});
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignInForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
