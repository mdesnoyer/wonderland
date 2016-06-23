// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXContactUs extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            name: '',
            email: '',
            message: '',
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
        const { name, email, message } = this.state;

        const isValid = name && email && message;

        const sendClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            sendClassName.push('xxButton--important');
        }

        return (
            <article className="xxPageOverlay-content">
                <h1 className="xxSubtitle">Contact Us</h1>
                <h2 className="xxTitle">Want to find out more?</h2>
                <div className="xxText">
                    <p>Get in touch with questions or comments. We’d love to hear from you!</p>
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
                    <label className="xxLabel">Message</label>
                    <textarea
                        className="xxTextArea"
                        placeholder="This demo is fantastic.
                            This could work for me!"
                        value={message}
                        onChange={e => updateField('message', e.target.value)}
                    ></textarea>
                </div>
                <div className="xxFormButtons">
                    <button
                        className="xxButton"
                        type="button"
                        onClick={() => onClose()}
                    >Back</button>
                    <button
                        disabled={!isValid}
                        className={sendClassName.join(' ')}
                        type="button"
                    >Send</button>
                </div>

                <section className="xxSection">
                    <h2 className="xxTitle">Our Location</h2>
                    <div className="xxText">
                        <p>
                            Neon Labs<br />
                            70 South Park Street<br />
                            San Francisco, CA 94107<br />
                            United States
                        </p>
                        {/*<div className="xxKeyValue">
                            <dl>
                                <dt>Email</dt>
                                <dd><a href="mailto:ask@neon-labs.com" className="u-inheritColor">ask@neon-labs.com</a></dd>
                            </dl>
                            <dl>
                                <dt>Phone</dt>
                                <dd>415-355-4249</dd>
                            </dl>
                        </div>*/}
                    </div>
                </section>
            </article>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
