// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory, Link } from 'react-router';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import App from './components/core/App';
import NotFound from './components/core/NotFound';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Video from './components/lookingglass/Video';
import UploadForm from './components/lookingglass/UploadForm';
import SignUpForm from './components/lookingglass/SignUpForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Login
// Logout

render((
	<Router history={ browserHistory }>
		<Redirect from='/' to='/signup/' />
		<Route path="/signup/" component={ SignUpForm } />
		<Route path="/upload/" component={ UploadForm } />
		<Route path="/video/:videoId/" component= { Video } />
		<Route path="*" component={ NotFound } />
	</Router>
), document.querySelector('#wonderland'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
