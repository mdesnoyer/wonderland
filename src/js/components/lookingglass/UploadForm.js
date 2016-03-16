// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import AJAX from '../../ajax';
import shortid from 'shortid';
import UTILS from '../../utils';

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
								<input required className="input" type="url" ref="url" placeholder="Add Video URL" defaultValue="https://s3-us-west-1.amazonaws.com/neon-mp4/sharks.mp4" />
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
		this.uploadVideo(UTILS.dropboxUrlFilter(this.refs.url.value.trim()));
	},
	uploadVideo: function (url) {
		var self = this,
        videoId = shortid.generate(),
				options = {
					body: JSON.stringify({
						'external_video_ref': videoId,
						'url': UTILS.properEncodeURI(url)
					}),
					headers: new Headers({
						'Content-Type': 'application/json'
					})
				};

		new AJAX().doPost('videos', options)
			.then(function(json) {
				self.context.router.push('/video/' + videoId + '/');
			})
      .catch(function(ex) {
			  console.log(ex.message)
      });	
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UploadForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
