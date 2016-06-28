import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import TRACKING from '../../modules/tracking';
import AjaxMixin from '../../mixins/Ajax';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignUpForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
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
            password: '',
            confirm: '',
            isError: false,
            isAgreementChecked: false,
            isLoading: false
        }
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.active()) {
            self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
        }
    },
    componentWillUnmount: function(e) {
        E.clearErrors();
    },
    componentDidMount: function() {
        var self = this;
        self._isSubmitted = false;
    },
    render: function() {
        var self = this,
            buttonClassName,
            messageNeededComponent = self.state.isError === true ? <Message header="Sign Up Error" body={E.getErrors()} flavour="danger" /> : false,
            copyTerms = T.get('copy.agreeTerms', {'@link': UTILS.DRY_NAV.TERMS.URL}),
            legendElement = self.props.showLegend ? <legend className="title is-4">{T.get('copy.signUp.heading')}</legend> : false
         ;
        if (!self.state.isAgreementChecked) {
             buttonClassName = 'button is-medium is-primary is-disabled';
        }
        else if (self.state.isLoading) {
            buttonClassName = 'button is-medium is-primary is-disabled is-loading';
        }
        else {
             buttonClassName = 'button is-medium is-primary';
        }
        return (
            <form onSubmit={self.handleSubmit}>
                {messageNeededComponent}
                <fieldset>
                    {legendElement}
                    <p className="control">
                        <input className="input is-medium" type="email" ref="email" required minLength="6" maxLength="1024" placeholder={T.get('email')} />
                    </p>
                    <p className="control is-grouped">
                        <input className="input is-medium"
                            type="password"
                            ref="passwordInitial"
                            required
                            minLength="8"
                            maxLength="64"
                            placeholder={T.get('copy.passwordInitial')}
                            onChange={self.handlePasswordInitialChange}
                        />
                        <input className="input is-medium"
                            type="password"
                            ref="passwordConfirm"
                            required
                            minLength="8"
                            maxLength="64"
                            placeholder={T.get('copy.passwordConfirm')}
                            onChange={self.handlePasswordConfirmChange}
                        />
                    </p>
                    <p className="control is-grouped">
                        <input
                            className="input is-medium"
                            type="text" ref="firstName"
                            required
                            minLength="1"
                            maxLength="256"
                            placeholder={T.get('firstName')}
                        />
                        <input
                            className="input is-medium"
                            type="text"
                            ref="lastName"
                            minLength="1"
                            maxLength="256"
                            placeholder={T.get('lastName')}
                        />
                    </p>
                    <p className="control">
                        <label className="checkbox">
                            <input className="wonderland-checkbox--checkbox" type="checkbox" required onChange={self.handleAgreementChange} checked={self.state.isAgreementChecked} />
                            <span dangerouslySetInnerHTML={{__html: copyTerms}} />
                        </label>
                    </p>
                    <p className="has-text-centered">
                        <button className={buttonClassName} type="submit">{T.get('signUp')}</button>
                    </p>
                </fieldset>
            </form>
        );
    },
    handlePasswordInitialChange: function (event) {
        this.setState({
            password: event.target.value
        });
    },
    handlePasswordConfirmChange: function (event) {
        this.setState({
            confirm: event.target.value
        });
    },
    handleAgreementChange: function(e) {
        var self = this;
        self.setState({
            isAgreementChecked: !self.state.isAgreementChecked
        });
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
        TRACKING.sendEvent(self, arguments, self.refs.email.value.trim());
        self.setState({
            isError: false,
            isLoading: true
        });
        if (!E.checkForErrors(errorList)) {
            self.setState({
                isError: true,
                isLoading: false
            });
        }
        else {
            if (!self._isSubmitted) {
                self._isSubmitted = true;
                userDataObject = {
                    email: self.refs.email.value.trim(),
                    admin_user_username: self.refs.email.value.trim(),
                    admin_user_password: self.refs.passwordInitial.value.trim(),
                    admin_user_first_name: self.refs.firstName.value.trim(),
                };
                // Only add the last name if it exists #1194
                if (self.refs.lastName.value.trim()) {
                    userDataObject['admin_user_last_name'] = self.refs.lastName.value.trim();
                }
                self.POST('accounts', {
                        host: CONFIG.AUTH_HOST,
                        data: userDataObject
                    })
                    .then(function (account) {
                        self._isSubmitted = false;
                        self.setState({
                            isError: false,
                            isLoading: false
                        });
                        self.context.router.push(UTILS.DRY_NAV.ACCOUNT_PENDING.URL);
                    })
                    .catch(function (err) {
                        E.raiseError(err);
                        self._isSubmitted = false;
                        self.setState({
                            isError: true,
                            isLoading: false
                        });
                });
            }
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
