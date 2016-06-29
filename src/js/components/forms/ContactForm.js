// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ContactForm = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            email: '',
            message: ''
        }
    },
    updateField: function(e) {
        var self = this;
        switch (e.target.getAttribute('data-ref')) {
            case 'name':
                self.setState({
                    name: e.target.value
                });
                break;
            case 'email':
                self.setState({
                    email: e.target.value
                });
                break;
            case 'message':
                self.setState({
                    message: e.target.value
                });
                break;
            default:
                break;
        }
    },
    handleSubmit: function(e) {
        e.preventDefault();
        console.log('submit');
    },
    render: function() {
        var self = this,
        	sendClassName = ['xxButton', 'xxButton--highlight'],
            isValid = (self.state.name && self.state.email && self.state.message) ? true : false
        ;
        if (isValid) {
            sendClassName.push('xxButton--important');
        }
        return (
            <form onSubmit={self.handleSubmit}>
                <fieldset>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.yourName')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            data-ref="name"
                            placeholder="John Doe"
                            onChange={self.updateField}
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.yourEmail')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            data-ref="email"
                            placeholder="example@email.com"
                            onChange={self.updateField}
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.message')}</label>
                        <textarea
                            className="xxTextArea"
                            type="text"
                            data-ref="message"
                            placeholder="This demo is fantastic. This could work for me!"
                            onChange={self.updateField}
                        ></textarea>
                    </div>
                    <div className="xxFormButtons">
                        <button className="xxButton" type="button" onClick={self.props.handleClose}>{T.get('back')}</button>
                        <button className={sendClassName.join(' ')} type="submit" disabled={!isValid}>{T.get('send')}</button>
                    </div>
                </fieldset>
            </form>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ContactForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -