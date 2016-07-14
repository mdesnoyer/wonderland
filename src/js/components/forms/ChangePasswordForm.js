// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import E from '../../modules/errors';
import TRACKING from '../../modules/tracking';
import Message from '../wonderland/Message';


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ChangePasswordForm = React.createClass({
    mixins: [AjaxMixin],
    getInitialState: function() {
        return {
            mode: 'quiet', // quiet, error, loading, success
            email: ''
        }
    },
    updateField: function(e) {
        var self = this;
        self.setState({
            email: e.target.value.trim()
        });
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        TRACKING.sendEvent(self, arguments, self.state.email);
        self.setState({
            mode: 'loading'
        }, function() {
            self.POST('users/forgot_password', {
                host: CONFIG.AUTH_HOST,
                data: {
                    username: self.state.email
                }
            })
            .then(function(json) {
                self.setState({
                    mode: 'success'
                });
            })
            .catch(function(err) {
                switch (err.code) {
                    case 400:
                    case 404:
                        // We ignore the 404, we don't want to alert that the
                        // account doesn't exist
                        console.log(err);
                        self.setState({
                            mode: 'success'
                        });
                        break;
                    default:
                        console.log(err);
                        E.raiseError(err);
                        self.setState({
                            mode: 'error'
                        });
                        break;
                }
            });
        });
    },
    render: function() {
        var self = this,
        	sendClassName = ['xxButton', 'xxButton--highlight'],
            isValid = (self.state.email && (self.state.mode !== 'loading')),
            userMessage = null
        ;
        if (isValid) {
            sendClassName.push('xxButton--important');
        }
        switch (self.state.mode) {
            case 'error':
                userMessage = <Message message={E.getErrors()} type="formError"/>;
                break;
            case 'loading':
                userMessage = <Message messsage={T.get('copy.loading')} />;
                break;
            case 'success':
                userMessage = <Message message={T.get('copy.userForgot.success')} />;
                break;
            default:
                break;
        }
        return (
            <form onSubmit={self.handleSubmit}>
                <div className="xxText">
                    <p>{T.get('copy.account.changePassword')}</p>
                </div>
                {userMessage} 
                <fieldset>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.yourEmail')}</label>
                        <input
                            className="xxInputText"
                            type="email"
                            data-ref="email"
                            minLength="6"
                            maxLength="1024"
                            onChange={self.updateField}
                            required
                        />
                    </div>
                    <div className="xxFormButtons">
                        <button 
                            className={sendClassName.join(' ')} 
                            type="submit" 
                            disabled={!isValid}
                        >
                            {T.get('label.emailMe')}
                        </button>
                    </div>
                </fieldset>
            </form>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ChangePasswordForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -