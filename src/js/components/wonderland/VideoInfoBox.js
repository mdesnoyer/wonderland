// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoInfoBox = React.createClass({
    propTypes: {
        videoLink: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this,
            niceDuration = UTILS.formatDuration(self.props.duration)
        ;
        return (
            <aside className="box">
                <dl className="wonderland-dl">
                    <dt className="wonderland-dt">Duration</dt>
                        <dd className="wonderland-dd">{niceDuration}</dd>
                    <dt className="wonderland-dt">Original</dt>
                        <dd className="wonderland-dd"><a href={self.props.url} rel="external" onClick={this.handleClick} name="Original">Link</a></dd>
                    <dt className="wonderland-dt">Direct</dt>
                        <dd className="wonderland-dd"><a href={self.props.videoLink} onClick={this.handleClick} name="Direct">Link</a></dd>
                </dl>
            </aside>
        );
    },
    handleClick: function(e) { 
        TRACKING.sendEvent('VideoInfoBox','Link' ,'User clicked: ' + e.target.name); 
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoInfoBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
