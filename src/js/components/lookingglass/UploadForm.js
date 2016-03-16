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
			isChecked: false
		}
	},
	render: function() {		
			if (this.state.isChecked == true){
				return (
					<section className="section columns">
						<div className="column is-half is-offset-quarter">
							<form onSubmit={ this.handleSubmit }>
								<fieldset>
									<p>Instructions</p>
									<legend className="title is-2">Upload Video</legend>
									<p className="control is-grouped">	
										<input className="input" type="url" ref="url" placeholder="Add Video URL" required/>
										<button className="button is-primary">Upload</button>
									</p>
									<p className="control">
										<input className="input" type="text" ref="title" placeholder="Optional Title" />
									</p>
									<label className="checkbox">
									   <input type="checkbox" checked={this.state.isChecked} onChange={this.handleChange} required/>
									   {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
									  	 <p>I agree to the Terms &amp; Conditions</p>
									 </label>
								</fieldset>
							</form>
						</div>
					</section>
				)
			}
			if (this.state.isChecked == false){
				return(
					<section className="section columns">
						<div className="column is-half is-offset-quarter">
							<form onSubmit={ this.handleSubmit }>
								<fieldset>
									<p>Instructions</p>
									<legend className="title is-2">Upload Video</legend>
									<p className="control is-grouped">	
										<input className="input" type="url" ref="url" placeholder="Add Video URL" required/>
										<button className="button is-primary is-disabled">Upload</button>
									</p>
									<p className="control">
										<input className="input" type="text" ref="title" placeholder="Optional Title" />
									</p>
									<label className="checkbox">
									   <input type="checkbox" checked={this.state.isChecked} onChange={this.handleChange} required/>
									   {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
									  	 <p>I agree to the Terms &amp; Conditions</p>
									 </label>
								</fieldset>
							</form>
						</div>
					</section>
				)
			}
		},
	handleChange: function(){		
		this.setState({isChecked: !this.state.isChecked});
	},
	handleSubmit: function (e) {
		e.preventDefault();
		var url = this.refs.url.value.trim();
		TRACKING.sendEvent(this, arguments, url);
		this.uploadVideo(UTILS.dropboxUrlFilter(url));
	},
	uploadVideo: function (url, title) {
		var self = this;
		console.log(AJAX.AUTH_URL);
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
							external_video_ref: videoId,
							url: UTILS.properEncodeURI(url),
							title: title,
							token: self.state.accessToken
						}),
						headers: {
							'Content-Type': 'application/json',
						},
						mode: 'cors'
					}
				;
				console.log(apiUrl);
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
