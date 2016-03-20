// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Notification = React.createClass({
	render: function() {
		if (this.props.isUrlValid){
      return <div></div>
    }
    return (
        <div className= {this.props.style} >
				  {this.props.status} {this.props.message}
			</div>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Notification;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
