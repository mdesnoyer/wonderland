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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SupportPage = React.createClass({
    render: function() {
        var self = this,
            tabs = [
                {
                    label: 'Neon Pro Guide',
                    body: <SupportTab1 />
                },
                // {
                //     label: 'Brightcove Plugin Guide',
                //     body: <SupportTab2 />
                // },
                {
                    label: 'Neon Enterprise Guide',
                    body: <SupportTab3 />
                },
                {
                    label: 'API Docs',
                    body: <SupportTab4 />
                }
            ]
        ;
        return (
            <main className="xxPage">
                <Helmet title={UTILS.buildPageTitle(T.get('copy.support.title'))} />
                <SiteHeader />
                <h1 className="xxTitle">{T.get('copy.support.heading')}</h1>
                <WonderTabs tabs={tabs} />
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SupportPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
