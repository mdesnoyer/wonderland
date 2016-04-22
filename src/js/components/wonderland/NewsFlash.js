// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var NewsFlash = React.createClass({
    propTypes: {
        isActive: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            isActive: false
        }
    },
    render: function() {
        var self = this;
        if (self.props.isActive) {
            return (
                <div className="notification is-danger is-marginless has-text-centered">
                    {this.props.message}
                </div>
            );
        }
        else {
            return false;
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default NewsFlash;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
