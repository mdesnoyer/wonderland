// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var PendingAccountPage = React.createClass({
    render: function() {
        var body1 = T.get('copy.pendingAccount.body.1'),
            body2 = T.get('copy.pendingAccount.body.2'),
            body3 = T.get('copy.pendingAccount.body.3', {
                '@link': UTILS.CONTACT_EXTERNAL_URL
            })
        ;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.pendingAccount.title'))}
                />
                <SiteHeader />
                <section className="section columns is-desktop">
                    <div className="column is-half is-offset-quarter">
                        <h1 className="title is-2">{T.get('copy.pendingAccount.heading')}</h1>
                        <div className="content">
                            <p><span dangerouslySetInnerHTML={{__html: body1}} /></p>
                            <p><span dangerouslySetInnerHTML={{__html: body2}} /></p>
                            <p><span dangerouslySetInnerHTML={{__html: body3}} /></p>
                        </div>
                    </div>
                </section>
                <SiteFooter />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default PendingAccountPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
