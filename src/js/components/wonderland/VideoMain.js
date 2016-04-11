// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import Thumbnails from './Thumbnails';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoMain = React.createClass({
    propTypes: {
        forceOpen: React.PropTypes.bool.isRequired,
        messageNeeded: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
        videoStateMapping: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        videoState: React.PropTypes.string.isRequired,
        videoLink: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired
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
                    <div className="column is-10">
                        <Thumbnails
                            videoStateMapping={self.props.videoStateMapping}
                            thumbnails={self.props.thumbnails}
                            videoState={self.props.videoState}
                            forceOpen={self.props.forceOpen}
                        />
                    </div>
                    <div className="column is-2">
                        <div className="box">
                            <p><a href={self.props.videoLink}><i className="fa fa-link" aria-hidden="true"></i></a> {Math.round(self.props.duration) + 's'} <a href={self.props.url} rel="external"><i className="fa fa-external-link" aria-hidden="true"></i></a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
