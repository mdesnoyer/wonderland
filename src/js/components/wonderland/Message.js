
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Message = React.createClass({
    render: function() {
        var self = this,
            style = self.props.isError ? "has-error" : ""
        ;
        switch(self.props.type) {
            case 'processing':
                style = 'has-processing-error';
                break;
            case 'video':
                style = 'has-videos-error';
                break;
            case 'formError':
                style = 'has-error'
                break;
            default:
                style = ''
        }
        return (
            <div className={style}>
                <p 
                    className="xxLabel"
                    dangerouslySetInnerHTML={{__html: self.props.message}} 
                ></p>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Message;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
