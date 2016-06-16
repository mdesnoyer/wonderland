// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SESSION from '../../modules/session';
import E from '../../modules/errors';
import AjaxMixin from '../../mixins/Ajax';
import Message from '../wonderland/Message';
import SaveButton from '../buttons/SaveButton';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserSettingsTab2 = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    getInitialState: function() {
        var self = this;
        return {
            isLoading: true,
            username: '',
            firstName: '',
            lastName: '',
            title: ''
        }  
    },
    componentWillMount: function() {
        var self = this;
        SESSION.user()
            .then(function(userData) {
                self.setState({
                    isLoading: false,
                    username: userData.username,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                    title: userData.title
                })
            })
            .catch(function(err) {
                self.setState({
                    isLoading: false
                })
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
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        TRACKING.sendEvent(self, arguments, self.state.username);
        if (!self._isSubmitted) {
            self._isSubmitted = true;
            self.setState({
                isLoading: true
            }, self.doSubmit);
        }
    },
    doSubmit: function() {
        var self = this,
            options = {
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
                    isLoading: false
                }, function() {
                    self._isSubmitted = false;
                });
            })
            .catch(function(err) {
                E.raiseError(err);
                self.setState({
                    isLoading: false
                }, function() {
                    self._isSubmitted = false;
                });
            })
        ;
    },
    handleChangeFirstName(e) {
        var self = this;
        self.setState({
            firstName: e.target.value
        })
    },
    handleChangeLastName(e) {
        var self = this;
        self.setState({
            lastName: e.target.value
        })
    },
    handleChangeTitle(e) {
        var self = this;
        self.setState({
            title: e.target.value
        })
    },
    render: function() {
        var self = this,
            messageNeededComponent = E.getErrorsCount() ? <Message header={'User Settings'} body={E.getErrors()} flavour="danger" /> : false
        ;
        return (
            <form onSubmit={self.handleSubmit}>
                <fieldset>
                    <label className="label">{T.get('label.firstName')}</label>
                    <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                        <input
                            ref="firstName"
                            className={'input'}
                            type="text"
                            value={self.state.firstName}
                            disabled={self.state.isLoading ? 'disabled' : ''}
                            onChange={self.handleChangeFirstName}
                        />
                    </p>
                    <label className="label">{T.get('label.lastName')}</label>
                    <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                        <input
                            ref="lastName"
                            className={'input'}
                            type="text"
                            value={self.state.lastName}
                            disabled={self.state.isLoading ? 'disabled' : ''}
                            onChange={self.handleChangeLastName}
                        />
                    </p>
                    <label className="label">{T.get('label.title')}</label>
                    <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                        <input
                            ref="title"
                            className={'input'}
                            type="text"
                            value={self.state.title}
                            disabled={self.state.isLoading ? 'disabled' : ''}
                            onChange={self.handleChangeTitle}
                        />
                    </p>
                    <p className="has-text-centered">
                        <SaveButton
                            isLoading={self.state.isLoading}
                        />
                    </p>
                </fieldset>
            </form>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserSettingsTab2;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
