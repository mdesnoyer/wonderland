// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Icon = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        type: React.PropTypes.string.isRequired,
        title: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            type: 'neon',
            title: ''
        }
    },
    render: function() {
        var self = this;
        // Wrapper around Font Awesome
        return (
            <i className={'fa fa-' + self.props.type} aria-hidden="true" title={self.props.title}></i>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Icon;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

