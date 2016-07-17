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
                        if (video.demographic_thumbnails.length > 0) {
                            var thumbnails = video.demographic_thumbnails.find(x=>(!x.age && !x.gender))
                            var badThumbs = thumbnails.bad_thumbnails
                        }
                        else {
                            var thumbnails = video
                            var badThumbs = []
                        }
                        return (
                            <VideoOwner
                                key={video.video_id}
                                videoId={video.video_id}
                                pingInitial={false}
                                pingInterval={true}
                                videoState={video.state}
                                thumbnails={thumbnails.thumbnails}
                                title={video.title}
                                error={video.error}
                                duration={video.duration}
                                url={video.url}
                                created={video.created}
                                isMobile={self.props.isMobile}
                                badThumbs={badThumbs}
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
