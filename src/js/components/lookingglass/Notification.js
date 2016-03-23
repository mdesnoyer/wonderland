// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Notification = React.createClass({
    render: function() {
        var notificationClassName = 'notification ' + this.props.style;
            return (
                <div className={notificationClassName}>
                    {this.props.type} {this.props.message}
                </div>
            );
    }
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Notification;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
