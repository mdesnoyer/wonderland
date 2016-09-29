// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';
import moment from 'moment';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AccountSettingsTab3 = React.createClass({
    mixins: [Account, AjaxMixin],
    getInitialState: function () {
        return {
            isLoading: true,
            isError: false,
            created: '',
            updated: '',
            accountName: '',
            accountId: '',
            accountEmail: ''
        };
    },
    componentDidMount: function() {
        var self = this;
        self.getAccount()
            .then(function (account) {
                self.setState({
                    isLoading: false,
                    isError: false,
                    created: account.created,
                    updated: account.updated,
                    accountName: account.accountName,
                    accountId: account.accountId,
                    accountEmail: account.accountEmail
                });
            })
            .catch(function (err) {
                E.raiseError(err);
                self.setState({
                    isLoading: false,
                    isError: true
                });
            })
        ;
    },
    render: function() {
        var self = this,
            created = self.state.created ? moment(self.state.created).format('D MMM YYYY') : '',
            updated = self.state.updated ? moment(self.state.updated).format('D MMM YYYY') : ''
        ;
        return (       
            <fieldset>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.accountName')}</label>
                    <input className={'xxInputText'} type="text" value={self.state.accountName} disabled />
                </div>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.accountId')}</label>
                    <input className={'xxInputText'} type="text" value={self.state.accountId} disabled />
                </div>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.created')}</label>
                    <input className={'xxInputText'} type="text" value={created} disabled />
                </div>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.updated')}</label>
                    <input className={'xxInputText'} type="text" value={updated} disabled />
                </div>
                <div className="xxFormField">
                    <label className="xxLabel">{T.get('label.accountEmail')}</label>
                    <input className={'xxInputText'} type="text" value={self.state.accountEmail} disabled />
                </div>
            </fieldset>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsTab3;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
