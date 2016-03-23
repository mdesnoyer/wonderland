// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import Video from './Video'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoWrapper = React.createClass({
    render: function() {
        return (
            <section className="section">
                <div className="container">
                    <Video params={this.props.params} forceOpen={true} />
                </div>
            </section>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoWrapper;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
