// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Thumbnails from './Thumbnails';
import UTILS from '../../utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Video = React.createClass({
	getInitialState: function() {
		return {
			thumbnails: [],
			accessToken: '',
			refreshToken: '',
			videoId: this.props.params.videoId,
			status: 200,
			message: '',
			videoState: 'unknown',
			videoStateMapping: UTILS.VIDEO_STATE['unknown'].mapping,
			title: '',
			duration: 0
		}
	},
	componentDidMount: function() {
		var self = this;
		setInterval(function() {
			var USERNAME = 'global_admin_neon',
				PASSWORD = '4ERDWIlupafI',
	            AUTH_URL = 'https://auth.neon-lab.com/api/v2/authenticate?username=' + USERNAME + '&password=' + PASSWORD,
	            ACCOUNT_ID = 'gvs3vytvg20ozp78rolqmdfa',
				ajaxPostOptions = {
					method: 'POST',
					mode: 'cors'
				},
				ajaxGetOptions = {
					method: 'GET',
					mode: 'cors',
					cache: 'reload'
				}
			;
			console.log(AUTH_URL);
			fetch(AUTH_URL, ajaxPostOptions)
				.then(function(response) {
	    			return response.json()
	  			}).then(function(json) {
					self.setState({
						accessToken: json.access_token,
						refreshToken: json.refresh_token
					});
					var apiUrl = 'http://services.neon-lab.com/api/v2/' + ACCOUNT_ID + '/videos?video_id=' + self.state.videoId + '&fields=title,duration,state,thumbnails&token=' + self.state.accessToken;
					console.log(apiUrl);
					fetch(apiUrl, ajaxGetOptions)
						.then(function(response) {
			    			return response.json();
			  			}).then(function(json) {
			  				var video = json.videos[0];
			  				if (video.state !== self.state.videoState) {
			  					// Only bother if the state has changed
				  				var	newThumbnails = video.thumbnails.map(function(t) {
				  						var neonScoreData = UTILS.getNeonScoreData(t.neon_score),
				  							newT = {
					  							url: t.url,
					  							rawNeonScore: t.neon_score,
					  							cookedNeonScore: neonScoreData.neonScore,
					  							emoji: neonScoreData.emoji,
					  							enabled: t.enabled,
					  							type: t.type
				  							}
				  						;
				  						return newT;
				  					})
				  				;
								newThumbnails.sort(function(a, b) {
									return (b.cookedNeonScore === '?' ? 0 : b.cookedNeonScore) - (a.cookedNeonScore === '?' ? 0 : a.cookedNeonScore);
								});
								self.setState({
									thumbnails: newThumbnails,
									videoState: video.state,
									videoStateMapping: UTILS.VIDEO_STATE[video.state].mapping,
									title: video.title,
									duration: video.duration
								});
							}
			  			}).catch(function(ex) {
							self.setState({
								status: 404,
								message: ex.message
							});
			  			});
	  			}).catch(function(ex) {
					self.setState({
						status: 401,
						message: ex.message
					});
	  			});
	  	}, 10000);
	},
	render: function() {
		if (this.state.status === 401) {
			return (
				<section className="section">
					<div className="container">
						<h1 className="title">Video ID: { this.props.params.videoId }</h1>
						<div className="message is-danger">
							<div className="message-header">
								Unable to login
							</div>
							<div className="message-body">
								{ this.state.message }
							</div>
						</div>
					</div>
				</section>
			);
		}
		if (this.state.status === 404) {
			return (
				<section className="section">
					<div className="container">
						<h1 className="title">Video ID: { this.props.params.videoId }</h1>
						<div className="message is-warning">
							<div className="message-header">
								Not Found
							</div>
							<div className="message-body">
								{ this.state.message }
							</div>
						</div>
					</div>
				</section>
			);
		}
		if (this.state.status === 200) {
			var additionalClass = 'tag is-' + this.state.videoStateMapping + ' is-medium';
			return (
				<section className="section">
					<div className="container">
						<nav className="navbar">
							<div className="navbar-left">
								<div className="navbar-item">
									<span className={ additionalClass }>{ this.state.videoState }</span>
								</div>
								<div className="navbar-item">
									<h2 className="title is-3">{ this.state.title }</h2>
								</div>
							</div>
							<div className="navbar-right">
								<div className="navbar-item">
									<span className="tag">{ this.state.videoId }</span>
								</div>

								<div className="navbar-item">
									<span className="tag">{ this.state.duration }<abbr title="seconds">s</abbr></span>
								</div>
							</div>
						</nav>
						<Thumbnails videoStateMapping={ this.state.videoStateMapping } thumbnails={ this.state.thumbnails } />
					</div>
				</section>
			);
		}
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Video;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
