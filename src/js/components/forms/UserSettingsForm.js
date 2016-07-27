// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Account from '../../mixins/Account';
import SESSION from '../../modules/session';
import T from '../../modules/translation';
import E from '../../modules/errors';
import AjaxMixin from '../../mixins/Ajax';
import TRACKING from '../../modules/tracking';
import UserSettingsInfo from '../wonderland/UserSettingsInfo';
import Message from '../wonderland/Message';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserSettingsForm = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    getInitialState: function() {
        var self = this;
        return {
            isLoading: true,
            username: '',
            firstName: '',
            lastName: '',
            title: '',
            mode: 'quiet', // quiet, error, loading, success
        }  
    },
    componentWillMount: function() {
        var self = this;
        SESSION.user()
            .then(function(userData) {
                self.setState({
                    username: userData.username,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                    title: userData.title
                })
            })
            .catch(function(err) {
                console.log(err);
            })
        ;
    },
    componentDidMount: function() {
        var self = this;
        self._isSubmitted = false;
    },
    componentWillUnmount: function() {
        E.clearErrors();
    },
    updateField: function(e) {
        var self = this;
        switch (e.target.getAttribute('data-ref')) {
            case 'firstName':
                self.setState({
                    firstName: e.target.value
                });
                break;
            case 'lastName':
                self.setState({
                    lastName: e.target.value
                });
                break;
            case 'title':
                self.setState({
                    title: e.target.value
                });
                break;
            default:
                break;
        }
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        TRACKING.sendEvent(self, arguments, self.state.username);
        if (!self._isSubmitted) {
            self._isSubmitted = true;
            self.setState({
                mode: 'loading'
            }, function() {
                var options = {
                        data: {
                            username: self.state.username,
                            first_name: self.state.firstName,
                            last_name: self.state.lastName,
                            title: self.state.title
                        }
                    }
                ;
                E.clearErrors();
                self.PUT('users', options)
                    .then(function(json) {
                        SESSION.user(json);
                        self.setState({
                            mode: 'success'
                        }, function() {
                            self._isSubmitted = false;
                        });
                    })
                    .catch(function(err) {
                        E.raiseError(err);
                        self.setState({
                            mode: 'error'
                        }, function() {
                            self._isSubmitted = false;
                        });
                    })
                ;
            });
        }
    },
    render: function() {
        var self = this,
            userMessage = null
        ;
        switch (self.state.mode) {
            case 'error':
                userMessage = <Message message={E.getErrors()} type="formError" />;
                break;
            case 'loading':
                userMessage = <Message message={T.get('copy.loading')} />;
                break;
            case 'success':
                userMessage = <div className="xxText"><p>{T.get('copy.contactUs.success')}</p></div>;
                break;
            default:
                break;
        }
        return (
            <fieldset className="xxMainForm">
                <form onSubmit={self.handleSubmit}>
                    <h2 className="xxTitle">{T.get('copy.userSettings.heading')}</h2>
                    {userMessage}
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.firstName')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            data-ref="firstName"
                            value={self.state.firstName}
                            minLength="1"
                            maxLength="256"
                            onChange={self.updateField}
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('label.lastName')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            data-ref="lastName"
                            value={self.state.lastName}
                            minLength="1"
                            maxLength="256"
                            onChange={self.updateField}
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">{T.get('title')}</label>
                        <input
                            className="xxInputText"
                            type="text"
                            data-ref="title"
                            value={self.state.title}
                            minLength="1"
                            maxLength="256"
                            onChange={self.updateField}
                        />
                    </div>
                    <div className="xxFormButtons">
                        <button
                            className="xxButton"
                            type="submit"
                        >
                            {T.get('save')}
                        </button>
                    </div>
                </form>
                <section className="xxSection">
                    <UserSettingsInfo />
                </section>
            </fieldset>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserSettingsForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
