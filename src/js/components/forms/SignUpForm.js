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
            isError: false,
            isAgreementChecked: false
        }
    },
    render: function() {
        var self = this,
            buttonClassName,
            messageNeeded = self.state.isError === true ? <Message header="Sign Up Error" body={E.getErrors()} flavour="danger" />  : '',
            copyTerms = T.get('copy.agreeTerms', {'@link': '/terms/'})
         ;
        if (!self.state.isAgreementChecked) {
             buttonClassName = 'button is-medium is-primary is-disabled';
        }
        else {
             buttonClassName = 'button is-medium is-primary';
        }
        return (
            <form onSubmit={self.handleSubmit}>
                {messageNeeded}
                <fieldset>
                    <legend className="subtitle is-5">{T.get('copy.signUp.heading')}</legend>
                    {/* <p className="control is-grouped">
                        <input className="input is-medium" type="text" ref="firstName" placeholder={T.get('firstName')} />
                        <input className={input is-medium} type="text" ref="lastName" placeholder={T.get('lastName')} />
                    </p> */}
                    <p className="control">
                        <input className="input is-medium" type="text" ref="company" placeholder={T.get('company')} />
                    </p>
                    <p className="control is-grouped">
                        <input className="input is-medium" required type="email" ref="email" placeholder={T.get('email')} />
                    </p>
                    <p className="control is-grouped">
                        <input
                            className="input is-medium"
                            type="password"
                            required
                            ref="passwordInitial"
                            placeholder={T.get('password')}
                            onChange={self.handlePasswordInitialChange}
                        />
                        <input
                            className="input is-medium"
                            type="password"
                            required
                            ref="passwordConfirm"
                            placeholder={T.get('confirm')}
                            onChange={self.handlePasswordConfirmChange}
                        />
                    </p>
                    {/* <p className="control">
                        <input className="input is-medium" type="text" ref="title" placeholder={T.get('title')} />
                    </p> */}
                    <p className="control">
                        <label className="checkbox is-medium">
                            <input type="checkbox" required onChange={self.handleAgreementChange} checked={self.state.isAgreementChecked} />
                            <span dangerouslySetInnerHTML={{__html: copyTerms}} />
                        </label>
                    </p>
                    <p className="is-text-centered">
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
        if (!E.checkForErrors(errorList)) {
                self.setState({isError: true});
        }
        else {
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
                    self.context.router.push('/account/pending/');
                })
                .catch(function (err) {
                    E.checkForError(T.get('copy.accountCreationTempError'), false)
                    self.setState({isError: true});
                })
            ;
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignUpForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

