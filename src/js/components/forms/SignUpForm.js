import React from 'react';
import TRACKING from '../../modules/tracking';
import SESSION from '../../modules/session';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import Message from '../wonderland/Message';


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignUpForm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    mixins: [AjaxMixin], // ReactDebugMixin
    getInitialState: function() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            verifyPassword: '',
            mode: 'quiet' // quiet, loading, error, success
        }
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.active()) {
            // If there's an active session with a user, there's no reason to be here
            SESSION.user()
                .then(function() {
                    self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
                });
        }
    },
    componentWillUnmount: function(e) {
        E.clearErrors();
    },
    componentDidMount: function() {
        var self = this;
        self._isSubmitted = false;
    },
    updateField: function(e) {
        var self = this;
        switch (e.target.getAttribute('data-ref')) {
            case 'firstName':
                self.setState({
                    firstName: e.target.value
                });
                break;
            case 'lastName':
                self.setState({
                    lastName: e.target.value
                });
                break;
            case 'email':
                self.setState({
                    email: e.target.value
                });
                break;
            case 'password':
                self.setState({
                    password: e.target.value
                });
                break;
            case 'verifyPassword':
                self.setState({
                    verifyPassword: e.target.value
                });
                break;
            default:
                break;
        }
    },
    render: function() {
        var self = this,
            terms = T.get('copy.agreeTerms', {
                '@link': UTILS.DRY_NAV.TERMS.URL
            }),
            isValid = self.state.firstName && self.state.email && self.state.password && self.state.verifyPassword && (self.state.password === self.state.verifyPassword) && (self.state.mode !== 'loading'),
            submitClassName = ['xxButton', 'xxButton--highlight'],
            userMessage = null
        ;
        if (isValid) {
            submitClassName.push('xxButton--important');
        }
        switch (self.state.mode) {
            case 'error':
                userMessage = <Message message={E.getErrors()} type="formError" />;
                break;
            case 'loading':
                userMessage = <Message message={T.get('copy.loading')} />;
                break;
            case 'success':
                userMessage = <Message message={T.get('copy.confirmAccount.body')} />;
                break;
            default:
                break;
        }
        return (
            <form onSubmit={self.handleSubmit}>
                {userMessage}
                {
                self.state.mode === 'loading' || self.state.mode === 'success' ? null : (
                <fieldset>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.firstName')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            data-ref="firstName"
                            minLength="1"
                            maxLength="256"
                            onChange={self.updateField}
                            required
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.lastName.optional')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            data-ref="lastName"
                            minLength="1"
                            maxLength="256"
                            onChange={self.updateField}
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.yourEmail')}</label>
                        <input
                            className="xxInputText"
                            type="email"
                            data-ref="email"
                            minLength="6"
                            maxLength="1024"
                            onChange={self.updateField}
                            required
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('copy.passwordInitial')}</label>
                        <input
                            className="xxInputText"
                            type="password"
                            data-ref="password"
                            minLength="8"
                            maxLength="64"
                            onChange={self.updateField}
                            required
                        />
                    </div>
                    <div className="xxFormField">
                        {
                            self.state.verifyPassword && self.state.password !== self.state.verifyPassword ? (
                                <strong className="xxFormError">{T.get('error.passwordMatchInvalid')}</strong>
                            ) : null
                        }
                        <label className="xxLabel">{T.get('copy.passwordVerify')}</label>
                        <input
                            className="xxInputText"
                            type="password"
                            data-ref="verifyPassword"
                            minLength="8"
                            maxLength="64"
                            onChange={self.updateField}
                            required
                        />
                    </div>
                    <span dangerouslySetInnerHTML={{__html: terms}} />
                    <div className="xxFormButtons">
                        <button
                            className="xxButton"
                            type="button"
                            onClick={self.props.handleClose}
                        >
                            {T.get('back')}
                        </button>
                        <button
                            className={submitClassName.join(' ')}
                            type="submit"
                            disabled={!isValid}
                        >
                            {T.get('signUp')}
                        </button>
                    </div>
                </fieldset>
                )
            }
            </form>
        );
    },
    handleSubmit: function (e) {
        var self = this,
            userDataObject = {},
            errorList = [
                {message: T.get('error.passwordFormatInvalid'), check: UTILS.isValidPassword(self.state.password)},
                {message: T.get('error.passwordMatchInvalid'), check: UTILS.isPasswordConfirm(self.state)}
            ],
            userPromise
        ;
        e.preventDefault();
        self.setState({
            mode: 'loading'
        });
        if (!E.checkForErrors(errorList)) {
            self.setState({
                mode: 'error'
            });
        }
        else {
            if (!self._isSubmitted) {
                self._isSubmitted = true;
                // If the session is active, we just need to create the user; not the whole account
                if (SESSION.active()) {
                    userDataObject = {
                        username: self.state.email.trim(),
                        password: self.state.password.trim(),
                        first_name: self.state.firstName.trim()
                    };
                    // Only add the last name if it exists #1194
                    if (self.state.lastName.trim()) {
                        userDataObject.last_name = self.state.lastName.trim();
                    }
                    userPromise = self.POST('users', {
                        host: CONFIG.AUTH_HOST,
                        headers: {
                            Authorization: 'Bearer ' + SESSION.state.accessToken
                        },
                        data: userDataObject
                    });
                } else {
                    userDataObject = {
                        email: self.state.email.trim(),
                        admin_user_username: self.state.email.trim(),
                        admin_user_password: self.state.password.trim(),
                        admin_user_first_name: self.state.firstName.trim()
                    };
                    // Only add the last name if it exists #1194
                    if (self.state.lastName.trim()) {
                        userDataObject['admin_user_last_name'] = self.state.lastName.trim();
                    }
                    userPromise = self.POST('accounts', {
                        host: CONFIG.AUTH_HOST,
                        data: userDataObject
                    });
                }
                userPromise
                    .then(function (account) {
                        self._isSubmitted = false;
                        self.props.completeSubmission();
                    })
                    .catch(function (err) {
                        if (err.code === 409) {
                            E.raiseError(err.data, false);
                        }
                        else {
                            E.raiseError(err)
                        }
                        self._isSubmitted = false;
                        self.setState({
                            mode: 'error'
                        });
                    })
            }
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
