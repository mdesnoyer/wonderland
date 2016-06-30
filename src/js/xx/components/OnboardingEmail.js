// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXOnboardingEmail extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            email: '',
            isSubmitted: false,
        };
    }

    updateField(field, value) {
        this.setState({
            [field]: value,
        });
    }

    render() {
        const { updateField } = this;
        const { email, isSubmitted } = this.state;

        const isValid = email;

        const isNotSubmitted = !isSubmitted;

        const sendClassName = ['xxOnboardingEmail-button', 'xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        return (
            <section className="xxOnboardingEmail">
                <ReactCSSTransitionGroup transitionName="fadeInOutFast" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {
                        isNotSubmitted ? (
                            <div key="onboarding-email-form">
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
                                    onClick={e => {e.preventDefault(); this.setState({ isSubmitted: true });}}
                                >Submit</button>
                            </div>
                        ) : (
                            <div className="xxOnboardingEmail-success" key="onboarding-email-success">
                                Thanks! We’ll be in touch…
                            </div>
                        )
                    }
                </ReactCSSTransitionGroup>
            </section>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
