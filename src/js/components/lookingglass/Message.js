
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Message = React.createClass({
    render: function() {
        var messageClass = 'message is-' + this.props.flavour;
        return (
            <blockquote className={messageClass}>
                <p className="message-header">{this.props.header}</p>
                <p className="message-body">{this.props.body}</p>
            </blockquote>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Message;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
