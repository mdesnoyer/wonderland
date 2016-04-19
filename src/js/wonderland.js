// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Redirect, browserHistory} from 'react-router';
import 'babel-polyfill';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import UTILS from './modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Pages
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import SignOutPage from './components/pages/SignOutPage';
import NotFoundPage from './components/pages/NotFoundPage';
import AnalyzeVideoPage from './components/pages/AnalyzeVideoPage';
import VideosPage from './components/pages/VideosPage';
import VideoPage from './components/pages/VideoPage';
import HomePage from './components/pages/HomePage';
import DashboardPage from './components/pages/DashboardPage';
import PendingAccountPage from './components/pages/PendingAccountPage';
import ConfirmAccountPage from './components/pages/ConfirmAccountPage';
import AccountConfirmedPage from './components/pages/AccountConfirmedPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import TermsPage from './components/pages/TermsPage';
import IntegrationsPage from './components/pages/IntegrationsPage';
import IntegrationsNewPage from './components/pages/IntegrationsNewPage';
import IntegrationsBrightcovePage from './components/pages/IntegrationsBrightcovePage';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const CONFIG = require('json../../../env/config.json');
window.CONFIG = CONFIG;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

render((
    <Router history={browserHistory}>
        <Redirect from='/' to={UTILS.DRY_NAV.SIGNIN.URL} />
        <Redirect from={UTILS.DRY_NAV.DASHBOARD.URL} to='/videos/' />
        <Route path="/" component={HomePage} />
        <Route path={UTILS.DRY_NAV.SIGNUP.URL} component={SignUpPage} />
        <Route path="/account/confirm" component={ConfirmAccountPage} />
        <Route path="/account/pending/" component={PendingAccountPage} />
        <Route path="/account/confirmed/" component={AccountConfirmedPage} />
        <Route path="/account/forgot/" component={ForgotPasswordPage} />
        <Route path={UTILS.DRY_NAV.SIGNIN.URL} component={SignInPage} />
        { /*<Route path="/signin/force/" component={ForcePasswordChangePage} /> */}
        <Route path={UTILS.DRY_NAV.DASHBOARD.URL} component= {DashboardPage} />
        <Route path={UTILS.DRY_NAV.SIGNOUT.URL} component={SignOutPage} />
        <Route path="/analyze/video/" component={AnalyzeVideoPage} />
        <Route path="/videos/" component={VideosPage} />
        <Route path="/video/:videoId/" component= {VideoPage} />
        <Route path="/terms/" component= {TermsPage} />
        <Route path="/integrations/" component={IntegrationsPage} />
        <Route path="/integrations/new" component={IntegrationsNewPage} />
        <Route path="/integrations/brightcove" component={IntegrationsBrightcovePage} />
        <Route path="*" component={NotFoundPage} />
    </Router>
), document.querySelector('#wonderland'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
