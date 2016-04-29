// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Thumbnails from './Thumbnails';
import VideoInfoBox from './VideoInfoBox';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoMain = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        forceOpen: React.PropTypes.bool.isRequired,
        messageNeeded: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
        videoStateMapping: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        videoState: React.PropTypes.string.isRequired,
        videoLink: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        created: React.PropTypes.string,
        isServingEnabled: React.PropTypes.bool.isRequired
    },
    render: function() {
        var self = this,
            additionalClass = self.props.forceOpen ? 'is-shown' : 'is-hidden'
        ;
        return (
            <div className={additionalClass}>
                <br />
                <div className="columns is-desktop">
                    <div className="column is-10">
                        {self.props.messageNeeded}
                        <Thumbnails
                            videoStateMapping={self.props.videoStateMapping}
                            thumbnails={self.props.thumbnails}
                            videoState={self.props.videoState}
                            forceOpen={self.props.forceOpen}
                            isServingEnabled={self.props.isServingEnabled}
                        />
                    </div>
                    <aside className="column is-2">
                        <VideoInfoBox
                            videoLink={self.props.videoLink}
                            duration={self.props.duration}
                            url={self.props.url}
                        />
                    </aside>
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
