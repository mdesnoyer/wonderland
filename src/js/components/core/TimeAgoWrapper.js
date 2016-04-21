// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var TimeAgoWrapper = React.createClass({
    render() {
        if (this.props.date) {
            var time = moment.utc(this.props.date).fromNow(),
                timestamp = moment(this.props.date).format()
            ;
            return (
                <time dateTime={timestamp}>{time}</time>
            );
        }
        else {
            return (
                <time>Unknown</time>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default TimeAgoWrapper;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
