// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const _Thumbnail = React.createClass({

    propTypes: {
        score: React.PropTypes.number,
        src: React.PropTypes.string.isRequired,
        key: React.PropTypes.string
    },

    render: function() {
        return (
            <a href="#" className="xxThumbnail">
                <img
                    className="xxThumbnail-image"
                    src={this.props.src}
                />
                {this.props.score}
            </a>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default _Thumbnail

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
