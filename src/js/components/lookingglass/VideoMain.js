
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import VideoInfoTable from './VideoInfoTable';
import Thumbnails from './Thumbnails';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoMain = React.createClass({
    render: function() {
        if (this.props.size === 'small') {
            return false;
        }
        else {
            return (
                <div>
                    <br />
                    {this.props.notificationNeeded}
                    <div className="columns is-desktop">
                        <div className="column">
                            <Thumbnails
                                videoStateMapping={this.props.videoStateMapping}
                                thumbnails={this.props.thumbnails}
                                videoState={this.props.videoState}
                            />
                        </div>
                        {/*<div className="column is-quarter">
                            <VideoInfoTable videoId={this.props.videoId} duration={this.props.duration} publishDate={this.props.publishDate} url={this.props.url} />
                        </div>*/}
                    </div>
                </div>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
