// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import Helmet from 'react-helmet';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var NotFoundPage = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        var body1 = T.get('copy.notFound.body.1'),
            body2 = T.get('copy.notFound.body.2',{
                '@link': UTILS.CORP_EXTERNAL_URL
            }),
            body3 = T.get('copy.notFound.body.3')
        ;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.notFound.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-one-quarter">
                            <h1 className="title is-2">{T.get('copy.notFound.heading')}</h1>
                            <div className="content">
                                <p><span dangerouslySetInnerHTML={{__html: body1}} /></p>
                                <p><span dangerouslySetInnerHTML={{__html: body2}} /></p>
                                <p><span dangerouslySetInnerHTML={{__html: body3}} /></p>
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

export default NotFoundPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

