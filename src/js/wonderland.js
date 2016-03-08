// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import App from './components/core/App';
import NotFound from './components/core/NotFound';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Job from './components/lookingglass/Job';
import UploadForm from './components/lookingglass/UploadForm';
import SignUpForm from './components/lookingglass/SignUpForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Login
// Logout

render((
	<Router history={ browserHistory }>
		<Route path="/signup/" component={ SignUpForm } />
		<Route path="/signup" component={ SignUpForm } />
		<Route path="/upload/" component={ UploadForm } />
		<Route path="/upload" component={ UploadForm } />
		<Route path="/job/:jobId" component= { Job } />
		<Route path="/job/:jobId/" component= { Job } />
		<Route path="/" component={ App } />
		<Route path="*" component={ NotFound } />
	</Router>
), document.querySelector('#wonderland'));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
