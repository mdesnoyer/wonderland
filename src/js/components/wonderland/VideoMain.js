// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Thumbnails from './Thumbnails';
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
        shareToken: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            isLoading: false,
            experimentState: T.get('copy.unknown'),
            winnerThumbnail: '',
            isHidden: false
        }
    },
    handleDelete: function(e) {
        var self = this; 
        self.setState({
            isHidden: true
        });
    },
    render: function() {
        var self = this;
        if (self.state.isHidden) {
            return null; 
        }
        else {
            return (
                <article className="xxCollection xxCollection--video">
                    <div className="xxCollection-content">
                        <VideoContent 
                            title={self.props.title}
                            videoId={self.props.videoId}
                            handleDelete={self.handleDelete}
                            shareToken={self.props.shareToken}
                        />
                    </div>
                        <Thumbnails
                            isGuest={self.props.isGuest}
                            thumbnails={self.props.thumbnails}
                            videoState={self.props.videoState}
                            videoId={self.props.videoId}
                            shareToken={self.props.shareToken}
                            accountId={self.props.accountId}
                        />
                </article>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
