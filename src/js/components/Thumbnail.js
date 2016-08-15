// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _Thumbnail = React.createClass({

    propTypes: {
        score: React.PropTypes.number,
        src: React.PropTypes.string.isRequired,
        key: React.PropTypes.string
    },

    noop: e => {
        e.preventDefault();
    },

    render: function() {
        return (
            <a
                className="xxThumbnail"
                onClick={this.noop}
                data-score={this.props.scores}
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
