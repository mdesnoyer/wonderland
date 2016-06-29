// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import VideoOwner from './VideoOwner';
import NavigationBar from '../core/NavigationBar';
import SearchBar from '../core/SearchBar';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideosResults = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        var self = this,
            additionalClass = 'table is-bordered' + (self.props.isLoading ? ' is-loading' : '') 
            + ((self.props.videoCountServed === 0 && self.props.alertMessage === '') ? ' is-hidden' : '')
        ;
        return (
            <table className={additionalClass}>
                <caption>
                    {self.props.errorMessage}
                </caption>
                {/*<thead>
                    <tr>
                        <th><SearchBar {...self.props} /></th>
                    </tr>
                </thead>*/}
                <tfoot>
                    <tr>
                        <th><NavigationBar {...self.props} /></th>
                    </tr>
                </tfoot>
                <tbody>
                    {
                        self.props.videos.map(function(video, i) {
                            return (
                                <tr key={video.video_id}>
                                    <td>
                                        <VideoOwner
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
                                            isServingEnabled={self.props.isServingEnabled}
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
