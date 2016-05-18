// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import moment from 'moment';
import UTILS from '../../modules/UTILS';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var FuzzyTime = React.createClass({
    // mixins: [ReactDebugMixin],
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
