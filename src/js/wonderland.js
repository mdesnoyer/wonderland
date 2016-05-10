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
import PluginsPage from './components/pages/PluginsPage';
import NewPluginPage from './components/pages/NewPluginPage';
import PluginsBrightcovePage from './components/pages/PluginsBrightcovePage';
import AccountSettingsPage from './components/pages/AccountSettingsPage';
import UserSettingsPage from './components/pages/UserSettingsPage';
import BillingPage from './components/pages/BillingPage';
import TelemetryPage from './components/pages/TelemetryPage';
import ApiPage from './components/pages/ApiPage';
import NeonscopePage from './components/pages/NeonscopePage';
import SupportPage from './components/pages/SupportPage';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const CONFIG = require('json../../../env/config.json');
window.CONFIG = CONFIG;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

render((
    <Router history={browserHistory}>
        {/* Routes should (where possible) use the DRY_NAV variable)
        and END in a trailing slash */}
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
        <Route path={UTILS.DRY_NAV.DASHBOARD.URL} component={DashboardPage} />
        <Route path={UTILS.DRY_NAV.SIGNOUT.URL} component={SignOutPage} />
        <Route path="/analyze/video/" component={AnalyzeVideoPage} />
        <Route path="/videos/" component={VideosPage} />
        <Route path="/video/:videoId/" component={VideoPage} />
        <Route path="/terms/" component={TermsPage} />
        <Route path={UTILS.DRY_NAV.BILLING.URL} component={BillingPage} />
        <Route path={UTILS.DRY_NAV.TELEMETRY.URL} component={TelemetryPage} />
        <Route path={UTILS.DRY_NAV.API.URL} component={ApiPage} />
        <Route path={UTILS.DRY_NAV.NEONSCOPE.URL} component={NeonscopePage} />
        <Route path={UTILS.DRY_NAV.INTEGRATIONS.URL} component={PluginsPage} />
        <Route path={UTILS.DRY_NAV.INTEGRATIONS_NEW.URL} component={NewPluginPage} />
        <Route path={UTILS.DRY_NAV.INTEGRATIONS_BRIGHTCOVE.URL} component={PluginsBrightcovePage} />
        <Route path={UTILS.DRY_NAV.ACCOUNTSETTINGS.URL} component={AccountSettingsPage} />
        <Route path={UTILS.DRY_NAV.USERSETTINGS.URL} component={UserSettingsPage} />
        <Route path={UTILS.DRY_NAV.SUPPORT.URL} component={SupportPage} />
        <Route path="*" component={NotFoundPage} />
    </Router>
), document.querySelector('#wonderland'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
