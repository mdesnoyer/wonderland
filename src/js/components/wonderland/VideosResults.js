// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import VideoOwner from './VideoOwner';
import NavigationBar from '../core/NavigationBar';
import VideoProcessing from '../knave/VideoProcessing';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideosResults = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        var self = this;
        return (
            <div>
                <NavigationBar {...self.props} />
                {
                    self.props.videos.map(function(video, i) {
                        return (
                            <VideoOwner
                                key={video.video_id}
                                videoId={video.video_id}
                                pingInitial={false}
                                pingInterval={true}
                                videoState={video.state}
                                thumbnails={video.thumbnails}
                                title={video.title}
                                error={video.error}
                                duration={video.duration}
                                url={video.url}
                                // publish_date
                                // updated
                                created={video.created}
                                isMobile={self.props.isMobile}
                            />
                        );
                    })
                }
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideosResults;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
