// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import moment from 'moment';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var FuzzyTime = React.createClass({
    render: function() {
        var self = this;
        if (UTILS.isValidDate(self.props.date)) {
            var time = moment.utc(self.props.date).fromNow(),
                timestamp = moment(self.props.date).format()
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

export default FuzzyTime;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
