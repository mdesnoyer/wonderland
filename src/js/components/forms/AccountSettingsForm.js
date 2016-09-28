// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AccountSettingsTab1 from '../tabs/AccountSettingsTab1';
import AccountSettingsTab2 from '../tabs/AccountSettingsTab2';
import AccountSettingsTab3 from '../tabs/AccountSettingsTab3';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const AccountSettingsForm = React.createClass({
    render: function() {
        const self = this;
        return (
            <div className="xxMainForm --short">
                <section className="xxSection">
                    <h2 className="xxTitle">Basic</h2>
                    <AccountSettingsTab1 />
                </section>
                <section className="xxSection">
                    <h2 className="xxTitle">IDs</h2>
                    <AccountSettingsTab2 />
                </section>
                <section className="xxSection">
                    <h2 className="xxTitle">Account</h2>
                    <AccountSettingsTab3 />
                </section>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
