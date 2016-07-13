
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Message = React.createClass({
    render: function() {
        var self = this,
            style = self.props.isError ? "has-error" : ""
        ;
        return (
            <div className={style}>
                <p className="xxLabel" dangerouslySetInnerHTML={{__html: self.props.message}} >
                </p>
            </div>
        );
        
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Message;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
