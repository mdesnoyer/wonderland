// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Redirect, browserHistory} from 'react-router';
import 'babel-polyfill';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import App from './components/core/App';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// Pages
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import SignOutPage from './components/pages/SignOutPage';
import NotFoundPage from './components/pages/NotFoundPage';
import UploadVideoPage from './components/pages/UploadVideoPage';
import VideosPage from './components/pages/VideosPage';
import VideoPage from './components/pages/VideoPage';
import HomePage from './components/pages/HomePage';
import DashboardPage from './components/pages/DashboardPage';
import ConfirmAccountPage from './components/pages/ConfirmAccountPage';
import AccountConfirmedPage from './components/pages/AccountConfirmedPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

render((
    <Router history={browserHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/signup/" component={SignUpPage} />
        <Route path="/confirm/" component={ConfirmAccountPage} />
        <Route path="/confirmed/" component={AccountConfirmedPage} />
        <Route path="/forgot/" component={ForgotPasswordPage} />
        <Route path="/signin/" component={SignInPage} />
        <Route path="/dashboard/" component= {DashboardPage} />
        <Route path="/signout/" component={SignOutPage} />
        <Route path="/upload/video/" component={UploadVideoPage} />
        <Route path="/videos/" component={VideosPage} />
        <Route path="/video/:videoId/" component= {VideoPage} />
        
        <Route path="*" component={NotFoundPage} />
    </Router>
), document.querySelector('#wonderland'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
