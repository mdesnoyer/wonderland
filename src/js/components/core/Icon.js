// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Icon = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        title: React.PropTypes.string,
        nowrap: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            type: 'neon',
            title: '',
            nowrap: false
        }
    },
    render: function() {
        var self = this;
        // Wrapper around Font Awesome
        if (self.props.nowrap) {
            return (
                <i className={'fa fa-' + self.props.type} aria-hidden="true" title={self.props.title}></i>
            );
        }
        else {
            return (
                <span className="icon wonderland-icon"><i className={'fa fa-' + self.props.type} aria-hidden="true" title={self.props.title}></i></span>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Icon;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
