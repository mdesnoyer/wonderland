// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import AJAX from '../../ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UploadForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			accessToken: '',
			refreshToken: ''
		}
	},
	render: function() {
		return (
			<section className="column is-half is-offset-quarter">
				<div className="container">
					<form onSubmit={ this.handleSubmit }>
						<fieldset>
							<p>Instructions</p>
							<legend className="title is-2">Upload Video</legend>
							<p className="control is-grouped">
								<input className="input" defaultValue="https://www.youtube.com/watch?v=a1Y73sPHKxw" type="text" ref="url" placeholder="Add Video URL" />
								<button className="button is-success">Upload</button>
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
		
		url = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
		url = url.replace('dl=0', 'dl=1&raw=1');
		this.uploadVideo(url);
	},
	uploadVideo: function (url) {
		var self = this;
		fetch(AJAX.AUTH_URL, AJAX.POST_OPTIONS)
			.then(function(response) {
    			return response.json()
  			}).then(function(json) {
  				self.setState({
					accessToken: json.access_token,
					refreshToken: json.refresh_token
				});
				var apiUrl = 'http://services.neon-lab.com/api/v2/' + AJAX.ACCOUNT_ID + '/videos',
					videoId = 'wonderland-' + new Date().getTime(),
					options = {
						method: 'POST',
						body: JSON.stringify({
							'external_video_ref': videoId,
							'url': url,
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
