// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import TimeAgo from 'react-timeago';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var TimeAgoWrapper = React.createClass({
    render() {
        if (this.props.date) {
            var niceTimestamp = moment(this.props.date).format();
            return (
                <span title={niceTimestamp}><TimeAgo date={this.props.date} /></span>
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
