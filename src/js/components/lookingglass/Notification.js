// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Notification = React.createClass({
	render: function() {
    if(this.props.status === true ){
      return <p></p>;
    } else {
      return (
            <div className={this.props.style}>
              { this.props.message }
            </div>
      )
    }
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Notification;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
