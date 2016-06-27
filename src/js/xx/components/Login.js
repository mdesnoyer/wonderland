// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXLogin extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            email: '',
            password: '',
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
        const { email, password } = this.state;

        const isValid = email && password;

        const sendClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        return (
            <div className="xxPageOverlay-content">
                <h1 className="xxSubtitle">Log In</h1>
                <h2 className="xxTitle">Analyze Your Video</h2>
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
                <div className="xxFormField">
                    <label className="xxLabel">Password</label>
                    <input
                        className="xxInputText"
                        type="password"
                        placeholder="••••••••••"
                        value={password}
                        onChange={e => updateField('password', e.target.value)}
                    />
                </div>
                <div className="xxFormButtons">
                    <button
                        disabled={!isValid}
                        className={sendClassName.join(' ')}
                        type="button"
                        onClick={isValid ? (() => onClose('')) : null}
                    >Log In</button>

                    <a
                        href=""
                        className="xxFormButtons-anchor u-inheritColor"
                        onClick={e => {e.preventDefault(); onClose('forgotpassword');}}
                    >Forgot password?</a>
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
