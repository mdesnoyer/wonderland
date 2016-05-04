// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Account from '../../mixins/Account';
import E from '../../modules/errors';
import AJAX from '../../mixins/ajax';
import Message from '../wonderland/Message';
import SaveButton from '../buttons/SaveButton';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AccountSettingsTab1 = React.createClass({
    mixins: [Account, AJAX], // ReactDebugMixin
    getInitialState: function () {
        return {
            isLoading: true,
            isError: false,
            defaultThumbnailId: null,
            defaultWidth: null,
            defaultHeight: null
        };
    },
    componentWillMount: function() {
        var self = this;
        self._isSubmitted = false;
        self.getAccount()
            .then(function (account) {
                self.setState({
                    isLoading: false,
                    isError: false,
                    defaultThumbnailId: account.defaultThumbnailId,
                    defaultWidth: account.defaultWidth,
                    defaultHeight: account.defaultHeight
                });
            })
            .catch(function (err) {
                E.raiseError(JSON.parse(err.responseText).error.message);
                if (self._isMounted) {
                    self.setState({
                        isLoading: false,
                        isError: true
                    }, function() {
                        self._isSubmitted = false;
                    });
                }
            });
    },
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
        E.clearErrors();
    },
    handleSubmit: function(e) {
        var self = this;
        e.preventDefault();
        if (!self._isSubmitted) {
            self._isSubmitted = true; 
            if (self._isMounted) {
                self.setState({
                    isLoading: true
                }, self.doSubmit);
            }
        }
    },
    doSubmit: function() {
        var self = this;
        E.clearErrors();
        self.updateAccount(self.state)
            .then(function(json) {
                if (self._isMounted) {
                    self.setState({
                        isLoading: false
                    }, function() {
                        self._isSubmitted = false;
                    });
                }
            })
            .catch(function(err) {
                E.raiseError(JSON.parse(err.responseText).error.message);
                if (self._isMounted) {
                    self.setState({
                        isLoading: false
                    }, function() {
                        self._isSubmitted = false;
                    });
                }
            })
        ;
    },
    handleChangeDefaultThumbnailId(e) {
        var self = this;
        self.setState({
            defaultThumbnailId: e.target.value
        })
    },
    handleChangeDefaultWidth(e) {
        var self = this;
        self.setState({
            defaultWidth: e.target.value
        })
    },
    handleChangeDefaultHeight(e) {
        var self = this;
        self.setState({
            defaultHeight: e.target.value
        })
    },
    render: function() {
        var self = this,
            messageNeeded = E.getErrorsCount() ? <Message header={'Account Settings'} body={E.getErrors()} flavour="danger" /> : ''
        ;
        return (
            <form onSubmit={self.handleSubmit}>
                <fieldset>
                    {messageNeeded}
                    <label className="label">Default Thumbnail ID</label>
                    <p className={'control' + (self.state.isLoading ? ' is-loading is-disabled' : '')}>
                        <input
                            ref="defaultThumbnailId"
                            className={'input'}
                            type="text"
                            minLength="1"
                            maxLength="2048"
                            value={self.state.defaultThumbnailId}
                            disabled={self.state.isLoading ? 'disabled' : ''}
                            onChange={self.handleChangeDefaultThumbnailId}
                        />
                    </p>
                    <label className="label">Default Size (width x height)</label>
                    <p className={'control is-grouped' + (self.state.isLoading ? ' is-loading is-disabled' : '')}>
                        <input
                            className={'input'}
                            type="number"
                            step="1"
                            min="1"
                            max="8192"
                            value={self.state.defaultWidth}
                            disabled={self.state.isLoading ? 'disabled' : ''}
                            onChange={self.handleChangeDefaultWidth}
                        />
                        <input
                            className={'input'}
                            type="number"
                            step="1"
                            min="1"
                            max="8192"
                            value={self.state.defaultHeight}
                            disabled={self.state.isLoading ? 'disabled' : ''}
                            onChange={self.handleChangeDefaultHeight}
                        />
                    </p>
                    <p className="has-text-centered">
                        <SaveButton isLoading={self.state.isLoading} />
                    </p>
                </fieldset>
            </form>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default AccountSettingsTab1;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
