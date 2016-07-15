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
            seconds: self.props.seconds,
        }
    },
    componentDidMount: function() {
        var self = this;
        if (self.props.pingInterval) {
            self.timer = setInterval(self.pingVideo, UTILS.VIDEO_CHECK_INTERVAL_BASE + UTILS.rando(UTILS.VIDEO_CHECK_INTERVAL_BASE));
        }
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
                    videoState={self.state.videoState}
                    duration={self.state.duration}
                    created={self.state.created}
                    url={self.state.url}
                    shareToken={self.state.shareToken}
                    title={self.state.title}
                    isMobile={self.props.isMobile}
                    badThumbs={self.state.badThumbs}
                />
            );
        }
    },
    pingVideo: function() {
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
        if (self.state.videoState === 'serving' || self.state.videoState === 'processed') {
            clearInterval(self.timer);
            return false;
        }
        self.setState({
            isLoading: true
        }, function() {
            self.GET('videos', options)
                .then(function(json) {
                    var video = json.videos[0];
                    if (video.demographic_thumbnails.length > 0) {
                        var newThumbnails = video.demographic_thumbnails.find(x=>(!x.age && !x.gender));
                        var badThumbs = newThumbnails.bad_thumbnails;
                    }
                    else {
                        var newThumbnails = video;
                        var badThumbs = [];
                    }
                    if (video.state !== self.state.videoState) {
                        // Only bother if the state has changed
                        self.setState({
                            status: 200,
                            thumbnails: newThumbnails.thumbnails,
                            sortedThumbnails: UTILS.fixThumbnails(newThumbnails.thumbnails, true),
                            demographicThumbnails: video.demographic_thumbnails,
                            videoState: video.state,
                            videoStateMapping: UTILS.VIDEO_STATE[video.state].mapping,
                            title: video.title,
                            error: video.error ? video.error : '',
                            duration: video.duration,
                            url: video.url,
                            shareToken: video.share_token ? video.shareToken : '',
                            // publish_date
                            // updated
                            created: video.created,
                            isLoading: false,
                            seconds: video.estimated_time_remaining,
                            badThumbs: badThumbs
                        })
                    }
                    else {
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
