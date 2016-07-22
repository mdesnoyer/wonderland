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
    componentWillReceiveProps: function(nextProps) {
        this.setState({
            selectedDemographic: nextProps.selectedDemographic
        });
    }, 
    getInitialState: function() {
        var self = this;
        return {
            videoId: self.props.videoId,
            videoState: self.props.videoState,
            videoStateMapping: UTILS.VIDEO_STATE[self.props.videoState].mapping,
            demographicThumbnails: self.props.demographicThumbnails,
            timeRemaining: self.props.timeRemaining,
            selectedDemographic: 0, 
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
            seconds: self.props.seconds,
            set_seconds: false 
        }
    },
    startTimer: function () {
        var self = this;
        if (self.props.pingInterval) {
            self.timer = setInterval(self.pingVideo, UTILS.VIDEO_CHECK_INTERVAL_BASE + UTILS.rando(UTILS.VIDEO_CHECK_INTERVAL_BASE));
        }
    },
    componentDidMount: function() {
        //var self = this;
        //self.startTimer();
        //if (self.props.pingInitial) {
        //    setTimeout(self.pingVideo, 0);
        //}
        return true; 
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
    pingVideo: function(forceRefresh, age=null, gender=null, callback=null) {
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
            console.log(video);
            if (video.state !== self.state.videoState) {
                console.log('in this state'); 
                setTimeout(
                    checkVideo,
                    UTILS.VIDEO_CHECK_INTERVAL_BASE + UTILS.rando(
                        UTILS.VIDEO_CHECK_INTERVAL_BASE))

                handleChangingVideoState(video); 
            }
            else if (forceRefresh) { 
                setTimeout(
                    checkVideo,
                    UTILS.VIDEO_CHECK_INTERVAL_BASE + UTILS.rando(
                        UTILS.VIDEO_CHECK_INTERVAL_BASE))

                handleChangingVideoState(video); 

                forceRefresh = false; 
            } 
            else {
                // this means that the video state hasn't changed 
                // and we don't want to force a refresh (new filter) 
                console.log('no state change');  
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
                console.log('blam3' + findex); 
                if (findex > -1) {  
                    selDemographic = findex; 
                    demographicSet = video.demographic_thumbnails[findex]; 
                }
                else { 
                    // we didn't find anything, we are probably in a 
                    // video processing state, let's set the demographicSelection 
                    // to the previous one. 
                    selDemographic = self.state.selectedDemographic; 
                    console.log(selDemographic);  
                    demographicSet = video.demographic_thumbnails[self.state.selectedDemographic]; 
                }  
            }
            return { 'demographic_thumbs' : demographicSet, 
                     'demographic_index' : selDemographic }; 
        }; 
        var handleChangingVideoState = function(video) { 
            var thumbs = getThumbSets(video);
            console.log(thumbs);  
            self.setState({ 
                //status: 200,
                title: video.title,
                selectedDemographic: 2, 
                shareToken: video.share_token ? video.share_token : '',
                videoState: video.state,
                error: video.error ? video.error : '',
                duration: video.duration,
                url: video.url,
                created: video.created,
                seconds: video.estimated_time_remaining,
                timeRemaining: video.estimated_time_remaining,
                videoStateMapping: UTILS.VIDEO_STATE[video.state].mapping,
                demographicThumbnails: thumbs.demographic_thumbs,
                isLoading: false/*,
                // TODO REMOVE should be able to use demographic thumbanils here as well 
                badThumbs: thumbs.demographic_thumbs.bad_thumbnails || [], 
                // TODO REMOVE replace with selecteddemo, and demothumbs 
                thumbnails: UTILS.fixThumbnails(thumbs.demographic_thumbs.thumbnails, true), 
                // TODO REMOVE should not be needed 
                sortedThumbnails: UTILS.fixThumbnails(thumbs.demographic_thumbnails.thumbnails, true)*/ 
            });  
        }; 
        var handleNoChangeVideoState = function(video) { 
            self.setState({
                title: video.title,
                isLoading: false,
                seconds: video.estimated_time_remaining,
                error: video.error ? video.error : ''
            });
        }; 
        // Check the video, and handle state changes 
        checkVideo();
        console.log("BLAM");
        //var in_progress = false;
        //var result = $.Deferred(); 
        /*var interval = setInterval(function() { 
            times += 1; 
            if (times >= 3) { 
                clearInterval(interval); 
            }
            self.GET('videos', options)
                .then(function(json) {
                    var video = json.videos[0];
                    console.log(video);
                    self.setState({ 
                        title: times 
                    });  
                })
            ; 
        }, 20);  */ 
        /*self.setState({
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
                            badThumbs: badThumbs,
                            set_seconds: false 
                        }, function () {
                            // this is a dirty dirty hack that i cant seem to get around 
                            // videoinfo will not refresh without calling this stupid callback 
                            self.state.pingVideoCallback(self.state.demographicThumbnails.length - 1); 
                            // Stop and restart the timer, just in case it was not running before
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
        ;*/ 
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoOwner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
