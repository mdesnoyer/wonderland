// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import Secured from '../../mixins/Secured';
import AccountSettingsForm from '../forms/AccountSettingsForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AccountSettingsPage = React.createClass({
    mixins: [Secured], // ReactDebugMixin
    render: function() {
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.accountSettings.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="container">
                        <div className="columns is-desktop">
                            <div className="column is-half is-offset-one-quarter">
                                <h1 className="title is-2">{T.get('copy.accountSettings.title')}</h1>
                                <div className="is-hidden content">
                                    <p><span dangerouslySetInnerHTML={{__html: T.get('copy.accountSettings.body')}} /></p>
                                </div>
                                <AccountSettingsForm />
                            </div>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountSettingsPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

