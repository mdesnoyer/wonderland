// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import Message from './Message';
import AjaxMixin from '../../mixins/Ajax';
import VideoHeader from './VideoHeader';
import VideoMain from './VideoMain';
import T from '../../modules/translation';
import E from '../../modules/errors';
import cookie from 'react-cookie';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoGuest = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    propTypes: {
        videoId: React.PropTypes.string.isRequired,
        accountId: React.PropTypes.string.isRequired,
        shareToken: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            videoId: self.props.videoId,
            accountId: self.props.accountId,
            shareToken: self.props.shareToken,
            videoState: 'unknown',
            thumbnails: [],
            sortedThumbnails: [],
            title: 'Unknown',
            duration: 0,
            created: '',
            url: '',
            mode: 'quiet' // quiet/loading/error/success
        }
    },
    componentDidMount: function() {
        var self = this;
        cookie.save('footprintCookieViewShare', self.props.shareToken, {path: UTILS.COOKIE_DEFAULT_PATH});
        self.setState({
            mode: 'loading'
        }, function() {
            self.GET('videos', {
                overrideAccountId: self.props.accountId,
                data: {
                    video_id: self.props.videoId,
                    share_token: self.props.shareToken,
                    fields: UTILS.VIDEO_FIELDS
                }
            })
                .then(function(json) {
                    var video = json.videos[0];
                    self.setState({
                        mode: 'success',
                        title: video.title,
                        duration: video.duration,
                        url: video.url,
                        thumbnails: video.thumbnails,
                        sortedThumbnails: UTILS.fixThumbnails(video.thumbnails),
                        videoState: video.state,
                        videoStateMapping: UTILS.VIDEO_STATE[video.state].mapping,
                        created: video.created
                    });
                })
                .catch(function(err) {
                    E.raiseError(err);
                    self.setState({
                        mode: 'error'
                    });
                });
            })
        ;
    },
    render: function() {
        var self = this;
        // TODO - API Call
        switch(self.state.mode) {
            case 'quiet':
                return (
                    <div></div>
                );
                break;
            case 'loading':
                return (
                    <div></div>
                );
                break;
            case 'error':
                return (
                    <Message header={'ERROR Heading TODO'} body={E.getErrors()} flavour="danger" />
                );
                break;
            case 'success':
                var additionalClass = 'wonderland-video--state button is-' + self.state.videoStateMapping + ' is-small',
                    videoSizeClass = 'video video--big'
                ;
                return (
                    <div className={videoSizeClass}>
                        <VideoHeader
                            isGuest={true}
                            showVideoOpenToggle={false}
                            forceOpen={true}
                            additionalClass={additionalClass}
                            videoState={self.state.videoState}
                            title={self.state.title}
                            videoId={self.state.videoId}
                            created={self.state.created}
                            thumbnails={self.state.sortedThumbnails}
                        />
                        <VideoMain
                            isGuest={true}
                            videoId={self.state.videoId}
                            forceOpen={true}
                            messageNeededComponent={false}
                            thumbnails={self.state.sortedThumbnails}
                            videoState={self.state.videoState}
                            duration={self.state.duration}
                            created={self.state.created}
                            url={self.state.url}
                            isServingEnabled={false}
                            shareToken={self.state.shareToken}
                            accountId={self.state.accountId}
                        />
                    </div>
                );
                break;
        }
    },
    componentWillUnmount: function(e) {
        E.clearErrors();
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoGuest;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
