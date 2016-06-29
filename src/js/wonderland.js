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
import VideoPageOwner from './components/pages/VideoPageOwner';
import VideoPageGuest from './components/pages/VideoPageGuest';
import HomePage from './components/pages/HomePage';
import DashboardPage from './components/pages/DashboardPage';
import PendingAccountPage from './components/pages/PendingAccountPage';
import ConfirmAccountPage from './components/pages/ConfirmAccountPage';
import AccountConfirmedPage from './components/pages/AccountConfirmedPage';
import UserResetPage from './components/pages/UserResetPage';
import UserForgotPage from './components/pages/UserForgotPage';
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
import URLShortenerPage from './components/pages/URLShortenerPage';
import CookiesPage from './components/pages/CookiesPage';
import XXPage from './xx/XXPage';
import XXPageMobile from './xx/XXPageMobile';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const CONFIG = require('../../env/config.json');
window.CONFIG = CONFIG;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

render((
    <Router history={browserHistory}>

        {/* Routes should (where possible) use the DRY_NAV variable)
        and END in a trailing slash - EH */}

        <Redirect from={UTILS.DRY_NAV.HOME.URL} to={UTILS.DRY_NAV.SIGNIN.URL} />
        <Redirect from={UTILS.DRY_NAV.DASHBOARD.URL} to={UTILS.DRY_NAV.VIDEO_LIBRARY.URL} />

        <Route path={UTILS.DRY_NAV.HOME.URL} component={HomePage} />
        <Route path={UTILS.DRY_NAV.DASHBOARD.URL} component={DashboardPage} />

        <Route path={UTILS.DRY_NAV.SIGNUP.URL} component={SignUpPage} />
        <Route path={UTILS.DRY_NAV.SIGNIN.URL} component={SignInPage} />
        <Route path={UTILS.DRY_NAV.SIGNOUT.URL} component={SignOutPage} />

        <Route path={UTILS.DRY_NAV.ACCOUNT_CONFIRM.URL} component={ConfirmAccountPage} />
        <Route path={UTILS.DRY_NAV.ACCOUNT_PENDING.URL} component={PendingAccountPage} />
        <Route path={UTILS.DRY_NAV.ACCOUNT_CONFIRMED.URL} component={AccountConfirmedPage} />

        <Route path={UTILS.DRY_NAV.USER_FORGOT.URL} component={UserForgotPage} />
        <Route path={UTILS.DRY_NAV.USER_RESET.URL + 'token/:token/username/:username/'} component={UserResetPage} />

        <Route path={UTILS.DRY_NAV.VIDEO_ANALYZE.URL} component={AnalyzeVideoPage} />
        <Route path={UTILS.DRY_NAV.VIDEO_LIBRARY.URL} component={VideosPage} />
        <Route path="/video/:videoId/" component={VideoPageOwner} />

        <Route path="/share/video/:videoId/account/:accountId/token/:shareToken/" component={VideoPageGuest} />

        <Route path={UTILS.DRY_NAV.TERMS.URL} component={TermsPage} />
        <Route path={UTILS.DRY_NAV.BILLING.URL} component={BillingPage} />
        <Route path={UTILS.DRY_NAV.TELEMETRY.URL} component={TelemetryPage} />

        <Route path={UTILS.DRY_NAV.PLUGINS.URL} component={IntegrationsPage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_NEW.URL} component={NewIntegrationPage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE_WIZARD.URL} component={PluginsBrightcoveWizardPage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL} component={IntegrationsBrightcovePage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL + ':usesGallery'} component={IntegrationsBrightcovePage} />
        <Route path={UTILS.DRY_NAV.PLUGINS_BRIGHTCOVE.URL + ':usesGallery'} component={IntegrationsBrightcovePage} />
        <Route path="/integration/brightcove/:integrationId/" component={IntegrationsBrightcovePage} />
        <Route path={UTILS.DRY_NAV.SETTINGS_ACCOUNT.URL} component={AccountSettingsPage} />
        <Route path={UTILS.DRY_NAV.SETTINGS_USER.URL} component={UserSettingsPage} />
        <Route path={UTILS.DRY_NAV.SUPPORT.URL} component={SupportPage} />

        <Route path={UTILS.DRY_NAV.URL_SHORTENER.URL} component={URLShortenerPage} />
        <Route path={UTILS.DRY_NAV.COOKIES.URL} component={CookiesPage} />

        <Route path="/xx/" component={XXPage} />
        <Route path="/xx/mobile/" component={XXPageMobile} />

        <Route path="*" component={NotFoundPage} />

    </Router>
), document.querySelector('#wonderland'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
