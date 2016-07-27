// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var PasswordBrothers = React.createClass({
    propTypes: {
        handlePasswordInitialChange: React.PropTypes.func,
        handlePasswordConfirmChange: React.PropTypes.func,
    },
    getInitialState: function() {
        return {
            passwordInitial: '',
            passwordConfirm: ''
        }
    },
    handlePasswordInitialChange: function(e) {
        var self = this;
        self.props.handlePasswordInitialChange(e);
        self.setState({
            passwordInitial: e.target.value
        });
    },
    handlePasswordConfirmChange: function(e) {
        var self = this;
        self.props.handlePasswordConfirmChange(e);
        self.setState({
            passwordConfirm: e.target.value
        });
    },
    render: function() {
        var self = this,
            verifyClassName = ['xxFormField']
        ;
        if (self.state.passwordInitial && self.state.passwordInitial !== self.state.passwordConfirm) {
            verifyClassName.push('has-error');
        }
        return (
            <div>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.newPassword')}</label>
                    <input
                        className="xxInputText"
                        type="password"
                        data-ref="passwordInitial"
                        minLength="8"
                        maxLength="64"
                        onChange={self.handlePasswordInitialChange}
                        autoComplete="off"
                        required
                     />
                </div>
                <div className={verifyClassName.join(' ')}>
                    {
                        self.state.passwordInitial && self.state.passwordInitial !== self.state.passwordConfirm ? (
                            <strong className="xxFormError">{T.get('error.passwordMatchInvalid')}</strong>
                        ) : null
                    }
                    <label className="xxLabel">{T.get('copy.passwordVerify')}</label>
                    <input
                        className="xxInputText"
                        type="password"
                        data-ref="passwordConfirm"
                        minLength="8"
                        maxLength="64"
                        onChange={self.handlePasswordConfirmChange}
                        autoComplete="off"
                        required
                     />
                </div>
            </div>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default PasswordBrothers

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -