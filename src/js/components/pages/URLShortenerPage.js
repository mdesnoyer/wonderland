// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteHeader from '../wonderland/SiteHeader';
import URLShortenerForm from '../forms/URLShortenerForm';
import SiteFooter from '../wonderland/SiteFooter';
import Helmet from 'react-helmet';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var URLShortenerPage = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        return (
            <main className="xxPage">
                <Helmet title={UTILS.buildPageTitle(T.get('copy.urlShortener.title'))} />
                <SiteHeader />
                <section className="xxMainForm">
                    <h1 className="xxTitle">{T.get('copy.urlShortener.heading')}</h1>
                    <div className="xxText">
                        <p>{T.get('copy.urlShortener.body')}</p>
                    </div>
                    <URLShortenerForm />
                </section>
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default URLShortenerPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
