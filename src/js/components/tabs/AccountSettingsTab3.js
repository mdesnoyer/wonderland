// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AccountSettingsTab3 = React.createClass({
    propTypes: {
        isLoading: React.PropTypes.bool.isRequired,
        accountName: React.PropTypes.string,
        created: React.PropTypes.string.isRequired,
        updated: React.PropTypes.string.isRequired,
        isServingEnabled: React.PropTypes.bool.isRequired,
        accountEmail: React.PropTypes.string.isRequired,
        accountId: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this,
            created = self.props.created ? moment(self.props.created).format('D MMM YYYY') : '',
            updated = self.props.updated ? moment(self.props.updated).format('D MMM YYYY') : ''
        ;
        return (       
            <fieldset>
                <label className="label">Account Name</label>
                <p className={'control' + (self.props.isLoading ? ' is-loading is-disabled' : '')}>
                    <input className={'input'} type="text" value={self.props.accountName} disabled />
                </p>
                <label className="label">Account ID</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                      <input className={'input'} type="text" value={self.props.accountId} disabled />
                </p>
                <label className="label">Created</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={created} disabled />
                </p>
                <label className="label">Updated</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={updated} disabled />
                </p>
                <label className="label">Serving Enabled</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.props.isServingEnabled} disabled />
                </p>
                <label className="label">Account Email</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.props.accountEmail} disabled />
                </p>
            </fieldset>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsTab3;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
