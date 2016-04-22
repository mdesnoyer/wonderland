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
            isBusy: false
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
            messageNeeded = self.state.isError === true ? <Message header="Sign Up Error" body={E.getErrors()} flavour="danger" />  : '',
            copyTerms = T.get('copy.agreeTerms', {'@link': '/terms/'}),
            legendElement = self.props.showLegend ? <legend className="title is-4">{T.get('copy.signUp.heading')}</legend> : ''
         ;
        if (!self.state.isAgreementChecked || self.state.isBusy) {
             buttonClassName = 'button is-medium is-primary is-disabled';
        }
        else {
             buttonClassName = 'button is-medium is-primary';
        }
        return (
            <form onSubmit={self.handleSubmit}>
                {messageNeeded}
                <fieldset>
                    {legendElement}
                    <p className="control is-grouped">
                        <input className="input is-medium" type="text" ref="firstName" placeholder={T.get('firstName')} />
                        <input className="input is-medium" type="text" ref="lastName" placeholder={T.get('lastName')} />
                    </p>
                    <p className="control">
                        <input className="input is-medium" type="email" ref="email" placeholder={T.get('email')} />
                    </p>
                    <p className="control is-grouped">
                        <input className="input is-medium"
                            type="password"
                           
                            ref="passwordInitial"
                            placeholder={T.get('password')}
                            onChange={self.handlePasswordInitialChange} 
                        />
                        <input className="input is-medium"
                            type="password"
                           
                            ref="passwordConfirm"
                            placeholder={T.get('confirm')}
                            onChange={self.handlePasswordConfirmChange} 
                        />
                    </p>
                    <p className="control">
                        <input className="input is-medium" type="text" ref="company" placeholder={T.get('company')} />
                    </p>
                    <p className="control">
                        <input className="input is-medium" type="text" ref="title" placeholder={T.get('title')} />
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
        this.setState({
            isAgreementChecked: !this.state.isAgreementChecked
        });
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
        TRACKING.sendEvent(self, arguments, self.refs.email.value.trim());
        self.setState({ 
            isBusy: true 
        });
        if (!E.checkForErrors(errorList)) {
                self.setState({
                    isError: true,
                    isBusy: false
                });
        }
        else {
            if (!self._isSubmitted) {
                self._isSubmitted = true;
                userDataObject = {
                    email: this.refs.email.value.trim(),
                    customer_name: this.refs.company.value.trim(),
                    admin_user_username: this.refs.email.value.trim(),
                    admin_user_password: this.refs.passwordInitial.value.trim(),
                    admin_user_first_name: this.refs.firstName.value.trim(),
                    admin_user_last_name: this.refs.lastName.value.trim(),
                    admin_user_title: this.refs.title.value.trim()
                };
                AJAX.doPost('accounts', {
                        host: CONFIG.AUTH_HOST,
                        data: userDataObject
                    })
                    .then(function (account) {
                        self._isSubmitted = false; 
                        self.setState({
                            isError: false,
                            isBusy: false
                        });
                        self.context.router.push('/account/pending/');
                    })
                    .catch(function (err) {
                        E.checkForError(T.get('copy.accountCreationTempError'), false)
                        self._isSubmitted = false;
                        self.setState({
                            isError: true,
                            isBusy: false
                        });
                });
            }
        }   
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
