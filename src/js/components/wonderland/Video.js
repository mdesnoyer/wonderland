// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Message from './Message';
import UTILS from '../../modules/utils';
import AJAX from '../../modules/ajax';
import VideoHeader from './VideoHeader';
import VideoMain from './VideoMain';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Video = React.createClass({
    propTypes: {
        videoId: React.PropTypes.string.isRequired
    },
    getDefaultProps: function() {
        var self = this;
        return {
            videoState: 'unknown',
            forceOpen: false,
            thumbnails: [],
            title: 'Unknown',
            error: '',
            created: '',
        }
    },
    getInitialState: function() {
        var self = this;
        return {
            videoId: self.props.videoId,
            videoState: self.props.videoState,
            videoStateMapping: UTILS.VIDEO_STATE[self.props.videoState].mapping,
            forceOpen: self.props.forceOpen,
            thumbnails: self.props.thumbnails,
            title: self.props.title,
            error: self.props.error,
            created: self.props.created,
            isBusy: false,
            status: 200,
            size: self.props.forceOpen ? 'big' : 'small',
            duration: self.props.duration || 0,
            url: self.props.url || ''
        }
    },
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
        if (self.props.pingInterval) {
            self.timer = setInterval(self.pingVideo, UTILS.VIDEO_CHECK_INTERVAL + UTILS.rando(UTILS.VIDEO_CHECK_INTERVAL));
        }
        if (self.props.pingInitial) {
            setTimeout(self.pingVideo, 0);
        }
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
        clearInterval(self.timer);
    },
    render: function() {
        var self = this;
        if (self.state.status === 401) {
            return (
                <Message header={self.state.status} body={T.get('error.unableToSignIn')} flavour="danger" />
            );
        }
        if (self.state.status === 404) {
            return (
                <Message header={self.state.status} body="Could not find Video" flavour="danger" />
            );
        }
        if (self.state.status === 200) {
            var additionalClass = 'wonderland-video--state button is-' + self.state.videoStateMapping + ' is-medium is-' + (self.state.isBusy ? 'loading' : ''),
                messageNeeded = self.state.error === '' ? '' : <Message header="Error" body={self.state.error} flavour="danger" />,
                videoLink = '/video/' + self.state.videoId + '/',
                videoSizeClass = 'video video--' + self.state.size
            ;
            return (
                <div className={videoSizeClass}>
                    <VideoHeader
                        handleVideoOpenToggle={self.handleVideoOpenToggle}
                        forceOpen={self.state.forceOpen}
                        videoState={self.state.videoState}
                        title={self.state.title}
                        videoLink={videoLink}
                        additionalClass={additionalClass}
                        videoId={self.state.videoId}
                        created={self.state.created}
                        thumbnails={self.state.thumbnails}
                    />
                    <VideoMain
                        forceOpen={self.state.forceOpen}
                        messageNeeded={messageNeeded}
                        videoStateMapping={self.state.videoStateMapping}
                        thumbnails={self.state.thumbnails}
                        videoState={self.state.videoState}
                        videoLink={videoLink}
                        duration={self.state.duration || 0}
                        url={self.state.url}
                        isAccountServingEnabled={self.props.isAccountServingEnabled}
                    />
                </div>
            );
        }
    },
    handleVideoOpenToggle: function(e) {
        e.preventDefault();
        var self = this;
        self.setState({
            forceOpen: !self.state.forceOpen
        });
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
        // If the video is 'serving' or 'failed', its going nowhere, so don't
        // bother checking
        if (self.state.videoState === 'serving' || self.state.videoState === 'failed') {
            clearInterval(self.timer);
            return false;
        }
        self.setState({
            isBusy: true
        }, function() {
            AJAX.doGet('videos', options)
                .then(function(json) {
                    if (self._isMounted === false) {
                        return;
                    }
                    var video = json.videos[0];
                    if (video.state !== self.state.videoState) {
                        // Only bother if the state has changed
                        self.setState({
                            status: 200,
                            thumbnails: video.thumbnails,
                            videoState: video.state,
                            videoStateMapping: UTILS.VIDEO_STATE[video.state].mapping,
                            title: video.title,
                            duration: video.duration,
                            url: video.url,
                            // publish_date
                            // updated
                            created: video.created,
                            error: video.error ? video.error : '',
                            isBusy: false
                        });
                    }
                    else {
                        self.setState({
                            isBusy: false
                        });
                    }
                }).catch(function(err) {
                    self.setState({
                        status: err.status,
                        message: err.responseText,
                        isBusy: false
                    }, function() {
                        clearInterval(self.timer);
                    });
                });
            })
        ;
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Video;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
