
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Message = React.createClass({
    render: function() {
        var self = this,
            message = self.props.message,
            finalMessage = ''
        ;
        if (self.props.type === 'many') {
            finalMessage = (
                <div>
                    <ul className="message-body">
                        {message.map(function(message, index) {
                            return <li key = {index}>
                                <span dangerouslySetInnerHTML={{__html: message}} />
                            </li>
                        })}
                    </ul>
                </div>
            );
        } 
        else {
            finalMessage = (
                <div className="has-error">
                    <p className="xxLabel" dangerouslySetInnerHTML={{__html: self.props.message}} >
                    </p>
                </div>
            );
        }
        return <div>{finalMessage}</div>;
    }
});

//<p>Error</p>
//<h1>401:</h1>
//<h2>Oops! We can't find what you're looking for. Please refresh the page or try again.</h2>


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Message;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
