// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXOnboardingEmail extends React.Component {
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
        const { email } = this.state;

        const isValid = email;

        const sendClassName = ['xxOnboardingEmail-button', 'xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        return (
            <section className="xxOnboardingEmail">
                <h2 className="xxOnboardingEmail-title">Don’t want to wait? We’ll email you when your results are ready.</h2>
                <input
                    className="xxInputText"
                    type="text"
                    placeholder="example@email.com"
                    value={email}
                    onChange={e => updateField('email', e.target.value)}
                />
                <button
                    disabled={!isValid}
                    className={sendClassName.join(' ')}
                    type="button"
                    onClick={e => e.preventDefault()}
                >Submit</button>
            </section>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
