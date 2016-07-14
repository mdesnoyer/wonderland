// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import WonderTabs from '../core/WonderTabs';
import SupportTab1 from '../tabs/SupportTab1';
import SupportTab2 from '../tabs/SupportTab2';
import SupportTab3 from '../tabs/SupportTab3';
import SupportTab4 from '../tabs/SupportTab4';
import SupportTab5 from '../tabs/SupportTab5';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportPage = React.createClass({
    render: function() {
        var self = this,
            tabs = [
                {
                    label: 'Overview',
                    body: <SupportTab1 />
                },
                {
                    label: 'Brightcove Plugin Guide',
                    body: <SupportTab2 />
                },
                {
                    label: 'Custom Plugin Guide',
                    body: <SupportTab3 />
                },
                {
                    label: 'API',
                    body: <SupportTab4 />
                },
                {
                    label: 'Contact Support',
                    body: <SupportTab5 />
                }
            ]
        ;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.support.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="container">
                        <h1>{T.get('copy.support.heading')}</h1>
                        <WonderTabs tabs={tabs} />
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
