// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Helmet from 'react-helmet';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import cookie from 'react-cookie';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var CookiesPage = React.createClass({
    // mixins: [ReactDebugMixin],
    getInitialState: function() {
        return {
            accessToken: cookie.load(UTILS.COOKIES_KEY.accessTokenKey) || 'None',
            accountId: cookie.load(UTILS.COOKIES_KEY.accountIdKey) || 'None',
            masqueradeAccountId: cookie.load(UTILS.COOKIES_KEY.masqueradeAccountIdKey) || 'None',
            refreshToken: cookie.load(UTILS.COOKIES_KEY.refreshTokenKey) || 'None',
            rememberMe: cookie.load(UTILS.COOKIES_KEY.rememberMeKey) || 'None',
            rememberedEmail: cookie.load(UTILS.COOKIES_KEY.rememberedEmailKey) || 'None',
            viewShare: cookie.load(UTILS.COOKIES_KEY.viewShareKey) || 'None',
            analyzeVideo: cookie.load(UTILS.COOKIES_KEY.analyzeVideoKey) || 'None'
        };
    },
    render: function() {
        var self = this;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.cookies.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-one-quarter">
                            <h1 className="title is-2">{T.get('copy.cookies.heading')}</h1>
                            <div className="content">
                                <p>{T.get('copy.cookies.body')}</p>
                                {
                                    Object.keys(self.state).map(function(key) {
                                        return (
                                            <dl>
                                                <dt>{key}:</dt>
                                                <dd>{self.state[key]}</dd>
                                            </dl>
                                        );
                                    })
                                }
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

export default CookiesPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
