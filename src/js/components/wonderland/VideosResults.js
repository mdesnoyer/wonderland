// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Video from './Video';
import NavigationBar from '../core/NavigationBar';
import SearchBar from '../core/SearchBar';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideosResults = React.createClass({
    render: function() {
        var self = this,
            additionalClass = 'table is-striped' + (self.props.isBusy ? ' is-busy' : '')
        ;
        return (
            <table className={additionalClass}>
                <caption>
                    {self.props.errorMessage}
                </caption>
                <thead>
                    {/*}<tr>
                        <th><SearchBar {...self.props} /></th>
                    </tr>*/}
                </thead>
                <tfoot>
                    <tr>
                        <th><NavigationBar {...self.props} /></th>
                    </tr>
                </tfoot>
                <tbody>
                    {
                        self.props.videos.map(function(video, i) {
                            var forceOpen = (i === 0) && self.props.forceOpenFirstOverride;
                            return (
                                <tr key={video.video_id}>
                                    <td>
                                        <Video
                                            videoId={video.video_id}
                                            pingInitial={false}
                                            pingInterval={true}
                                            forceOpen={forceOpen}
                                            videoState={video.state}
                                            thumbnails={video.thumbnails}
                                            title={video.title}
                                            error={video.error}
                                            duration={video.duration}
                                            url={video.url}
                                            // publish_date
                                            // updated
                                            created={video.created}
                                            isAccountServingEnabled={self.props.isAccountServingEnabled}
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
