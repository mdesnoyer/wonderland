// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Secured from '../../mixins/Secured';
import UserSettingsForm from '../forms/UserSettingsForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserSettingsPage = React.createClass({
    mixins: [Secured],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <main className="xxPage">
                <Helmet title={UTILS.buildPageTitle(T.get('copy.userSettings.title'))}/>
                <SiteHeader />
                <UserSettingsForm />
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserSettingsPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

