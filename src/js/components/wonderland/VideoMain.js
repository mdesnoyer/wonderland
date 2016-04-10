// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import Thumbnails from './Thumbnails';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoMain = React.createClass({
    /*
    */
    propTypes: {
        forceOpen: React.PropTypes.bool.isRequired,
        messageNeeded: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
        videoStateMapping: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        videoState: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this,
            additionalClass = self.props.forceOpen ? 'is-shown' : 'is-hidden'
        ;
        return (
            <div className={additionalClass}>
                <br />
                {self.props.messageNeeded}
                <div className="columns is-desktop">
                    <div className="column">
                        <Thumbnails
                            videoStateMapping={self.props.videoStateMapping}
                            thumbnails={self.props.thumbnails}
                            videoState={self.props.videoState}
                            forceOpen={self.props.forceOpen}
                        />
                    </div>
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
