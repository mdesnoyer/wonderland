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
            title: 'Unknown',
            error: '',
            created: ''
        }
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            selectedDemographic: nextProps.selectedDemographic
        });
        if (!this.props.timeRemaining) { 
            this.setState({
                timeRemaining: nextProps.timeRemaining
            });
        }   
    }, 
    getInitialState: function() {
        var self = this;
        return {
            videoId: self.props.videoId,
            videoState: self.props.videoState,
            videoStateMapping: UTILS.VIDEO_STATE[self.props.videoState].mapping,
            demographicThumbnails: self.props.demographicThumbnails,
            timeRemaining: self.props.timeRemaining,
            selectedDemographic: self.props.selectedDemographic || 0, 
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
    componentDidMount: function() {
        var self = this;
        if (self.props.pingInitial) {
            self.pingVideo(); 
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
            (nextProps.seconds !== this.props.seconds) || 
            (!this.state.timeRemaining && nextState.timeRemaining) || 
            (nextState.selectedDemographic !== this.state.selectedDemographic) 
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
                    timeRemaining={self.state.timeRemaining}
                />
            );
        }
        else {
            return (
                <VideoMain
                    isGuest={false}
                    videoId={self.state.videoId}
                    demographicThumbnails={self.state.demographicThumbnails}
                    selectedDemographic={self.state.selectedDemographic}
                    onDemoChange={self.onDemoChange} 
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
    onDemoChange: function(value) { 
        this.setState({ 
            selectedDemographic: value 
        });  
    },
    pingVideo: function(forceRefresh, age=null, gender=null) {
        var self = this;
        // If the video is 'serving' or 'processed' its going nowhere, so don't
        // bother checking. There is a known latency issue in Back End, #1103.
        // We still need to poll 'failed'.
        if (!forceRefresh) { 
            if (self.state.videoState in ['serving', 'processed']) 
                return false;
        }
        var checkVideo = function() {
            var options = {
                data: {
                    video_id: self.state.videoId,
                    fields: UTILS.VIDEO_FIELDS
                }
            };
            self.setState({  
                isLoading: true 
            }, function() { self.GET('videos', options)
                .then(function(json) { 
                    handleGetVideo(json); 
                })
                .catch(function(err) {
                    self.setState({
                        status: err.code,
                        error: err.message,
                        isLoading: false
                    });
                })
            })
        }; 
        var handleGetVideo = function(json) { 
            var video = json.videos[0];
            if (video.state !== self.state.videoState) {
                /*  
                   We have a video that changed state 
                     lets check to see what its up to 
                */ 
                setTimeout(
                    checkVideo,
                    UTILS.VIDEO_CHECK_INTERVAL_BASE + UTILS.rando(
                        UTILS.VIDEO_CHECK_INTERVAL_BASE))

                handleChangingVideoState(video); 
            }
            else if (forceRefresh) {
                /* 
                   Force a videostate change, this is to wait 
                    for results to a POST that happened on a refilter 
                    and forces a video back into processing state  
                */
                setTimeout(
                    checkVideo,
                    UTILS.VIDEO_CHECK_INTERVAL_BASE + UTILS.rando(
                        UTILS.VIDEO_CHECK_INTERVAL_BASE))
                handleChangingVideoState(video); 
                forceRefresh = false; 
            }
            else if (video.state == UTILS.VIDEO_STATE_ENUM.processing) {
                /* 
                   If we are in processing state : 
                    set the timeout based on estimated_time_remaining,
                     move this down as we get closer. but only have a 
                     max poll of the enum. 
 
                    possible update of title, and seconds_remaining 
                */
                var base = UTILS.VIDEO_CHECK_INTERVAL_BASE + UTILS.rando(
                               UTILS.VIDEO_CHECK_INTERVAL_BASE), 
                    video_remaining_millis = null;  
                ; 
                if (video.estimated_time_remaining) {
                    if (video.estimated_time_remaining > 0) { 
                        if (video.estimated_time_remaining < 30) {  
                            video_remaining_millis = UTILS.VIDEO_CHECK_INTERVAL_BASE;
                        } 
                        else {
                            video_remaining_millis = Math.min(
                                (video.estimated_time_remaining - 35) * 1000, 
                                UTILS.MAX_VIDEO_POLL_INTERVAL_MS);
                        }  
                    } 
                } 
                var timeout = video_remaining_millis || base;

                setTimeout(checkVideo,
                    timeout);
                
                handleProcessingVideoState(video); 
            }  
            else if (video.state == UTILS.VIDEO_STATE_ENUM.failed) {
                /* 
                   If we have a video in failed state, lets continue 
                      to check it, to see if it will get requeued 
                      and succeed. 
                */ 
                setTimeout(checkVideo, UTILS.MAX_VIDEO_POLL_INTERVAL_MS);
            } 
            else {
                /* 
                   This means that the video state hasn't changed 
                    just handle some normal state changes, but don't
                    reset the timer  
                */ 
                handleNoChangeVideoState(video); 
            }  
        };
        var getThumbSets = function(video) { 
            var demographicSet = null,
                selDemographic = 0
            ; 
 
            if (video.demographic_thumbnails.length > 0) {
                var findex = video.demographic_thumbnails.find(
                    x=>((x.age && x.age == age) && 
                        (x.gender && x.gender == gender)));
                findex = video.demographic_thumbnails.indexOf(findex); 
                if (findex > -1) {  
                    selDemographic = findex; 
                }
                else { 
                    // we didn't find anything, we are probably in a 
                    // video processing state, let's set the demographicSelection 
                    // to the previous one. 
                    selDemographic = self.state.selectedDemographic; 
                }  
                // always just set this to what we get from video 
                demographicSet = video.demographic_thumbnails; 
            }
            return { 'demographic_thumbs' : demographicSet, 
                     'demographic_index' : selDemographic }; 
        }; 
        var handleChangingVideoState = function(video) { 
            var thumbs = getThumbSets(video);
            self.setState({ 
                status: 200,
                title: video.title,
                shareToken: video.share_token ? video.share_token : '',
                videoState: video.state,
                error: video.error ? video.error : '',
                duration: video.duration,
                url: video.url,
                created: video.created,
                seconds: video.estimated_time_remaining,
                timeRemaining: video.estimated_time_remaining,
                videoStateMapping: UTILS.VIDEO_STATE[video.state].mapping,
                selectedDemographic: thumbs.demographic_index, 
                demographicThumbnails: thumbs.demographic_thumbs,
                isLoading: false
            });  
        }; 
        var handleNoChangeVideoState = function(video) { 
            self.setState({
                title: video.title,
                isLoading: false,
                error: video.error ? video.error : ''
            });
        }; 
        var handleProcessingVideoState = function(video) {
            if (!self.state.seconds) { 
                self.setState({ 
                    seconds: video.estimated_time_remaining 
                });
            } 
            if (!self.state.timeRemaining) { 
                self.setState({ 
                    timeRemaining: video.estimated_time_remaining 
                });
            } 
            if (!self.state.title) { 
                self.setState({
                    title: video.title
                }); 
            }
        }; 
        // Check the video, and handle state changes 
        checkVideo();
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoOwner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
