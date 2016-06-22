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
        return {
            accessToken: (cookie.load(accessTokenKey) ? cookie.load(accessTokenKey) : 'False'),
            accountId: (cookie.load(accountIdKey) ? cookie.load(accountIdKey) : 'False'),
            masqueradeAccountId: (cookie.load(masqueradeAccountIdKey) ? cookie.load(masqueradeAccountIdKey) : 'False'),
            refreshToken: (cookie.load(refreshTokenKey) ? cookie.load(refreshTokenKey) : 'False'),
            rememberMe: (cookie.load(rememberMeKey) ? cookie.load(rememberMeKey) : 'False'),
            rememberedEmail: (cookie.load(rememberedEmailKey) ? cookie.load(rememberedEmailKey) : 'False'),
            viewShare: (cookie.load(viewShareKey) ? 'True' : 'False'),
            analyzeVideo: (cookie.load(analyzeVideoKey) ? 'True' : 'False')
        };
    },
    render: function() {
        var self = this;
        return (
            <div>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.cookie.title'))}
                />
                <SiteHeader />
                <section className="wonderland-section section">
                    <div className="columns is-desktop">
                        <div className="column is-half is-offset-one-quarter">
                            <h1 className="title is-2">{T.get('copy.cookie.heading')}</h1>
                            <div className="content">
                                <p>{T.get('copy.cookie.body')}</p>
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
