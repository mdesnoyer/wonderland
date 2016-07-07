// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXForgotPassword extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            email: '',
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
        const { email } = this.state;

        const isValid = email;

        const sendClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        return (
            <div className="xxPageOverlay-content">
                <h1 className="xxSubtitle">Forgot Password</h1>
                <h2 className="xxTitle">Forgot Your Password?</h2>
                <div className="xxText">
                    <p>
                        Enter the email address associated with your account below,
                        and if your email address is in our system we’ll email you
                        a link to change your password. If you don’t see an email
                        from us within a few minutes, please check your spam
                        folder.
                    </p>
                </div>
                <div className="xxFormField">
                    <label className="xxLabel">Your Email</label>
                    <input
                        className="xxInputText"
                        type="text"
                        placeholder="example@email.com"
                        value={email}
                        onChange={e => updateField('email', e.target.value)}
                    />
                </div>
                <div className="xxFormButtons">
                    <button
                        className="xxButton"
                        type="button"
                        onClick={() => onClose('login')}
                    >Back</button>
                    <button
                        disabled={!isValid}
                        className={sendClassName.join(' ')}
                        type="button"
                        onClick={isValid ? (() => onClose('changepassword')) : null}
                    >Email Me</button>
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
