// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Video from './Video';
import FilterBar from '../core/FilterBar';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideosResults = React.createClass({
    render: function() {
        var self = this,
            filterBar = <FilterBar {...self.props} />
        ;
        return (
            <table className="table is-striped">
                <caption>
                    {self.props.errorMessage}
                </caption>
                <thead>
                    <tr>
                        <th>{filterBar}</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>{filterBar}</th>
                    </tr>
                </tfoot>
                <tbody>
                    {
                        self.props.videos.map(function(video, i) {
                            return (
                                <tr key={video.video_id}>
                                    <td>
                                        <Video
                                            videoId={video.video_id}
                                            pingInitial={false}
                                            pingInterval={true}
                                            forceOpen={false}
                                            videoState={video.state}
                                            thumbnails={video.thumbnails}
                                            title={video.title}
                                            error={video.error}
                                            // duration
                                            // url
                                            // publish_date
                                            // updated
                                            created={video.created}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideosResults;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
