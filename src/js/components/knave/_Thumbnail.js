// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _Thumbnail = React.createClass({

    propTypes: {
        // The neon score [0-99]
        score: PropTypes.number,
        // Image url with appropriate dimensions
        src: PropTypes.string.isRequired,
        // Thumbnail id if needed for event handlers
        thumbnailId: PropTypes.string,
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
                onClick={() => {self.props.onClick(self.props.thumbnailId);}}
            >
                <img
                    className="xxThumbnail-image"
                    src={self.props.src}
                    onMouseEnter={() => {self.props.onMouseEnter(self.props.thumbnailId);}}
                />
            </a>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default _Thumbnail

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
