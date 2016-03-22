
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Message = React.createClass({
    render: function() {
        var message = this.props.body,
        	messageClass = 'message is-' + this.props.flavour,
        	finalMessage = ''
    	;
    	if (message.constructor == Array) {
    		finalMessage = (
    			<div>
    				<p className="message-header">{this.props.header}</p>
	    			<ul className="message-body">
	    				{message.map(function(message, index){
							return <li key = {index}>{message}</li>  
						})}
	    			</ul>
    			</div>
			);
    	} 
    	else {
			finalMessage = (
				<div>
					<p className="message-header">{this.props.header}</p>
                	<p className="message-body">{this.props.body}</p>
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
