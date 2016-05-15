// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import Message from './Message';
import UTILS from '../../modules/utils';
import AjaxMixin from '../../mixins/Ajax';
import VideoHeader from './VideoHeader';
import VideoMain from './VideoMain';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Video = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
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
            created: ''
        }
    },
    fixThumbnails: function(rawThumbnails) {
        var defaults = [],
            customs = [],
            neons = [],
            nonNeons = []
        ;
        // Pass 1 - sort into `default`, `custom` and `neon`
        rawThumbnails.map(function(rawThumbnail, i) {
            switch (rawThumbnail.type) {
                case 'neon':
                    neons.push(rawThumbnail);
                    break;
                case 'custom':
                    customs.push(rawThumbnail);
                    break;
                case 'default':
                    defaults.push(rawThumbnail);
                    break;
                default:
                    // WE DON'T CARE. OK WE DO. BUT NOT ENOUGH TO DO ANYTHING.
                    break;
            }
        });
        // Pass 2 - sort `custom` by rank ASC
        customs.sort(function(a, b) {
            return a.rank - b.rank;
        });
        // Pass 3 - sort `neon` by neon_score DESC
        neons.sort(function(a, b) {
            return (b.neon_score === '?' ? 0 : b.neon_score) - (a.neon_score === '?' ? 0 : a.neon_score);
        });
        // Pass 4 - assemble the output
        nonNeons = customs.concat(defaults);
        if (nonNeons.length > 0) {
            return neons.concat(nonNeons[0]);
        }
        else {
            return neons;
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
            sortedThumbnails: self.fixThumbnails(self.props.thumbnails),
            title: self.props.title,
            error: self.props.error,
            created: self.props.created,
            isLoading: false,
            status: 200,
            size: self.props.forceOpen ? 'big' : 'small',
            duration: self.props.duration || 0,
            url: self.props.url || ''
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
    render: function() {
        var self = this,
            fourZeroFourMessageArray = [
                T.get('copy.message.line.one'),
                T.get('copy.message.line.two'),
                T.get('copy.message.link.one', {'@link': UTILS.CORP_EXTERNAL_URL}),
                T.get('copy.message.link.two', {'@link': UTILS.DRY_NAV.VIDEO_LIBRARY.URL}),
                T.get('copy.message.link.three', {'@link': UTILS.CONTACT_EXTERNAL_URL})
            ]
        ;
        if (self.state.status === 401) {
            return (
                <Message header={self.state.status} body={T.get('error.unableToSignIn')} flavour="danger" />
            );
        }
        if (self.state.status === 404) {
            return (
                <Message header={self.state.status} body={fourZeroFourMessageArray} flavour="danger" />
            );
        }
        if (self.state.status === 200) {
            var additionalClass = 'wonderland-video--state button is-' + self.state.videoStateMapping + ' is-small' + (self.state.isLoading ? ' is-loading' : ''),
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
                        additionalClass={additionalClass}
                        videoId={self.state.videoId}
                        created={self.state.created}
                        thumbnails={self.state.sortedThumbnails}
                    />
                    <VideoMain
                        forceOpen={self.state.forceOpen}
                        messageNeeded={messageNeeded}
                        thumbnails={self.state.sortedThumbnails}
                        videoState={self.state.videoState}
                        videoLink={videoLink}
                        duration={self.state.duration}
                        created={self.state.created}
                        url={self.state.url}
                        isServingEnabled={self.props.isServingEnabled}
                    />
                </div>
            );
        }
    },
    handleVideoOpenToggle: function(e) {
        if (e.target.type === 'text') { // hack
            return false;
        }
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
        // If the video is 'serving' or, its going nowhere, so don't
        // bother checking. There is a known latency issue in Back
        // End, #1103. We still need to poll 'failed'.
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
                    if (video.state !== self.state.videoState) {
                        // Only bother if the state has changed
                        self.setState({
                            status: 200,
                            thumbnails: video.thumbnails,
                            sortedThumbnails: self.fixThumbnails(video.thumbnails),
                            videoState: video.state,
                            videoStateMapping: UTILS.VIDEO_STATE[video.state].mapping,
                            title: video.title,
                            duration: video.duration,
                            url: video.url,
                            // publish_date
                            // updated
                            created: video.created,
                            error: video.error ? video.error : '',
                            isLoading: false
                        })
                    }
                    else {
                        self.setState({
                            isLoading: false
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
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Video;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
