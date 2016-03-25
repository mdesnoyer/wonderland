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
import UploadPage from './components/pages/UploadPage';
import VideosPage from './components/pages/VideosPage';
import VideoPage from './components/pages/VideoPage';
import HomePage from './components/pages/HomePage';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

render((
    <Router history={browserHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/signup/" component={SignUpPage} />
        <Route path="/signin/" component={SignInPage} />
        <Route path="/signout/" component={SignOutPage} />
        <Route path="/upload/video/" component={UploadPage} />
        <Route path="/videos/" component={VideosPage} />
        <Route path="/video/:videoId/" component= {VideoPage} />
        <Route path="*" component={NotFoundPage} />
    </Router>
), document.querySelector('#wonderland'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
