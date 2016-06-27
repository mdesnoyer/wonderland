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
            accessToken: (cookie.load(UTILS.COOKIES_KEY.accessTokenKey) ? cookie.load(UTILS.COOKIES_KEY.accessTokenKey) : 'False'),
            accountId: (cookie.load(UTILS.COOKIES_KEY.accountIdKey) ? cookie.load(UTILS.COOKIES_KEY.accountIdKey) : 'False'),
            masqueradeAccountId: (cookie.load(UTILS.COOKIES_KEY.masqueradeAccountIdKey) ? cookie.load(UTILS.COOKIES_KEY.masqueradeAccountIdKey) : 'False'),
            refreshToken: (cookie.load(UTILS.COOKIES_KEY.refreshTokenKey) ? cookie.load(UTILS.COOKIES_KEY.refreshTokenKey) : 'False'),
            rememberMe: (cookie.load(UTILS.COOKIES_KEY.rememberMeKey) ? cookie.load(UTILS.COOKIES_KEY.rememberMeKey) : 'False'),
            rememberedEmail: (cookie.load(UTILS.COOKIES_KEY.rememberedEmailKey) ? cookie.load(UTILS.COOKIES_KEY.rememberedEmailKey) : 'False'),
            viewShare: (cookie.load(UTILS.COOKIES_KEY.viewShareKey) ? cookie.load(UTILS.COOKIES_KEY.viewShareKey) : 'False'),
            analyzeVideo: (cookie.load(UTILS.COOKIES_KEY.analyzeVideoKey) ? cookie.load(UTILS.COOKIES_KEY.analyzeVideoKey) : 'False')
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
                                <ul>
                                    {
                                        Object.keys(self.state).map(function(key) {
                                            return (
                                                <li key={key}>{key}: {self.state[key]}</li>
                                            );
                                        })
                                    }
                                </ul>
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
