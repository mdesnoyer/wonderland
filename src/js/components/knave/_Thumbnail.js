// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { PropTypes } from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const propTypes = {
    // The neon score [0-99]
    score: PropTypes.number,

    // The accessibility title
    alt: PropTypes.string,

    // Image url with appropriate dimensions
    src: PropTypes.string.isRequired,

    // User action handlers
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,

    // Style
    className: PropTypes.string,
};

const defaultProps = {
    className: '',
    onClick: (e) => e.preventDefault(),
    // I.e., do nothing.
    onMouseEnter: Function.prototype,
    onMouseLeave: Function.prototype,
};

function Thumbnail(props) {
    const className = `xxThumbnail xxThumbnail--regular xxThumbnail--small \
        xxThumbnail--highLight xxThumbnail--neon ${props.className}`;
    return (
        <a
            className={className}
            data-score={props.score}
            onClick={props.onClick}
        >
            <img
                className="xxThumbnail-image"
                alt={props.title + props.score}
                src={props.src}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
            />
        </a>
    );
}

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnail;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
