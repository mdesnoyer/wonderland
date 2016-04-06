// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TRACKING from '../../modules/tracking';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import E from '../../modules/errors';

// TODO: Using sample values until account creation works:
const USERNAME ='wonderland_demo',
    PASSWORD ='ad9f8g4n3ibna9df',
    ACCOUNT_ID = 'uhet29evso83qb7ys70hvj3z'
;

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
        var messageNeeded = this.state.isError ? <Message header={T.get('signIn') + ' ' + T.get('error')} body={E.errorMessageArray} flavour="danger" />  : '';
        return (
            <form onSubmit={ this.handleSubmit }>
                {messageNeeded}
                <fieldset>  
                    <legend className="title is-2">{T.get('signIn')}</legend>
                    <p className="control">
                        <input className="input" type="text" required ref="username" placeholder={T.get('username')} defaultValue={SESSION.rememberedUsername()} />
                        <span className="wonderland-small">example: {USERNAME}</span>
                    </p>
                    <p className="control">
                        <input className="input" type="password" required ref="password" placeholder={T.get('password')} />
                        <span className="wonderland-small">example: {PASSWORD}</span>
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
            password = self.refs.password.value.trim()
        ;
        e.preventDefault();
        if (!E.handleAllErrorCheck(this.state)) {
            TRACKING.sendEvent(self, arguments, username);
            AJAX.doPost('authenticate', {
                    host: AJAX.AUTH_HOST,
                    data: {
                        username: username,
                        password: password
                    }
                })
                .then(function (res) {
                    SESSION.set(res.access_token, res.refresh_token, ACCOUNT_ID || res.account_id);
                    if (SESSION.rememberMe(isRememberMe)) {
                        SESSION.rememberedUsername(username);
                    }
                    self.setState({
                        isError: false
                    });
                    self.context.router.push('/dashboard/');
                })
                .catch(function (err) {
                    E.handleError(T.get(err.statusText, false))
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
