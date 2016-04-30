// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import E from '../../modules/errors';
import AJAX from '../../modules/ajax';
import Message from '../wonderland/Message';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UserSettingsTab1 = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        isLoading: React.PropTypes.bool.isRequired,
        username: React.PropTypes.string.isRequired,
        accessLevel: React.PropTypes.number
    },
    render: function() {
        var self = this,
            created = self.props.created ? moment(self.props.created).format('D MMM YYYY') : '',
            updated = self.props.updated ? moment(self.props.updated).format('D MMM YYYY') : ''
        ;
        return (
            <fieldset>
                <label className="label">Username</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.props.username} disabled />
                </p>
                <label className="label is-hidden">Access Level</label>
                <p className={'control is-hidden' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.props.accessLevel} disabled />
                </p>
                <label className="label">Created</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={created} disabled />
                </p>
                <label className="label">Updated</label>
                <p className={'control' + (self.props.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={updated} disabled />
                </p>
            </fieldset>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UserSettingsTab1;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
