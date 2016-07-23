// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import VideoOwner from './VideoOwner';
import PagingControls from '../core/PagingControls';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideosResults = React.createClass({
    render: function() {
        var self = this;
        return (
            <div>
                {
                    self.props.videos.map(function(video, i) {
                        return (
                            <VideoOwner
                                key={video.video_id}
                                videoId={video.video_id}
                                pingInitial={true}
                                pingInterval={true}
                                videoState={video.state}
                                demographicThumbnails={video.demographic_thumbnails}
                                timeRemaining={video.estimated_time_remaining}
                                title={video.title}
                                error={video.error}
                                duration={video.duration}
                                url={video.url}
                                created={video.created}
                                isMobile={self.props.isMobile}
                                openSignUp={self.props.openSignUp}
                                seconds={video.estimated_time_remaining}
                            />
                        );
                    })
                }
                <PagingControls {...self.props} />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideosResults;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
