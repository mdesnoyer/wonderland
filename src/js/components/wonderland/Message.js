
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Message = React.createClass({
    render: function() {
        var self = this,
            message = self.props.body,
        	messageClass = 'message is-' + self.props.flavour,
        	finalMessage = ''
    	;
    	if (message.constructor == Array) {
    		finalMessage = (
    			<div>
    				<p className="message-header">{self.props.header}</p>
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
				<div>
					<p className="message-header">{self.props.header}</p>
                	<p className="message-body"><span dangerouslySetInnerHTML={{__html: self.props.body}} /></p>
            	</div>
            );
    	}
        return (
            <blockquote className={messageClass}>
            	{finalMessage}
            </blockquote>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Message;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
