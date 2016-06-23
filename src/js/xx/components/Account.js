// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXAccount extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            passwordCurrent: '',
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
        const { passwordCurrent, password, passwordVerify } = this.state;

        const isValid = passwordCurrent && password && passwordVerify;

        const sendClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        return (
            <article className="xxPageOverlay-content">
                <h1 className="xxSubtitle">Account</h1>
                <h2 className="xxTitle">Hi, Peter</h2>
                <div className="xxText">
                    <p>
                        Enjoying your Neon Demo, but want to analyze more content more quickly? <a href="" className="u-secondaryAnchor">Get More!</a>
                    </p>
                </div>
                <button
                    className="xxButton"
                    type="button"
                    onClick={() => onClose('')}
                >Log Out</button>

                <section className="xxSection">
                    <div className="xxFormField">
                        <label className="xxLabel">Current Password</label>
                        <input
                            className="xxInputText"
                            type="password"
                            placeholder="••••••••••"
                            value={passwordCurrent}
                            onChange={e => updateField('passwordCurrent', e.target.value)}
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">New Password</label>
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
                            disabled={!isValid}
                            className={sendClassName.join(' ')}
                            type="button"
                            onClick={isValid ? (() => onClose('has-account')) : null}
                        >Change</button>

                    <a
                        href=""
                        className="xxFormButtons-anchor u-inheritColor"
                        onClick={e => {e.preventDefault(); onClose('');}}
                    >Deactivate Account</a>
                    </div>
                </section>
            </article>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
