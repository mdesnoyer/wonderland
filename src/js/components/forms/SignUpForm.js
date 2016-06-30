import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import TRACKING from '../../modules/tracking';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignUpForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    getInitialState: function() {
        return {
            name: '',
            email: '',
            password: '',
            verifyPassword: '',
            mode: 'quiet' // quiet, loading, error, success
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
            case 'name':
                self.setState({
                    name: e.target.value
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
            isValid = self.state.name && self.state.email && self.state.password && self.state.verifyPassword && (self.state.password === self.state.verifyPassword),
            submitClassName = ['xxButton', 'xxButton--highlight'],
            userMessage = null
        ;
        if (isValid) {
            submitClassName.push('xxButton--important');
        }
        switch (self.state.mode) {
            case 'error':
                userMessage = <div className="has-error"><p className="xxLabel">{E.getErrors()}</p></div>;
                break;
            case 'loading':
                userMessage = <div className="xxLabel"><p>{T.get('copy.loading')}</p></div>;
                break;
            case 'success':
                userMessage = <div className="xxLabel"><p>TODO: Sign Up Success</p></div>;
                break;
            default:
                break;
        }
        return (
            <form onSubmit={self.handleSubmit}>
                {userMessage}
                <fieldset>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.yourName')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            data-ref="name"
                            minLength="1"
                            maxLength="256"
                            onChange={self.updateField}
                            required
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
                    <div>{terms}</div>
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
            </form>
        );
    },
    handleSubmit: function (e) {
        var self = this,
            userDataObject = {},
            errorList = [
                {message: T.get('error.passwordFormatInvalid'), check: UTILS.isValidPassword(self.state.password)},
                {message: T.get('error.passwordMatchInvalid'), check: UTILS.isPasswordConfirm(self.state)}
            ]
        ;
        e.preventDefault();
        self.setState({
            mode: 'loading'
        }, function() {
            if (!E.checkForErrors(errorList)) {
                self.setState({
                    mode: 'error'
                });
            }
            else {
                if (!self._isSubmitted) {
                    self._isSubmitted = true;
                    TRACKING.sendEvent(self, arguments, self.state.email.trim());
                    userDataObject = {
                        email: self.state.email.trim(),
                        admin_user_username: self.state.email.trim(),
                        admin_user_password: self.state.password.trim(),
                        admin_user_first_name: self.state.name.trim(), // full name, is this an issue?
                    };
                    // // Only add the last name if it exists #1194
                    // if (self.refs.lastName.value.trim()) {
                    //     userDataObject['admin_user_last_name'] = self.refs.lastName.value.trim();
                    // }
                    self.POST('accounts', {
                            host: CONFIG.AUTH_HOST,
                            data: userDataObject
                        })
                        .then(function (account) {
                            self._isSubmitted = false;
                            self.setState({
                                mode: 'success'
                            });
                            // self.context.router.push(UTILS.DRY_NAV.ACCOUNT_PENDING.URL);
                            // probably some sort of message instead?
                        })
                        .catch(function (err) {
                            E.raiseError(err);
                            self._isSubmitted = false;
                            self.setState({
                                mode: 'error'
                            });
                    });
                }
            }
        });

    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
