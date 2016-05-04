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
    render: function() {
        var self = this,
            tabs = [
                {
                    label: 'User',
                    body: <UserSettingsTab1 />
                },
                {
                    label: 'Personal',
                    body: <UserSettingsTab2 />
                }
            ]
        ;
        return (
            <WonderTabs tabs={tabs} />
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UserSettingsForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
