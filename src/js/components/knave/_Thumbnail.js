// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _Thumbnail = React.createClass({

    propTypes: {
        // The neon score [0-99]
        score: React.PropTypes.number,
        // Image url with appropriate dimensions
        src: React.PropTypes.string.isRequired
    },

    noop: e => {
        e.preventDefault();
    },

    render: function() {
        return (
            <a
                className="xxThumbnail"
                onClick={this.noop}
                data-score={this.props.score}
            >
                <img
                    className="xxThumbnail-image"
                    src={this.props.src}
                />
            </a>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default _Thumbnail

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
