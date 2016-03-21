// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Thumbnails from './Thumbnails';
import Notification from './Notification';
import UTILS from '../../utils';
import AJAX from '../../ajax';
import VideoInfoTable from './VideoInfoTable'

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
		var self = this,
        options = {
          data: {
            video_id: self.state.videoId,
            fields: [ 'title', 'publish_date', 'created', 'updated', 'duration', 'state', 'url', 'thumbnails' ]
          }
        };

		self.setState({
			mode: 'loading'
		});

    AJAX.doGet('videos', options)
      .then(function(json) {
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
          var newThumbnails = video.thumbnails.map(function (t) {
            var neonScoreData = UTILS.getNeonScoreData(t.neon_score),
                newT = {
                  url: t.url,
                  rawNeonScore: t.neon_score,
                  cookedNeonScore: neonScoreData.neonScore,
                  emoji: neonScoreData.emoji,
                  enabled: t.enabled,
                  type: t.type
                };
            return newT;
          });
          newThumbnails.sort(function (a, b) {
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
        } else {
          self.setState({
            mode: 'silent'
          });
        }
      })
      .catch(function(ex) {
        console.log(ex.message);
        clearInterval(self.state.intervalId);
        self.setState({
          status: ex.status,
          message: ex.message,
          intervalId: ''
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
						<Notification status={this.state.status} message="Unable to Login"  style="message is-danger" />
					</div>	
				</section>
			);
		}
		if (this.state.status === 404) {
			return (
				<section className="section">
					<div className="container">
						<Notification status={this.state.status} message="Not Found" style="message is-danger" />
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
									<a className={ additionalClass}>
										{this.state.videoState}
									</a>
								</div>
								<div className="navbar-item">
									<h2 className="title is-3"><a href={videoLink}>{displayTitle}</a></h2>
								</div>
							</div>
							<div className="navbar-right">
							</div>
						</nav>
						{notificationNeeded}
						<section className="content">
							<p>The following thumbnails were identified as the most &ldquo;clickable&rdquo; frames in this video.</p>
						</section>
						<div className="columns is-desktop">
							<div className="column">
								<Thumbnails videoStateMapping={this.state.videoStateMapping} thumbnails={this.state.thumbnails} />
							</div>
							<div className="column is-quarter">
								<VideoInfoTable videoId={this.state.videoId} duration={this.state.duration} publishDate={this.state.publishDate} url={this.state.url} />
							</div>
						</div>
						<section className="content">
							<h2 className="title is-3">Not the ones you would have picked?</h2>
							<p>That&rsquo;s not surprising. The prettiest images are usually NOT the ones that generate the most clicks.</p>
							<p>These images were selected by measuring features which generate emotional attraction within 20 to 50 milliseconds; features such as faces, attention, color, symmetry, blurriness, and others.</p>
							<p>70% of the time, Neon finds images that significantly outperform those chosen by human editors.</p>
						</section>
					</div>
				</section>
			);
		}
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Video;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
