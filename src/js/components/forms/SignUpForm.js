// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TRACKING from '../../modules/tracking';
import AJAX from '../../modules/ajax';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignUpForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            password: '',
            confirm: '',
            isError: false
        }  
    },
    render: function() {
        var MessageNeeded = this.state.isError === true ? <Message header="Sign Up Error" body={E.getErrors()} flavour="danger" />  : '';
        return (
            <form onSubmit={ this.handleSubmit }>
                {MessageNeeded}
                <fieldset>  
                    <legend className="title is-2">{T.get('signUp')}</legend>
                    {/* <p className="control is-grouped">
                        <input className="input" type="text" ref="firstName" placeholder={T.get('firstName')} />
                        <input className="input" type="text" ref="lastName" placeholder={T.get('lastName')} />
                    </p> */}
                    <p className="control">
                        <input className="input" type="text" ref="company" placeholder={T.get('company')} />                                
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
                    {/* <p className="control">
                        <input className="input" type="text" ref="title" placeholder={T.get('title')} />
                    </p> */}
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
    handleSubmit: function (e) {
        var self = this,
            userDataObject,
            errorList = [
                {message: T.get('error.passwordFormatInvalid'), check: UTILS.isValidPassword(self.state.password)},
                {message: T.get('error.passwordMatchInvalid'), check: UTILS.isPasswordConfirm(self.state)}
            ]
        ;
        e.preventDefault();
        if (!E.checkForErrors(errorList)) {
                self.setState({isError: true});
            } else {
                userDataObject = {
                    email: this.refs.email.value.trim(),
                    admin_user_username: this.refs.email.value.trim(),
                    admin_user_password: this.refs.passwordInitial.value.trim(),
                    customer_name: this.refs.company.value.trim()
                };
                TRACKING.sendEvent(this, arguments, userDataObject.email);
                AJAX.doPost('accounts', {
                        host: CONFIG.AUTH_HOST,
                        data: userDataObject
                    })
                    .then(function (account) {
                        self.context.router.push('/pending/');
                    })
                    .catch(function (err) {
                        self.handleError(JSON.parse(err.responseText).error.data, false);
                        self.setState({isError: true});
                    });
            }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

