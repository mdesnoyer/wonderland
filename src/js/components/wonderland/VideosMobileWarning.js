import React from 'react';
import T from '../../modules/translation';

export default class VideosMobileWarning extends React.Component {
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
                    {T.get('copy.mobile.warning.title')}
                </h2>
                <p className="xxCollectionMobileNotification-text">
                    {T.get('copy.mobile.warning.description')}
                </p>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.yourEmail')}</label>
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
                    >{T.get('send')}</button>
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
