// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import Message from './Message';
import UTILS from '../../modules/utils';
import AjaxMixin from '../../mixins/Ajax';
import VideoMain from './VideoMain';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import VideoProcessing from '../knave/VideoProcessing';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoOwner = React.createClass({
    mixins: [AjaxMixin],
    propTypes: {
        videoId: React.PropTypes.string.isRequired
    },
    getDefaultProps: function() {
        var self = this;
        return {
            videoState: 'unknown',
            thumbnails: [],
            title: 'Unknown',
            error: '',
            created: ''
        }
    },
    getInitialState: function() {
        var self = this;
        return {
            videoId: self.props.videoId,
            videoState: self.props.videoState,
            videoStateMapping: UTILS.VIDEO_STATE[self.props.videoState].mapping,
            demographicThumbnails: self.props.demographicThumbnails,
            selectedDemographic: self.props.selectedDemographic || 0, 
            timeRemaining: self.props.timeRemaining,
            thumbnails: self.props.thumbnails,
            sortedThumbnails: UTILS.fixThumbnails(self.props.thumbnails, true),
            title: self.props.title,
            created: self.props.created,
            error: self.props.error,
            shareToken: '',
            isLoading: false,
            status: 200,
            size: 'big',
            duration: self.props.duration || 0,
            url: self.props.url || '',
            badThumbs: self.props.badThumbs,
            isAnalyzing: false,
            age: null, 
            gender: null, 
            pingVideoCallback: null, 
            seconds: self.props.seconds
        }
    },
    startTimer: function () {
        var self = this;
        if (self.props.pingInterval) {
            self.timer = setInterval(self.pingVideo, UTILS.VIDEO_CHECK_INTERVAL_BASE + UTILS.rando(UTILS.VIDEO_CHECK_INTERVAL_BASE));
        }
    },
    componentDidMount: function() {
        var self = this;
        self.startTimer();
        if (self.props.pingInitial) {
            setTimeout(self.pingVideo, 0);
        }
    },
    componentWillUnmount: function() {
        var self = this;
        clearInterval(self.timer);
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        return (
            (nextState.title !== this.state.title) ||
            (nextState.videoState !== this.state.videoState) ||
            (nextProps.isMobile !== this.props.isMobile) ||
            (nextProps.seconds !== this.props.seconds)
        );
    },
    render: function() {
        var self = this;
        if (!self.state.demographicThumbnails || self.state.demographicThumbnails.length === 0) {
            return (
                <VideoProcessing
                    videoId={self.state.videoId}
                    title={self.state.title}
                    error={self.state.error}
                    videoState={self.state.videoState}
                    duration={self.state.duration}
                    seconds={self.state.seconds}
                />
            );
        }
        else {
            return (
                <VideoMain
                    isGuest={false}
                    videoId={self.state.videoId}
                    thumbnails={self.state.sortedThumbnails}
                    demographicThumbnails={self.state.demographicThumbnails}
                    selectedDemographic={self.state.selectedDemographic}
                    timeRemaining={self.state.timeRemaining}
                    refreshVideo={self.pingVideo}
                    videoState={self.state.videoState}
                    duration={self.state.duration}
                    created={self.state.created}
                    url={self.state.url}
                    shareToken={self.state.shareToken}
                    title={self.state.title}
                    isMobile={self.props.isMobile}
                    badThumbs={self.state.badThumbs}
                    openSignUp={self.props.openSignUp}
                />
            );
        }
    },
    pingVideo: function(forceRefresh, age, gender, callback=null) {
        var self = this,
            options = {
                data: {
                    video_id: self.state.videoId,
                    fields: UTILS.VIDEO_FIELDS
                }
            }
        ;
        // If the video is 'serving' or 'processed' its going nowhere, so don't
        // bother checking. There is a known latency issue in Back End, #1103.
        // We still need to poll 'failed'.
        if (!forceRefresh && (self.state.videoState === 'serving' || self.state.videoState === 'processed')) {
            clearInterval(self.timer);
            return false;
        }
        if (!self.state.age) { 
            self.state.age = age; 
        } 
        if (!self.state.gender) { 
            self.state.gender = gender; 
        }
        if (!self.state.pingVideoCallback) {
            self.state.pingVideoCallback = callback; 
        }  
        self.setState({
            isLoading: true 
        }, function() {
            self.GET('videos', options)
                .then(function(json) {
                    var video = json.videos[0];
                    if (video.demographic_thumbnails.length > 0) {
                        var newThumbnails = null 
                        if (self.state.age && self.state.gender) { 
                            var temps = video.demographic_thumbnails.find(
                                x=>((x.age && x.age == self.state.age) && 
                                    (x.gender && x.gender == self.state.gender)));
                            if (temps && temps.thumbnails && temps.thumbnails.length > 0) {  
                                newThumbnails = temps; 
                            } 
                        }
                        if (!newThumbnails) {  
                            newThumbnails = video.demographic_thumbnails.find(x=>(!x.age && !x.gender));
                        } 
                        var badThumbs = newThumbnails.bad_thumbnails || [];
                    }
                    else {
                        var newThumbnails = video;
                        var badThumbs = [];
                    }
                    if (video.state !== self.state.videoState || forceRefresh) {
                        // Only bother if the state has changed
                        self.setState({
                            status: 200,
                            thumbnails: UTILS.fixThumbnails(newThumbnails.thumbnails, true), 
                            demographicThumbnails: video.demographic_thumbnails,
                            timeRemaining: video.estimated_time_remaining,
                            sortedThumbnails: UTILS.fixThumbnails(newThumbnails.thumbnails, true),
                            videoState: video.state,
                            videoStateMapping: UTILS.VIDEO_STATE[video.state].mapping,
                            title: video.title,
                            error: video.error ? video.error : '',
                            duration: video.duration,
                            url: video.url,
                            shareToken: video.share_token ? video.shareToken : '',
                            created: video.created,
                            isLoading: false,
                            seconds: video.estimated_time_remaining,
                            badThumbs: badThumbs
                        }, function () {
                            // Stop and restart the timer, just in case it was not running before
                            // this is a dirty dirty hack that i cant seem to get around 
                            // videoinfo will not refresh without calling this stupid callback 
                            self.state.pingVideoCallback(self.state.demographicThumbnails.length - 1); 
                            clearInterval(self.timer);
                            self.startTimer();
                        });
                    }
                    else if(!forceRefresh) {
                        self.setState({
                            title: video.title,
                            isLoading: false,
                            seconds: video.estimated_time_remaining,
                            error: video.error ? video.error : ''
                        });
                    }
                }).catch(function(err) {
                    self.setState({
                        status: err.code,
                        error: err.message,
                        isLoading: false
                    }, function() {
                        clearInterval(self.timer);
                    });
                });
            })
        ;
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoOwner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
