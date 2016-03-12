// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Thumbnails from './Thumbnails';
import Notification from './Notification';
import UTILS from '../../utils';
import AJAX from '../../ajax';

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
			duration: 0,
			url: '',
			error: ''
		}
	},
	checkStatus: function() {
		var self = this;
		console.log(AJAX.AUTH_URL);
		fetch(AJAX.AUTH_URL, AJAX.POST_OPTIONS)
			.then(function(response) {
				return response.json()
				}).then(function(json) {
				self.setState({
					accessToken: json.access_token,
					refreshToken: json.refresh_token
				});
				var apiUrl = 'http://services.neon-lab.com/api/v2/' + AJAX.ACCOUNT_ID + '/videos?video_id=' + self.state.videoId + '&fields=title,publish_date,created,updated,duration,state,url,thumbnails&token=' + self.state.accessToken;
				console.log(apiUrl);
				fetch(apiUrl, AJAX.GET_OPTIONS)
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
								duration: video.duration,
								url: video.url,
								error: video.error ? video.error : ''
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
	},
	componentDidMount: function() {
		this.checkStatus();
		setInterval(this.checkStatus, 10000);
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
			var additionalClass = 'tag is-' + this.state.videoStateMapping + ' is-medium',
				displayTitle = this.state.title || this.state.videoId,
				notificationNeeded = this.state.error == '' ? '' : <Notification message={ this.state.error } />
			;
			return (
				<section className="section">
					<div className="container">
						<nav className="navbar">
							<div className="navbar-left">
								<div className="navbar-item">
									<span className={ additionalClass }>{ this.state.videoState }</span>
								</div>
								<div className="navbar-item">
									<h2 className="title is-3">{ displayTitle }</h2>
								</div>
							</div>
							<div className="navbar-right">
								<div className="navbar-item">
									<span className="tag is-medium">ID: { this.state.videoId }</span>
								</div>
								<div className="navbar-item">
									<span className="tag is-medium">Time: { Math.floor(this.state.duration) }<abbr title="seconds">s</abbr></span>
								</div>
							</div>
						</nav>
						<div><span className="tag is-medium">URL: { this.state.url }</span></div>
						{ notificationNeeded }
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
