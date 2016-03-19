// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Notification = React.createClass({
	render: function() {
    if(this.props.status === false){
      return (
  			<div className="notification is-warning">
  				{ this.props.message }
  			</div>
  		)
    } else {
      return <p></p>
    }
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Notification;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
