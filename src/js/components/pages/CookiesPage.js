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

const accessTokenKey = 'at',
    accountIdKey ='actId',
    masqueradeAccountIdKey ='msqactId',
    refreshTokenKey = 'rt',
    rememberMeKey = 'rme',
    rememberedEmailKey = 'ru',
    userKey = 'user_info',
    viewShareKey = 'footprintCookieViewShare',
    analyzeVideoKey = 'footprintCookieAnalyzeVideo'
;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var CookiesPage = React.createClass({
    // mixins: [ReactDebugMixin],
    getInitialState: function() {
        var accessTokenCookie = cookie.load(accessTokenKey),
            accountIdCookie = cookie.load(accountIdKey),
            masqueradeAccountIdCookie = cookie.load(masqueradeAccountIdKey),
            refreshTokenCookie = cookie.load(refreshTokenKey),
            rememberMeCookie = cookie.load(rememberMeKey),
            rememberedEmailCookie = cookie.load(rememberedEmailKey),
            viewShareCookie = cookie.load(viewShareKey),
            analyzeVideoCookie = cookie.load(analyzeVideoKey)
        ;
        return {
            accessToken: (accessTokenCookie ? accessTokenCookie : 'False'),
            accountId: (accountIdCookie ? accountIdCookie : 'False'),
            masqueradeAccountId: (masqueradeAccountIdCookie ? masqueradeAccountIdCookie : 'False'),
            refreshToken: (refreshTokenCookie ? refreshTokenCookie : 'False'),
            rememberMe: (rememberMeCookie ? rememberMeCookie : 'False'),
            rememberedEmail: (rememberedEmailCookie ? rememberedEmailCookie : 'False'),
            viewShare: (viewShareCookie ? viewShareCookie : 'False'),
            analyzeVideo: (analyzeVideoCookie ? analyzeVideoCookie : 'False')
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
                                    <li>accessToken: {self.state.accessToken}</li>
                                    <li>accountId: {self.state.accountId}</li>
                                    <li>masqueradeAccountId: {self.state.masqueradeAccountId}</li>
                                    <li>refreshToken: {self.state.refreshToken}</li>
                                    <li>rememberMe: {self.state.rememberMe}</li>
                                    <li>rememberedEmail: {self.state.rememberedEmail}</li>
                                    <li>viewShare: {self.state.viewShare}</li>
                                    <li>analyzeVideo: {self.state.analyzeVideo}</li>
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
