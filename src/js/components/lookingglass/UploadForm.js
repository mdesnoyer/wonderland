// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import AJAX from '../../ajax';
import shortid from 'shortid';
import UTILS from '../../utils';
import TRACKING from '../../tracking';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UploadForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			accessToken: '',
			refreshToken: '',
			mode: 'silent' // silent/loading/error
		}
	},
	render: function() {
		var buttonClassName = 'button is-success is-' + this.state.mode;
		return (
			<section className="column is-half is-offset-quarter">
				<div className="container">
					<form onSubmit={ this.handleSubmit }>
						<fieldset>
							<p>Instructions</p>
							<legend className="title is-2">Upload Video</legend>
							<p className="control is-grouped">
								<input required className="input" type="url" ref="url" placeholder="Add Video URL" />
								<button className={ buttonClassName }>Upload</button>
							</p>
						</fieldset>
					</form>
					<p>I agree to the Terms &amp; Conditions</p>
				</div>
			</section>
		);
	},
	handleSubmit: function (e) {
		e.preventDefault();
		var url = this.refs.url.value.trim();
		TRACKING.sendEvent(this, arguments, url);
		this.uploadVideo(UTILS.dropboxUrlFilter(url));
	},
	uploadVideo: function (url) {
		var self = this;
		fetch(AJAX.AUTH_URL, AJAX.POST_OPTIONS)
			.then(function(response) {
    			return response.json()
  			}).then(function(json) {
  				self.setState({
					accessToken: json.access_token,
					refreshToken: json.refresh_token,
					mode: 'loading'
				});
				var apiUrl = 'http://services.neon-lab.com/api/v2/' + AJAX.ACCOUNT_ID + '/videos',
					videoId = shortid.generate(),
					options = {
						method: 'POST',
						body: JSON.stringify({
							'external_video_ref': videoId,
							'url': UTILS.properEncodeURI(url),
							'token': self.state.accessToken
						}),
						headers: new Headers({
							'Content-Type': 'application/json'
						}),
						mode: 'cors'
					}
				;
				fetch(apiUrl, options)
					.then(function(response) {
						return response.json()
					}).then(function(json) {
						self.context.router.push('/video/' + videoId + '/');
					}).catch(function(ex) {
  						self.context.router.push('/video/' + videoId + '/');
  					})
  				;	
  			}).catch(function(ex) {
  				console.log(ex.message)
  			})
  		;	
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UploadForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
