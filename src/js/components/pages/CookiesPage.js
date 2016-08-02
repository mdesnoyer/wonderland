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
        var ss = window.sessionStorage;
        return {
            accessToken: ss.getItem(UTILS.COOKIES_KEY.accessTokenKey) || 'None',
            accountId: ss.getItem(UTILS.COOKIES_KEY.accountIdKey) || 'None',
            masqueradeAccountId: ss.getItem(UTILS.COOKIES_KEY.masqueradeAccountIdKey) || 'None',
            refreshToken: ss.getItem(UTILS.COOKIES_KEY.refreshTokenKey) || 'None',
            rememberMe: cookie.load(UTILS.COOKIES_KEY.rememberMeKey) || 'None',
            rememberedEmail: cookie.load(UTILS.COOKIES_KEY.rememberedEmailKey) || 'None',
            viewShare: ss.getItem(UTILS.COOKIES_KEY.viewShareKey) || 'None',
            analyzeVideo: ss.getItem(UTILS.COOKIES_KEY.analyzeVideoKey) || 'None',
            userKey: ss.getItem(UTILS.COOKIES_KEY.userKey) || 'None'
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
