// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            password: '',
            passwordVerify: '',
        };
    }

    updateField(field, value) {
        this.setState({
            [field]: value,
        });
    }

    render() {
        const { updateField } = this;
        const { onClose } = this.props;
        const { password, passwordVerify } = this.state;

        const isValid = password && passwordVerify;

        const sendClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        const passwordClassName = ['xxFormField'];
        if (password && password.length < 8) {
            passwordClassName.push('has-error');
        }

        const verifyPasswordClassName = ['xxFormField'];
        if (passwordVerify && password !== passwordVerify) {
            verifyPasswordClassName.push('has-error');
        }

        return (
            <div className="xxPageOverlay-content">
                <h1 className="xxSubtitle">Change Password</h1>
                <h2 className="xxTitle">Change Your Password</h2>
                <div className={passwordClassName.join(' ')}>
                    {
                        password && password.length < 8 ? (
                            <strong className="xxFormError">
                                Minimum 8 characters.
                            </strong>
                        ) : null
                    }
                    <label className="xxLabel">New Password</label>
                    <input
                        className="xxInputText"
                        type="password"
                        placeholder="••••••••••"
                        value={password}
                        onChange={e => updateField('password', e.target.value)}
                    />
                </div>
                <div className={verifyPasswordClassName.join(' ')}>
                    {
                        passwordVerify && password !== passwordVerify ? (
                            <strong className="xxFormError">
                                Passwords do not match.
                            </strong>
                        ) : null
                    }
                    <label className="xxLabel">Verify Password</label>
                    <input
                        className="xxInputText"
                        type="password"
                        placeholder="••••••••••"
                        value={passwordVerify}
                        onChange={e => updateField('passwordVerify', e.target.value)}
                    />
                </div>
                <div className="xxFormButtons">
                    <button
                        disabled={!isValid}
                        className={sendClassName.join(' ')}
                        type="button"
                        onClick={isValid ? (() => onClose('')) : null}
                    >Update</button>
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
