import React, { PropTypes } from 'react';

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
    wrapperClassName: PropTypes.string,

    enabled: PropTypes.bool,
    children: PropTypes.node,
};

const defaultProps = {
    className: '',
    wrapperClassName: '',
    onClick: (e) => e.preventDefault(),
    // I.e., do nothing.
    onMouseEnter: Function.prototype,
    onMouseLeave: Function.prototype,
    children: (<div />),
    enabled: true,
};

function Thumbnail(props) {
    const disabledClassName = props.enabled ? '' : 'xxThumbnail--disabled';
    const className = `xxThumbnail xxThumbnail--regular xxThumbnail--small \
        xxThumbnail--highLight xxThumbnail--neon ${props.className} \
        ${disabledClassName}`;

    return (
        <div className={props.wrapperClassName}>
            <span
                className={className}
                data-score={props.score}
                onClick={props.onClick}
            >
                <img
                    className="xxThumbnail-image"
                    alt={props.alt || props.score}
                    src={props.src}
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.onMouseLeave}
                />
            </span>
            {props.children}
        </div>
    );
}

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

export default Thumbnail;
