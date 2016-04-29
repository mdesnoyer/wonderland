// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Account from '../../mixins/Account';
import WonderTabs from '../core/WonderTabs';
import AccountSettingsTab1 from '../tabs/AccountSettingsTab1';
import AccountSettingsTab2 from '../tabs/AccountSettingsTab2';
import AccountSettingsTab3 from '../tabs/AccountSettingsTab3';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AccountSettingsForm = React.createClass({
    mixins: [Account],
    render: function() {
        var self = this,
            tabs = [
                {
                    label: 'Basic',
                    body: <AccountSettingsTab1
                            isLoading={self.state.isLoading}
                            defaultThumbnailId={self.state.defaultThumbnailId}
                            defaultWidth={self.state.defaultWidth}
                            defaultHeight={self.state.defaultHeight}
                        />
                },
                {
                    label: 'Tracker',
                    body: <AccountSettingsTab2
                            isLoading={self.state.isLoading}
                            trackerAccountId={self.state.trackerAccountId}
                            stagingTrackerAccountId={self.state.stagingTrackerAccountId}
                        />
                },
                {
                    label: 'Account',
                    body: <AccountSettingsTab3
                            isLoading={self.state.isLoading}
                            accountName={self.state.accountName}
                            created={self.state.created}
                            updated={self.state.updated}
                            isServingEnabled={self.state.isServingEnabled}
                            accountEmail={self.state.accountEmail}
                            accountId={self.state.accountId}
                        />
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
