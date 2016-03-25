// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var NewsFlash = React.createClass({
    render: function() {
        return (
            <div className="notification is-danger is-marginless is-text-centered">
                {this.props.message}
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default NewsFlash;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
