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
            isError: false
        }  
    },
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
    },
    render: function() {
        var self = this,
            messageNeeded = self.state.isError ? <Message header={T.get('signIn') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" />  : '',
            legendElement = self.props.showLegend ? <legend className="subtitle is-5">{T.get('copy.signIn.heading')}</legend> : ''
        ;
        return (
            <form onSubmit={self.handleSubmit}>
                {messageNeeded}
                <fieldset>  
                    {legendElement}                    
                    <p className="control">
                        <input
                            className="input is-medium"
                            type="text"
                            required
                            ref="email"
                            placeholder={T.get('email')}
                            defaultValue={SESSION.rememberedEmail()}
                        />
                    </p>
                    <p className="control">
                        <input className="input is-medium" type="password" required ref="password" placeholder={T.get('password')} />
                    </p>
                    <p className="control">
                        <label className="checkbox is-medium" htmlFor="isRememberMe">
                            <input className="checkbox" type="checkbox" ref="isRememberMe" id="isRememberMe" defaultValue={SESSION.rememberMe()} defaultChecked={SESSION.rememberMe()} />
                            {T.get('rememberMe')}
                        </label>
                    </p>
                    <p className="is-text-centered">
                        <button className="button is-medium is-primary" type="submit">{T.get('signIn')}</button>
                    </p>
                </fieldset>
            </form>
        );
    },
    handleSubmit: function (e) {
        var self = this,
            isRememberMe = self.refs.isRememberMe.checked,
            email = self.refs.email.value.trim(),
            password = self.refs.password.value.trim(),
            errorList = [
                {message: T.get('error.passwordFormatInvalid'), check: UTILS.isValidPassword(self.state.password)}
            ]
        ;
        e.preventDefault();
        if (self._isMounted) {
            self.setState({
                isError: false
            });
        }
        // if (!E.checkForErrors(errorList)) {
        //placeholder for error handling later 
        if (true) {
            TRACKING.sendEvent(self, arguments, email);
            AJAX.doPost('authenticate', {
                    host: CONFIG.AUTH_HOST,
                    data: {
                        username: email,
                        password: password
                    }
                })
                .then(function (res) {
                    SESSION.set(res.access_token, res.refresh_token, res.account_ids[0], res.user_info);
                    if (SESSION.rememberMe(isRememberMe)) {
                        SESSION.rememberedEmail(email);
                    }
                    if (self._isMounted) {
                        self.setState({
                            isError: false
                        });
                    }
                    self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
                })
                .catch(function (err) {
                    E.checkForError(err.statusText, false);
                    if (self._isMounted) {
                        self.setState({
                            isError: true
                        });
                    }
                });
        }
        else {
            if (self._isMounted) {
                self.setState({
                    isError: true
                });
            }
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignInForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
