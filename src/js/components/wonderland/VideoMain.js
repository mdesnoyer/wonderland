// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Thumbnails from './Thumbnails';
import VideoSharer from './VideoSharer';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import VideoContent from '../knave/VideoContent';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoMain = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    propTypes: {
        isGuest: React.PropTypes.bool.isRequired,
        accountId: React.PropTypes.string,
        videoId: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        videoState: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        created: React.PropTypes.string,
        isServingEnabled: React.PropTypes.bool.isRequired,
        shareToken: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            isLoading: false,
            experimentState: T.get('copy.unknown'),
            winnerThumbnail: ''
        }
    },
    componentWillMount: function() {
        var self = this;
        self.setState({
            isLoading: true
        }, function() {
            self.GET('statistics/videos', {
                data: {
                    video_id: self.props.videoId,
                    fields: UTILS.VIDEO_STATS_FIELDS
                }
            })
            .then(function(json) {
                self.setState({
                    experimentState: json.statistics[0].experiment_state,
                    winnerThumbnail: json.statistics[0].winnerThumbnail,
                    isLoading: false
                });
            }).catch(function(err) {
                console.log(err);
                self.setState({
                    status: err.code,
                    error: err.message,
                    isLoading: false,
                });
            });
        });
    },
    render: function() {
        var self = this;
        return (
            <article className="xxCollection xxCollection--video">
                <div className="xxCollection-content">
                    <VideoContent 
                        title={self.props.title}
                        videoId={self.props.videoId}
                    />
                </div>
                    <Thumbnails
                        isGuest={self.props.isGuest}
                        thumbnails={self.props.thumbnails}
                        videoState={self.props.videoState}
                        forceOpen={self.props.forceOpen}
                        isServingEnabled={self.props.isServingEnabled}
                        videoId={self.props.videoId}
                        shareToken={self.props.shareToken}
                        videoId={self.props.videoId}
                        accountId={self.props.accountId}
                    />
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
