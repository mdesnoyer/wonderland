
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Notification = React.createClass({
	render: function() {
		return (
            <div className= {this.props.style} >
				<div className="message-header">{this.props.status}</div>
				<div className="message-body">{this.props.message}</div>
			</div>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Notification;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
