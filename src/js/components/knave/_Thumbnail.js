// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _Thumbnail = React.createClass({

    propTypes: {
        // The neon score [0-99]
        score: PropTypes.number,
        // Image url with appropriate dimensions
        src: PropTypes.string.isRequired,
        // User action handlers
        onMouseEnter: PropTypes.func,
        onClick: PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onMouseEnter: this.noop,
            onClick: this.noop
        };
    },

    noop: e => {
        e.preventDefault();
    },

    render: function() {
        const self = this;
        return (
            <a
                className="xxThumbnail"
                data-score={self.props.score}
                onClick={self.props.onClick}
            >
                <img
                    className="xxThumbnail-image"
                    src={self.props.src}
                    onMouseEnter={self.props.onMouseEnter}
                />
            </a>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default _Thumbnail

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
