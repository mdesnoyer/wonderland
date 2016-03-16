// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Thumbnails from './Thumbnails';
import Notification from './Notification';
import UTILS from '../../utils';
import AJAX from '../../ajax';

import TimeAgoWrapper from '../core/TimeAgoWrapper';

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
			error: '',
			publishDate: '',
			created: '',
			updated: '',
			intervalId: '',
			mode: 'silent' // silent/loading/error
		}
	},
	checkStatus: function() {
		var self = this;
		self.setState({
			mode: 'loading'
		});
		console.log(AJAX.AUTH_URL);
		fetch(AJAX.AUTH_URL, AJAX.POST_OPTIONS)
			.then(function(response) {
				return response.json()
				}).then(function(json) {
				self.setState({
					accessToken: json.access_token,
					refreshToken: json.refresh_token,
				});
				var apiUrl = 'http://services.neon-lab.com/api/v2/' + AJAX.ACCOUNT_ID + '/videos?video_id=' + self.state.videoId + '&fields=title,publish_date,created,updated,duration,state,url,thumbnails&token=' + self.state.accessToken;
				console.log(apiUrl);
				fetch(apiUrl, AJAX.GET_OPTIONS)
					.then(function(response) {
		    			return response.json();
		  			}).then(function(json) {
		  				var video = json.videos[0];
						if ((video.state === 'serving' && self.state.videoState == 'serving') 
							|| (video.state === 'failed' && self.state.videoState == 'failed')) {
							clearInterval(self.state.intervalId);
							self.setState({
								mode: 'silent',
								intervalId: ''
							});
							return;
						}
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
								error: video.error ? video.error : '',
								publishDate: video.publish_date,
								created: video.created,
								updated: video.updated,
								mode: 'silent'
							});
						}
						else {
							self.setState({
								mode: 'silent'
							});
						}
		  			}).catch(function(ex) {
						self.setState({
							status: 404,
							message: ex.message,
							mode: 'silent'
						});
		  			});
				}).catch(function(ex) {
					self.setState({
						status: 401,
						message: ex.message,
						mode: 'silent'
					});
				});
	},
	componentDidMount: function() {
		var self = this,
			intervalId = setInterval(self.checkStatus, 10000)
		;
		setTimeout(self.checkStatus, 0);
		self.setState({
			intervalId: intervalId
		});
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
			var additionalClass = 'button is-' + this.state.videoStateMapping + ' is-medium is-' + this.state.mode,
				displayTitle = this.state.title || this.state.videoId,
				notificationNeeded = this.state.error == '' ? '' : <Notification message={ this.state.error } />,
				videoLink = '/video/' + this.state.videoId + '/'
			;
			return (
				<section className="section">
					<div className="container">
						<nav className="navbar">
							<div className="navbar-left">
								<div className="navbar-item">
									<a className={ additionalClass }>
										{ this.state.videoState }
									</a>
								</div>
								<div className="navbar-item">
									<h2 className="title is-3"><a href={videoLink}>{ displayTitle }</a></h2>
								</div>
							</div>
							<div className="navbar-right">
							</div>
						</nav>
						{ notificationNeeded }
						<div className="columns is-desktop">
							<div className="column">
								<Thumbnails videoStateMapping={ this.state.videoStateMapping } thumbnails={ this.state.thumbnails } />
							</div>
							<div className="column is-quarter">
								<table className="table is-bordered is-striped is-narrow">
									<tbody>
										<tr>
											<th>ID</th>
											<td>{ this.state.videoId }</td>
										</tr>
										<tr>
											<th>Duration</th>
											<td>{Math.floor(this.state.duration)}<abbr title="seconds">s</abbr></td>
										</tr>
										{/*<tr>
											<th>Created</th>
											<td><TimeAgoWrapper date={ this.state.created } /></td>
										</tr>
										<tr>
											<th>Updated</th>
											<td><TimeAgoWrapper date={this.state.updated} /></td>
										</tr>*/}
										<tr>
											<th>Published</th>
											<td><TimeAgoWrapper date={this.state.publishDate} /></td>
										</tr>
										<tr>
											<th>Original</th>
											<td><a href={this.state.url} target="_blank">Source</a></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</section>
			);
		}
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Video;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
