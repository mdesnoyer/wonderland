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
import UserResetPasswordPage from './components/pages/UserResetPasswordPage';
import UserForgotPasswordPage from './components/pages/UserForgotPasswordPage';
import TermsPage from './components/pages/TermsPage';
import IntegrationsPage from './components/pages/IntegrationsPage';
import NewIntegrationPage from './components/pages/NewIntegrationPage';
import IntegrationsBrightcovePage from './components/pages/IntegrationsBrightcovePage';
import PluginsBrightcoveWizardPage from './components/pages/PluginsBrightcoveWizardPage';
import AccountSettingsPage from './components/pages/AccountSettingsPage';
import UserSettingsPage from './components/pages/UserSettingsPage';
import BillingPage from './components/pages/BillingPage';
import TelemetryPage from './components/pages/TelemetryPage';
import SupportPage from './components/pages/SupportPage';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const CONFIG = require('json../../../env/config.json');
window.CONFIG = CONFIG;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

render((
    <Router history={browserHistory}>

        {/* Routes should (where possible) use the DRY_NAV variable)
        and END in a trailing slash - EH */}

        <Redirect from='/' to={UTILS.DRY_NAV.SIGNIN.URL} />
        <Redirect from={UTILS.DRY_NAV.DASHBOARD.URL} to='/videos/' />

        <Route path={UTILS.DRY_NAV.HOME.URL} component={HomePage} />
        <Route path={UTILS.DRY_NAV.DASHBOARD.URL} component={DashboardPage} />

        <Route path={UTILS.DRY_NAV.SIGNUP.URL} component={SignUpPage} />
        <Route path={UTILS.DRY_NAV.SIGNIN.URL} component={SignInPage} />
        <Route path={UTILS.DRY_NAV.SIGNOUT.URL} component={SignOutPage} />

        <Route path="/account/confirm" component={ConfirmAccountPage} />
        <Route path="/account/pending/" component={PendingAccountPage} />
        <Route path="/account/confirmed/" component={AccountConfirmedPage} />

        <Route path="/user/forgot/" component={UserForgotPasswordPage} />
        <Route path="/user/reset/token/:token/username/:username/" component={UserResetPasswordPage} />

        <Route path="/video/analyze/" component={AnalyzeVideoPage} />
        <Route path="/videos/" component={VideosPage} />
        <Route path="/video/:videoId/" component={VideoPage} />

        <Route path={UTILS.DRY_NAV.TERMS.URL} component={TermsPage} />

        <Route path={UTILS.DRY_NAV.BILLING.URL} component={BillingPage} />
        <Route path={UTILS.DRY_NAV.TELEMETRY.URL} component={TelemetryPage} />
        <Route path={UTILS.DRY_NAV.SUPPORT.URL} component={SupportPage} />

        <Route path={UTILS.DRY_NAV.PLUGINS.URL} component={IntegrationsPage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_NEW.URL} component={NewIntegrationPage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE_WIZARD.URL} component={PluginsBrightcoveWizardPage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL} component={IntegrationsBrightcovePage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL + ':usesGallery'} component={IntegrationsBrightcovePage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL + ':usesGallery'} component={IntegrationsBrightcovePage} />
        <Route path="/integration/brightcove/:integrationId/" component={IntegrationsBrightcovePage} />
        <Route path={UTILS.DRY_NAV.ACCOUNT_SETTINGS.URL} component={AccountSettingsPage} />
        <Route path={UTILS.DRY_NAV.USER_SETTINGS.URL} component={UserSettingsPage} />
        <Route path={UTILS.DRY_NAV.SUPPORT.URL} component={SupportPage} />

        <Route path="*" component={NotFoundPage} />

    </Router>
), document.querySelector('#wonderland'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
