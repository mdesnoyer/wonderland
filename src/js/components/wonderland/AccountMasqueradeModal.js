// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SESSION from '../../modules/session';
import AjaxMixin from '../../mixins/Ajax';
import Account from '../../mixins/Account';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AccountMasqueradeModal = React.createClass({
    mixins: [AjaxMixin, Account],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        return {
            mode: 'silent' // silent/loading/error
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var self = this;
        self.setState({
            mode: 'loading'
        }, function() {
            var newAccountId = self.refs.accountId.value.trim();
            SESSION.setAccountId(newAccountId);
            self.getAccount(false) // DO NOT retry
                .then(function(account) {
                    SESSION.user()
                        .then(function(sessionUserData) {
                            self.GET('users', {
                                data: {
                                    username: sessionUserData.username
                                }
                            })
                                .then(function(serverUserData) {
                                    if (UTILS.hasAccessLevel(serverUserData.access_level, UTILS.ACCESS_LEVEL.GLOBAL_ADMIN)) {
                                        SESSION.setMasqueradeAccountId(newAccountId);
                                        self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
                                    }
                                    else {
                                        console.log(err);
                                        self.setState({
                                            mode: 'error'
                                        });                                        
                                    }
                                    
                                })
                                .catch(function(err) {
                                    console.log(err);
                                    self.setState({
                                        mode: 'error'
                                    });
                                })
                            ;
                        })
                        .catch(function (err) {
                            console.log(err);
                            self.setState({
                                mode: 'error'
                            });
                        })
                    ;
                })
                .catch(function(err) {
                    console.log(err);
                    self.setState({
                        mode: 'error'
                    });
                })
            ;
        });
    },
    render: function() {
        var self = this,
            inputClass = '',
            errorClass = '',
            controlClass = '',
            buttonClass = '',
            disabledAttr = '',
            labelClass = ''
        ;
        // silent/loading/error
        switch (self.state.mode) {
            case 'error':
                inputClass = 'input is-danger';
                errorClass = 'help is-danger';
                controlClass = 'control';
                buttonClass = 'button is-medium is-primary';
                disabledAttr = '';
                labelClass = 'label';
                break;
            case 'silent':
                inputClass = 'input';
                errorClass = 'help is-danger is-hidden';
                controlClass = 'control';
                buttonClass = 'button is-medium is-primary';
                disabledAttr = '';
                labelClass = 'label';
                break;
            case 'loading':
                inputClass = 'input';
                errorClass = 'help is-danger is-hidden';
                controlClass = 'control is-loading';
                buttonClass = 'button is-medium is-primary is-loading';
                disabledAttr = 'disabled';
                labelClass = 'label is-disabled';
                break;
        }
        return (
            <div className="box">
                <form onSubmit={self.handleSubmit}>
                    <p>We detected that you logged in to an Account which does not have an Account Id. Please set one below:</p>
                    <label className={labelClass}>{T.get('accountId')}</label>
                    <p className={controlClass}>
                        <input
                            disabled={disabledAttr}
                            required
                            ref="accountId"
                            className={inputClass}
                            type="text"
                            placeholder={T.get('accountId')}
                            defaultValue=""
                        />
                        <small className={errorClass}>{T.get('error.invalidAccountId')}</small>
                    </p>
                    <p className="has-text-centered">
                        <button className={buttonClass} type="submit" disabled={disabledAttr}>
                            <Icon type="universal-access" />
                            {T.get('action.set')}
                        </button>
                    </p>
                </form>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountMasqueradeModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
