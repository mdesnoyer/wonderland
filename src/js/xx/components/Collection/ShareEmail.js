// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXShareEmail extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            from: '',
            recipient: '',
            message: '',
        };
    }

    updateField(field, value) {
        this.setState({
            [field]: value,
        });
    }

    render() {
        const {
            updateField,
            props: { setActiveContent },
            state: { from, recipient, message }
        } = this;

        const isValid = from && recipient && message;

        const sendClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('is-active');
        }

        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">Email</h2>
                <div className="xxFormField">
                    <label
                        className="xxLabel"
                        htmlFor="xx-email-from"
                    >Your Email</label>
                    <input
                        className="xxInputText"
                        id="xx-email-from"
                        type="text"
                        placeholder="you@email.com"
                        value={from}
                        onChange={e => updateField('from', e.target.value)}
                    />
                </div>
                <div className="xxFormField">
                    <label
                        className="xxLabel"
                        htmlFor="xx-email-recipient"
                    >Send To</label>
                    <input
                        className="xxInputText"
                        id="xx-email-recipient"
                        type="text"
                        placeholder="recipient@email.com"
                        value={recipient}
                        onChange={e => updateField('recipient', e.target.value)}
                    />
                </div>
                <div className="xxFormField">
                    <label
                        className="xxLabel"
                        htmlFor="xx-email-message"
                    >Personal Message</label>
                    <textarea
                        className="xxTextArea"
                        id="xx-email-message"
                        placeholder="Testing out this new product from Neon. This could work for us."
                        value={message}
                        onChange={e => updateField('message', e.target.value)}
                    ></textarea>
                </div>
                <div className="xxCollectionAction-buttons">
                    <button
                        className="xxButton"
                        type="button"
                        onClick={e => setActiveContent('', e)}
                    >Back</button>
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
