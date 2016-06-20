// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXSignUp extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            name: '',
            email: '',
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
        const { name, email, password, passwordVerify } = this.state;

        const isValid = name && email && password && passwordVerify;

        const sendClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        return (
            <div className="xxPageOverlay-content">
                <h1 className="xxSubtitle">Sign Up</h1>
                <h2 className="xxTitle">Let’s get started!</h2>
                <div className="xxText">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus interdum nec tellus sed congue. Fusce volutpat.</p>
                </div>
                <div className="xxFormField">
                    <label className="xxLabel">Your Name</label>
                    <input
                        className="xxInputText"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={e => updateField('name', e.target.value)}
                    />
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
                <div className="xxFormField">
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
                        className="xxButton"
                        type="button"
                        onClick={() => onClose('')}
                    >Back</button>
                    <button
                        disabled={!isValid}
                        className={sendClassName.join(' ')}
                        type="button"
                        onClick={isValid ? (() => onClose('has-account')) : null}
                    >Sign Up</button>
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
