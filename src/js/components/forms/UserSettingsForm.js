// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Account from '../../mixins/Account';
import WonderTabs from '../core/WonderTabs';
import UserSettingsTab1 from '../tabs/UserSettingsTab1';
import UserSettingsTab2 from '../tabs/UserSettingsTab2';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UserSettingsForm = React.createClass({
    // mixins: [ReactDebugMixin],
    getInitialState: function() {
        var self = this;
        return {
            isLoading: true,
            username: '',
            accessLevel: -1,
            created: '',
            updated: '',
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
                    accessLevel: userData.access_level,
                    created: userData.created,
                    updated: userData.updated,
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
    render: function() {
        var self = this,
            tabs = {
                'User': <UserSettingsTab1
                    isLoading={self.state.isLoading}
                    username={self.state.username}
                    accessLevel={self.state.accessLevel}
                    created={self.state.created}
                    updated={self.state.updated}
                />,
                'Personal': <UserSettingsTab2
                    isLoading={self.state.isLoading}
                    username={self.state.username}
                    firstName={self.state.firstName}
                    lastName={self.state.lastName}
                    title={self.state.title}
                />
            }
        ;
        return (
            <WonderTabs tabs={tabs} />
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UserSettingsForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
