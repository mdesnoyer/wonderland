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

    handleSubmit(e) {
        console.log('here');
        e.preventDefault();
    }

    render() {
        var self = this;

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
                <form onSubmit={self.handleSubmit}>
                    <fieldset>
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
                                type="submit"
                            >{T.get('send')}</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
