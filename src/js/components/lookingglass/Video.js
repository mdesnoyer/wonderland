// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Notification from './Notification';
import UTILS from '../../utils';
import AJAX from '../../ajax';
import VideoHeader from './VideoHeader';
import VideoMain from './VideoMain';
import TimeAgoWrapper from '../core/TimeAgoWrapper';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Video = React.createClass({
    getInitialState: function() {
        return {
            size: this.props.forceOpen ? 'big' : 'small',
            forceOpen: this.props.forceOpen || false,
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
    handleToggle: function() {
        var self = this;
        self.setState({
            size: (self.state.size === 'small' ? 'big' : 'small')
        });
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
                            var newThumbnails = video.thumbnails.map(function(t) {
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
            intervalId = setInterval(self.checkStatus, 10000 + UTILS.rando(10000))
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
            var additionalClass = 'wonderland-video--state button is-' + this.state.videoStateMapping + ' is-small is-' + this.state.mode,
                displayTitle = this.state.title || this.state.videoId,
                notificationNeeded = this.state.error == '' ? '' : <Notification message={ this.state.error } />,
                videoLink = '/video/' + this.state.videoId + '/',
                videoSizeClass = 'video video--' + this.state.size
            ;
            return (
                <div className={videoSizeClass}>
                    <VideoHeader
                        forceOpen={this.state.forceOpen}
                        additionalClass={additionalClass}
                        videoState={this.state.videoState}
                        videoLink={videoLink}
                        displayTitle={displayTitle}
                        handleToggle={this.handleToggle}
                        size={this.state.size}
                        publishDate={this.state.publishDate || this.state.created}
                    />
                    <VideoMain
                        notificationNeeded={notificationNeeded}
                        size={this.state.size}
                        videoStateMapping={this.state.videoStateMapping}
                        videoState={this.state.videoState}
                        thumbnails={this.state.thumbnails}
                        url={this.state.url}
                        videoId={this.state.videoId}
                        duration={this.state.duration}
                        publishDate={this.state.publishDate || this.state.created}
                    />
                </div>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Video;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
