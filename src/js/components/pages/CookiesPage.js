// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Helmet from 'react-helmet';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import cookie from 'react-cookie';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var CookiesPage = React.createClass({
    getInitialState: function() {
        return {
            accessToken: cookie.load(UTILS.COOKIES_KEY.accessTokenKey) || 'None',
            accountId: cookie.load(UTILS.COOKIES_KEY.accountIdKey) || 'None',
            masqueradeAccountId: cookie.load(UTILS.COOKIES_KEY.masqueradeAccountIdKey) || 'None',
            refreshToken: cookie.load(UTILS.COOKIES_KEY.refreshTokenKey) || 'None',
            rememberMe: cookie.load(UTILS.COOKIES_KEY.rememberMeKey) || 'None',
            rememberedEmail: cookie.load(UTILS.COOKIES_KEY.rememberedEmailKey) || 'None',
            viewShare: cookie.load(UTILS.COOKIES_KEY.viewShareKey) || 'None',
            analyzeVideo: cookie.load(UTILS.COOKIES_KEY.analyzeVideoKey) || 'None',
            userKey: cookie.load(UTILS.COOKIES_KEY.userKey).username || 'None'
        };
    },
    render: function() {
        var self = this;
        return (
            <main className="xxPage">
                <Helmet title={UTILS.buildPageTitle(T.get('copy.cookies.title'))} />
                <SiteHeader />
                <h1 className="xxTitle">{T.get('copy.cookies.heading')}</h1>
                <div className="xxText">
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
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CookiesPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
