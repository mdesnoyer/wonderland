// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import AJAX from '../../ajax';
import shortid from 'shortid';
import UTILS from '../../utils';
import TRACKING from '../../tracking';
import Notification from './Notification';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UploadForm = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			accessToken: '',
			refreshToken: '',
			mode: 'silent', // silent/loading/error
			isAgreementChecked: false,
			url:'',
			isUrlValid: false
		}
	},
	render: function() {
		if (this.state.mode === 'loading') {
			var buttonClassName = 'button is-primary is-disabled is-loading',
				inputClassName = 'input is-disabled'
			;
		}
		else if ((!this.state.isAgreementChecked || !this.state.isUrlValid) && (this.state.mode === 'silent')) {
			var buttonClassName = 'button is-primary is-disabled',
				inputClassName = 'input'
		}
		else {
			var buttonClassName = 'button is-primary',
				inputClassName = 'input'
			;
		}
		return (
			<section className="section columns">
				<div className="column is-half is-offset-quarter">
					<form onSubmit={this.handleSubmit} >
						<fieldset>
							<legend className="title is-2">Upload Video</legend>
							<p className="control">
								(The processing time depends on the length of the video. It takes our computers about the same amount of time to watch a video as it takes you, so longer videos take a while.)
							</p>
							<Notification message="Be sure to include 'https' for a secure experience" style="notification is-warning" status={this.state.isUrlValid} />
							<p className="control is-grouped">
								<input required className={inputClassName} type="url" ref="url"  onChange={this.handleChangeUrl} value={this.state.url} placeholder="Add Video URL" />
								<button className={buttonClassName}>Upload</button>
							</p>
							<p className="control">
								<input className={inputClassName} type="text" ref="title" placeholder="Optional Title" />
							</p>
							<p className="control">
								<label className="checkbox" onChange={this.handleChangeAgreement}  checked={this.state.isAgreementChecked}>
									<input type="checkbox" />
								</label>
									I agree to Neon&rsquo;s terms and conditions of use.
							</p>
						</fieldset>
					</form>
				</div>
			</section>
		);
	},
	handleChangeUrl: function (e) {
		this.setState({url: e.target.value})
		this.checkUrlHttps(e);
	},
	checkUrlHttps: function (e) {
		if (/^(https)/gi.test(e.target.value)){
			this.setState({isUrlValid: true})
		}else{
			this.setState({isUrlValid: false})
		}
	},
	handleChangeAgreement: function () {
		this.setState({isAgreementChecked: !this.state.isAgreementChecked})
	},
	handleSubmit: function (e) {
		e.preventDefault();
		var url = this.refs.url.value.trim();
		TRACKING.sendEvent(this, arguments, url);
		this.uploadVideo(UTILS.dropboxUrlFilter(url), this.refs.title.value.trim());
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
