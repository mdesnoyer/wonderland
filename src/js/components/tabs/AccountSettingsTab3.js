// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Account from '../../mixins/Account';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AccountSettingsTab3 = React.createClass({
    mixins: [Account], // ReactDebugMixin
    getInitialState: function () {
        return {
            isLoading: true,
            isError: false,
            created: '',
            updated: '',
            accountName: '',
            accountId: '',
            isServingEnabled: false,
            accountEmail: ''
        };
    },
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
        self.getAccount()
            .then(function (account) {
                if (self._isMounted) {
                    self.setState({
                        isLoading: false,
                        isError: false,
                        created: account.created,
                        updated: account.updated,
                        accountName: account.accountName,
                        accountId: account.accountId,
                        isServingEnabled: account.isServingEnabled,
                        accountEmail: account.accountEmail
                    });
                }
            })
            .catch(function (err) {
                E.raiseError(JSON.parse(err.responseText).error.message);
                if (self._isMounted) {
                    self.setState({
                        isLoading: false,
                        isError: true
                    });
                }
            });
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
    },
    render: function() {
        var self = this,
            created = self.state.created ? moment(self.state.created).format('D MMM YYYY') : '',
            updated = self.state.updated ? moment(self.state.updated).format('D MMM YYYY') : ''
        ;
        return (       
            <fieldset>
                <label className="label">Account Name</label>
                <p className={'control' + (self.state.isLoading ? ' is-loading is-disabled' : '')}>
                    <input className={'input'} type="text" value={self.state.accountName} disabled />
                </p>
                <label className="label">Account ID</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                      <input className={'input'} type="text" value={self.state.accountId} disabled />
                </p>
                <label className="label">Created</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={created} disabled />
                </p>
                <label className="label">Updated</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={updated} disabled />
                </p>
                <label className="label">Serving Enabled</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.state.isServingEnabled} disabled />
                </p>
                <label className="label">Account Email</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.state.accountEmail} disabled />
                </p>
            </fieldset>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsTab3;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
