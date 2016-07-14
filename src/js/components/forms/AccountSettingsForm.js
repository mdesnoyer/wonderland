// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import WonderTabs from '../core/WonderTabs';
import AccountSettingsTab1 from '../tabs/AccountSettingsTab1';
import AccountSettingsTab2 from '../tabs/AccountSettingsTab2';
import AccountSettingsTab3 from '../tabs/AccountSettingsTab3';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AccountSettingsForm = React.createClass({
    render: function() {
        var self = this,
            tabs = [
                {
                    label: 'Basic',
                    body: <AccountSettingsTab1 />
                },
                {
                    label: 'IDs',
                    body: <AccountSettingsTab2 />
                },
                {
                    label: 'Account',
                    body: <AccountSettingsTab3 />
                }
            ]
        ;
        return (
            <WonderTabs tabs={tabs} />
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
