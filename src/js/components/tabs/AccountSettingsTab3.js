// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Account from '../../mixins/Account';
import moment from 'moment';
import T from '../../modules/translation';

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
                <label className="label">{T.get('label.accountName')}</label>
                <p className={'control' + (self.state.isLoading ? ' is-loading is-disabled' : '')}>
                    <input className={'input'} type="text" value={self.state.accountName} disabled />
                </p>
                <label className="label">{T.get('label.accountId')}</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                      <input className={'input'} type="text" value={self.state.accountId} disabled />
                </p>
                <label className="label">{T.get('label.created')}</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={created} disabled />
                </p>
                <label className="label">{T.get('label.updated')}</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={updated} disabled />
                </p>
                <label className="label">{T.get('label.servingEnabled')}</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.state.isServingEnabled} disabled />
                </p>
                <label className="label">{T.get('label.accountEmail')}</label>
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
