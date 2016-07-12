// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Integrations from '../wonderland/Integrations';
import Secured from '../../mixins/Secured';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var IntegrationsPage = React.createClass({
    mixins: [Secured],
    render: function() {
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.plugins.title'))}
                />
                <SiteHeader />
                <h1 className="xxTitle">{T.get('copy.plugins.heading')}</h1>
                <Integrations pop={window.location.hash === '#pop'} />
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default IntegrationsPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
