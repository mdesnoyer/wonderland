// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Secured from '../../mixins/Secured';
import UserSettingsForm from '../forms/UserSettingsForm';
import UserSettingsInfo from '../wonderland/UserSettingsInfo';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UserSettingsPage = React.createClass({
    mixins: [Secured],
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    render: function() {
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.userSettings.title'))}
                />
                <SiteHeader />
                <section className="xxFormPage">
                    <h1 className="xxTitle">{T.get('copy.userSettings.heading')}</h1>
                    <UserSettingsForm />
                    <section className="xxSection">
                        <UserSettingsInfo />
                    </section>
                </section>
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UserSettingsPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

