// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Account from '../../mixins/Account';
import E from '../../modules/errors';
import AjaxMixin from '../../mixins/Ajax';
import Message from '../wonderland/Message';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AccountSettingsTab1 = React.createClass({
    mixins: [Account, AjaxMixin],
    getInitialState: function () {
        return {
            isLoading: true,
            isError: false,
            defaultWidth: 0,
            defaultHeight: 0
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
                E.raiseError(err);
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
        SESSION.user()
            .then(function(userData) {
                TRACKING.sendEvent(self, arguments, userData.username);
            })
            .catch(function(err) {
                console.error(err);
            })
        ;
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
                E.raiseError(err);
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
            messageNeededComponent = E.getErrorsCount() ? <Message header={'Account Settings'} body={E.getErrors()} flavour="danger" /> : false
        ;
        return (
            <form onSubmit={self.handleSubmit}>
                <fieldset>
                    {messageNeededComponent}
                    <div className="xxFormField">
                        <label className="xxLabel">Width</label>
                        <input
                            className={'xxInputText'}
                            type="number"
                            step="1"
                            min="1"
                            max="8192"
                            value={self.state.defaultWidth}
                            disabled={self.state.isLoading ? 'disabled' : ''}
                            onChange={self.handleChangeDefaultWidth}
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">Height</label>
                        <input
                            className={'xxInputText'}
                            type="number"
                            step="1"
                            min="1"
                            max="8192"
                            value={self.state.defaultHeight}
                            disabled={self.state.isLoading ? 'disabled' : ''}
                            onChange={self.handleChangeDefaultHeight}
                        />
                    </div>
                    <div className="xxFormField">
                        <button
                            className="xxButton"
                            type="submit"
                        >
                            {T.get('save')}
                        </button>
                    </div>
                </fieldset>
            </form>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsTab1;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
