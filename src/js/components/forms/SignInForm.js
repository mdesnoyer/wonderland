// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import TRACKING from '../../modules/tracking';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SignInForm = React.createClass({
	// mixins: [ReactDebugMixin],
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
            isError: false,
            isBusy: false
        }  
    },
    componentDidMount: function() {
        var self = this;
        self._isSubmitted = false;
        self._isMounted = true;
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
        E.clearErrors();
    },
    render: function() {
        var self = this,
            messageNeeded = self.state.isError ? <Message header={T.get('signIn') + ' ' + T.get('error')} body={E.getErrors()} flavour="danger" /> : '',
            legendElement = self.props.showLegend ? <legend className="title is-4">{T.get('copy.signIn.heading')}</legend> : '',
            buttonClassName,
            inputClassName
        ;
            if (self.state.isBusy) {
                buttonClassName = 'button is-primary is-medium is-disabled is-loading';
                inputClassName = 'input is-medium is-disabled';
            }
            else {
                buttonClassName = 'button is-medium is-primary';
                inputClassName = 'input is-medium';
            }
        return (
            <form onSubmit={self.handleSubmit}>
                {messageNeeded}
                <fieldset>  
                    {legendElement}                    
                    <p className="control">
                        <input className={inputClassName}
                            type="text"
                            required
                            ref="email"
                            placeholder={T.get('email')}
                            defaultValue={SESSION.rememberedEmail()} 
                        />
                    </p>
                    <p className="control">
                        <input className={inputClassName} type="password" required ref="password" placeholder={T.get('password')} />
                    </p>
                    <p className="control">
                        <label className="checkbox" htmlFor="isRememberMe">
                            <input type="checkbox" className="wonderland-checkbox--checkbox" ref="isRememberMe" id="isRememberMe" defaultValue={SESSION.rememberMe()} defaultChecked={SESSION.rememberMe()} />
                            {T.get('rememberMe')}
                        </label>
                    </p>
                    <p className="has-text-centered">
                        <button className={buttonClassName} type="submit">{T.get('signIn')}</button>
                    </p>
                </fieldset>
            </form>
        );
    },
    handleSubmit: function (e) {
        var self = this;
        e.preventDefault();
        if (!self._isSubmitted) {
            self._isSubmitted = true; 
            if (self._isMounted) {
                self.setState({
                    isError: false,
                    isBusy:true
                }, self.sendUserData());
            }
        }
    },
    sendUserData: function() {
        var self = this,
            isRememberMe = self.refs.isRememberMe.checked,
            email = self.refs.email.value.trim(),
            password = self.refs.password.value.trim(),
            errorList = [
                {message: T.get('error.passwordFormatInvalid'), check: UTILS.isValidPassword(self.state.password)}
            ]
        ;
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
                        self._isSubmitted = false;
                        self.setState({
                            isError: false,
                            isBusy: false
                        });
                    }
                    self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
                })
                .catch(function (err) {
                    E.checkForError('Sorry, we could not sign you in.', false);
                    if (self._isMounted) {
                        self._isSubmitted = false;
                        self.setState({
                            isError: true,
                            isBusy: false
                        });
                    }
                });
        }
        else {
            if (self._isMounted) {
                self.setState({
                    isError: true,
                    isBusy: false
                });
            }
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SignInForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
