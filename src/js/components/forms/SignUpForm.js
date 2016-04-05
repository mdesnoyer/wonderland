
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TRACKING from '../../modules/tracking';
import AJAX from '../../modules/ajax';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignUpForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            password: '',
            confirm: '',
            errorMessageArray: [],
            isError: false
        }  
    },
    render: function() {
        var MessageNeeded = this.state.isError === true ? <Message header="Sign Up Error" body={this.state.errorMessageArray} flavour="danger" />  : '';
        return (
            <form onSubmit={ this.handleSubmit }>
                {MessageNeeded}
                <fieldset>  
                    <legend className="title is-2">{T.get('signUp')}</legend>
                    <p className="control is-grouped">
                        <input className="input" type="text" ref="firstName" placeholder={T.get('firstName')} />
                        <input className="input" type="text" ref="lastName" placeholder={T.get('lastName')} />
                    </p>
                    <p className="control is-grouped">
                        <input className="input" type="email" required ref="email" placeholder={T.get('email')} />
                    </p>
                    <p className="control is-grouped">
                        <input
                            className="input" 
                            type="password" 
                            required
                            ref="passwordInitial"
                            placeholder={T.get('password')}
                            onChange={this.handlePasswordInitialChange} 
                        />
                        <input 
                            className="input" 
                            type="password" 
                            required
                            ref="passwordConfirm" 
                            placeholder={T.get('confirm')}
                            onChange={this.handlePasswordConfirmChange}
                        />
                    </p>
                    <p className="control">
                        <input className="input" type="text" ref="company" placeholder={T.get('company')} />                                
                    </p>
                    <p className="control">
                        <input className="input" type="text" ref="title" placeholder={T.get('title')} />
                    </p>
                    <p className="is-text-centered">
                        <button className="button is-primary" type="submit">{T.get('signUp')}</button>
                    </p>
                </fieldset>
            </form>
        );
    },
    handlePasswordInitialChange: function (event) {
        this.setState({ password: event.target.value });
    },
    handlePasswordConfirmChange: function (event) {
        this.setState({confirm: event.target.value});
    },
    isPasswordEqualsConfirm: function () {
        return this.state.password === this.state.confirm;
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
        return this.handleError(T.get('error.passwordFormatInvalid'), UTILS.isValidPassword(this.state.password))
            && this.handleError(T.get('error.passwordMatchInvalid'), this.isPasswordEqualsConfirm());
    },
    handleSubmit: function (e) {
        var self = this,
            userDataObject;
        e.preventDefault();
        if (!self.handleAllErrorCheck()) {
                self.setState({isError: true});
            } else {
                userDataObject = {
                    firstName: this.refs.firstName.value.trim(),
                    lastName: this.refs.lastName.value.trim(),
                    email: this.refs.email.value.trim(),
                    passwordInitial: this.refs.passwordInitial.value.trim(),
                    passwordConfirm: this.refs.passwordConfirm.value.trim(),
                    company: this.refs.company.value.trim(),
                    title: this.refs.title.value.trim()
                };
                TRACKING.sendEvent(this, arguments, userDataObject.email);
                AJAX.doPost('signup', {
                        host: AJAX.AUTH_HOST,
                        data: userDataObject
                    })
                    .then(function (user) {
                        return AJAX.doPost('authenticate', {
                                host: AJAX.AUTH_HOST,
                                data: {
                                    username: userDataObject.email,
                                    password: userDataObject.passwordInitial
                                }
                            })
                            .then(function (res) {
                                SESSION.set(res.access_token, res.refresh_token, res.account_id, user);
                                self.context.router.push('/upload/video/');
                            });
                    })
                    .catch(function (err) {
                        // To be used later 
                        // self.handleError(err.responseText, false);
                        self.handleError(T.get('copy.accountCreationTempError'), false)
                        self.setState({isError: true});
                    });
            }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
