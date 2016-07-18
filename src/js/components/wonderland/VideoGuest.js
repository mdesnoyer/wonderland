// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import Message from './Message';
import AjaxMixin from '../../mixins/Ajax';
import VideoMain from './VideoMain';
import T from '../../modules/translation';
import E from '../../modules/errors';
import cookie from 'react-cookie';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoGuest = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
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
        cookie.save(UTILS.COOKIES_KEY.viewShareKey, self.props.shareToken, {path: UTILS.COOKIE_DEFAULT_PATH});
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
                    if (video.demographic_thumbnails.length > 0) {
                        var newThumbnails = video.demographic_thumbnails.find(x=>(!x.age && !x.gender));
                        var badThumbs = newThumbnails.bad_thumbnails;
                    }
                    else {
                        var newThumbnails = video;
                        var badThumbs = [];
                    }
                    self.setState({
                        mode: 'success',
                        title: video.title,
                        duration: video.duration,
                        url: video.url,
                        thumbnails: newThumbnails.thumbnails,
                        sortedThumbnails: UTILS.fixThumbnails(newThumbnails.thumbnails, true),
                        videoState: video.state,
                        videoStateMapping: UTILS.VIDEO_STATE[video.state].mapping,
                        created: video.created,
                        badThumbs: badThumbs
                    });
                })
                .catch(function(err) {
                    switch (err.code) {
                        case 401:
                            E.raiseError(T.get('error.401'));
                            break;
                        case 403:
                            E.raiseError(T.get('error.403'));
                        case 404:
                            self.context.router.push('*')
                            E.raiseError(T.get('error.404'));
                            break;
                        default:
                            E.raiseError(T.get('error.generic'));
                            break;
                    }
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
                ;
                return (
                        <VideoMain
                            isGuest={true}
                            title={self.state.title}
                            videoId={self.state.videoId}
                            messageNeededComponent={false}
                            thumbnails={self.state.sortedThumbnails}
                            videoState={self.state.videoState}
                            duration={self.state.duration}
                            created={self.state.created}
                            url={self.state.url}
                            shareToken={self.state.shareToken}
                            accountId={self.state.accountId}
                            badThumbs={self.state.badThumbs}
                        />
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
