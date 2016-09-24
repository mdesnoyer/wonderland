// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import TRACKING from '../../modules/tracking';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import E from '../../modules/errors';
import Icon from '../core/Icon';
import {Link} from 'react-router';
import ModalParent from '../core/ModalParent';
import AccountMasqueradeModal from '../wonderland/AccountMasqueradeModal';
import { resetStores } from '../../stores/CollectionStores.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SignInForm = React.createClass({
    mixins: [AjaxMixin],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            isError: false,
            isLoading: false
        }
    },
    componentDidMount: function() {
        var self = this;
        self._isSubmitted = false;
    },
    componentWillUnmount: function() {
        E.clearErrors();
    },
    render: function() {
        var self = this,
            messageNeededComponent = self.state.isError ? <Message type="formError" message={E.getErrors()} /> : false
        ;
        return (
            <fieldset>
                <form onSubmit={self.handleSubmit}>
                    {messageNeededComponent}
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.yourEmail')}</label>
                            <input className="xxInputText"
                                name="email"
                                type="text"
                                required
                                ref="email"
                                minLength="6"
                                maxLength="1024"
                                placeholder={T.get('email')}
                            />
                        </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('copy.passwordInitial')}</label>
                        <input className="xxInputText"
                            name="password"
                            type="password"
                            required
                            ref="password"
                            minLength="8"
                            maxLength="64"
                            placeholder={T.get('copy.passwordPlaceholder')}
                        />
                    </div>
                    <div className="xxFormButtons">
                        <button
                            className="xxButton"
                            type="submit"
                        >
                            {T.get('action.signIn')}
                        </button>
                        <Link 
                            className="xxFormButtons-anchor u-inheritColor xxFormButtons-anchor--nobutton" 
                            to={UTILS.DRY_NAV.USER_FORGOT.URL}
                        >{T.get('nav.forgotUser')}
                        </Link>
                    </div>
                </form>
            </fieldset>
        );
    },
    handleSubmit: function (e) {
        var self = this;
        e.preventDefault();
        if (!self._isSubmitted) {
            self._isSubmitted = true;
            self.setState({
                isError: false,
                isLoading:true
            }, self.sendUserData());
        }
    },
    sendUserData: function() {
        var self = this,
            email = self.refs.email.value.trim(),
            password = self.refs.password.value.trim(),
            errorList = [
                {message: T.get('error.passwordFormatInvalid'), check: UTILS.isValidPassword(self.state.password)}
            ]
        ;
        // if (!E.checkForErrors(errorList)) {
        //placeholder for error handling later
        if (true) {
            TRACKING.sendEvent(self, arguments);
            self.POST('authenticate', {
                    host: CONFIG.AUTH_HOST,
                    data: {
                        username: email,
                        password: password
                    }
                })
                .then(function (res) {
                    SESSION.set(res.access_token, res.refresh_token, res.account_ids[0], res.user_info);
                    resetStores();
                    self._isSubmitted = false;
                    if (typeof(res.account_ids[0]) === 'undefined') {
                        self.setState({
                            isError: false,
                            isLoading: false
                        });
                    }
                    else {
                        self.setState({
                            isError: false,
                            isLoading: false
                        });
                        self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
                    }
                })
                .catch(function (err) {
                    E.checkForError(T.get('error.unableToSignIn'), false);
                    debugger
                    self._isSubmitted = false;
                    self.setState({
                        isError: true,
                        isLoading: false
                    });
                });
        }
        else {
            self.setState({
                isError: true,
                isLoading: false
            });
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SignInForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
