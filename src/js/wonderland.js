// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory, Link } from 'react-router';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import App from './components/core/App';
import NotFound from './components/core/NotFound';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Video from './components/lookingglass/Video';
import Videos from './components/lookingglass/Videos';
import UploadForm from './components/lookingglass/UploadForm';
import SignUpForm from './components/lookingglass/SignUpForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

render((
    <Router history={ browserHistory }>
        <Redirect from='/' to='/signup/' />
        <Route path="/signup/" component={ SignUpForm } />
        <Route path="/upload/video/" component={ UploadForm } />
        <Route name="videos" path="/videos/" component= { Videos } />
        <Route path="/video/:videoId/" component= { Video } />
        <Route path="*" component={ NotFound } />
    </Router>
), document.querySelector('#wonderland'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
