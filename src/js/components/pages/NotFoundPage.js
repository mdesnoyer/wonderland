// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var NotFoundPage = React.createClass({
    render: function() {
        var self = this,
            body1 = T.get('copy.notFound.body.1'),
            body2 = T.get('copy.notFound.body.2',{
                '@link': UTILS.CORP_EXTERNAL_URL
            })
        ;
        debugger 
        return (
            <main className="xxPage">
                <Helmet title={UTILS.buildPageTitle(T.get('copy.notFound.title'))} />
                <SiteHeader />
                <section className="xxMainForm">
                    <h1 className="xxTitle">{T.get('copy.notFound.heading')}</h1>
                    <div className="xxText">
                        <p><span dangerouslySetInnerHTML={{__html: body1}} /></p>
                        <p><span dangerouslySetInnerHTML={{__html: body2}} /></p>
                    </div>
                </section>
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default NotFoundPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

