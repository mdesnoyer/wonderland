// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import TimeAgo from 'react-timeago';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var TimeAgoWrapper = React.createClass({
    render() {
        if (this.props.date) {
            return (
                <TimeAgo date={this.props.date} />
            );
        }
        else {
            return (
                <span>Unknown</span>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default TimeAgoWrapper;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
