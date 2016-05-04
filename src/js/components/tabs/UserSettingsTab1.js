// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Message from '../wonderland/Message';
import SESSION from '../../modules/session';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UserSettingsTab1 = React.createClass({
    // mixins: [ReactDebugMixin],
    getInitialState: function() {
        var self = this;
        return {
            isLoading: true,
            username: '',
            accessLevel: -1,
            created: '',
            updated: '',
        }  
    },
    componentWillMount: function() {
        var self = this;
        SESSION.user()
            .then(function(userData) {
                self.setState({
                    isLoading: false,
                    username: userData.username,
                    accessLevel: userData.access_level,
                    created: userData.created,
                    updated: userData.updated
                })
            })
            .catch(function(err) {
                self.setState({
                    isLoading: false
                })
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
                <label className="label">Username</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.state.username} disabled />
                </p>
                <label className="label is-hidden">Access Level</label>
                <p className={'control is-hidden' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={self.state.accessLevel} disabled />
                </p>
                <label className="label">Created</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={created} disabled />
                </p>
                <label className="label">Updated</label>
                <p className={'control' + (self.state.isLoading ? ' is-disabled is-loading' : '')}>
                    <input className={'input'} type="text" value={updated} disabled />
                </p>
            </fieldset>
        )
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UserSettingsTab1;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
