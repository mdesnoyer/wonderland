// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Account from '../../mixins/Account';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AccountSettingsTab2 = React.createClass({
    mixins: [Account], // ReactDebugMixin
    getInitialState: function () {
        return {
            isLoading: true,
            isError: false
        };
    },
    componentDidMount: function() {
        var self = this;
        self.getAccount()
            .then(function (account) {
                self.setState({
                    isLoading: false,
                    isError: false,
                    trackerAccountId: account.trackerAccountId,
                    stagingTrackerAccountId: account.stagingTrackerAccountId
                });
            })
            .catch(function (err) {
                E.raiseError(JSON.parse(err.responseText).error.message);
                self.setState({
                    isLoading: false,
                    isError: true
                });
            });
    },
    render: function() {
        var self = this;
        return (
            <fieldset>
                <label className="label">Tracker Account ID</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.state.trackerAccountId} disabled />
                </p>
                <label className="label">Staging Tracker Account ID</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.state.stagingTrackerAccountId} disabled />
                </p>
            </fieldset>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsTab2;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
