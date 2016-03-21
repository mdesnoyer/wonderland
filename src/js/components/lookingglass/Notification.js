// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Notification = React.createClass({
	render: function() {
	console.log(this.props.style)	
		if (this.props.isUrlValid) {
      return null
    }
    return (
        <div className={"notification " + this.props.style}>
				  {this.props.type} {this.props.message}
			</div>
		);
	}
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Notification;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
