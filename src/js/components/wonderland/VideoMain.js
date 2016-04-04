
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
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
                    {this.props.messageNeeded}
                    <div className="columns is-desktop">
                        <div className="column">
                            <Thumbnails
                                videoStateMapping={this.props.videoStateMapping}
                                thumbnails={this.props.thumbnails}
                                videoState={this.props.videoState}
                            />
                        </div>
                    </div>
                </div>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
