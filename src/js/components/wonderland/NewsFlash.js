// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var NewsFlash = React.createClass({
	// mixins: [ReactDebugMixin],
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
