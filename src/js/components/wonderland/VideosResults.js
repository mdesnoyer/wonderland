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
                                pingInitial={false}
                                pingInterval={true}
                                videoState={video.state}
                                thumbnails={video.thumbnails}
                                title={video.title}
                                error={video.error}
                                duration={video.duration}
                                url={video.url}
                                created={video.created}
                                isMobile={self.props.isMobile}
                                badThumbs={video.bad_thumbnails}
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
