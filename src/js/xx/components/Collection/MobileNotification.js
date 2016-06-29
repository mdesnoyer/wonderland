// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollectionMobileNotification extends React.Component {
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
        const isValid = this.state.email;

        const sendClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        return (
            <div className="xxCollectionMobileNotification">
                <h2 className="xxCollection-title">
                    Sorry! This experience is currently designed for a desktop
                    experience.
                </h2>
                <p className="xxCollectionMobileNotification-text">
                    Volutpat libero sapien, vel pellentesque ex porttitor eu.
                    Morbi semper pharetra dui, et volutpat mi varius eu.
                    Praesent auctor mi dui, ut vulputate enim.
                </p>
                <div className="xxFormField">
                    <label className="xxLabel">Your Email</label>
                    <input
                        className="xxInputText"
                        type="text"
                        placeholder="example@email.com"
                        value={this.state.email}
                        onChange={e => this.updateField('email', e.target.value)}
                    />
                </div>
                <div className="xxFormButtons">
                    <button
                        disabled={!isValid}
                        className={sendClassName.join(' ')}
                        type="button"
                    >Send</button>
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
