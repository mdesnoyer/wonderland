import React, { PropTypes } from 'react';
import UTILS from '../../modules/utils';

const propTypes = {
    // The neon score [0-99]
    score: PropTypes.number,

    dominantColor: PropTypes.array,

    // The accessibility title
    alt: PropTypes.string,

    // Image url with appropriate dimensions
    src: PropTypes.string.isRequired,

    // User action handlers
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,

    // Style
    extraClass: PropTypes.string,
    size: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,

    enabled: PropTypes.bool,
    children: PropTypes.node,
};

const defaultProps = {
    className: '',
    extraClass: '',
    size: '',
    type: '',
    wrapperClassName: '',
    onClick: (e) => e.preventDefault(),
    // I.e., do nothing.
    onMouseEnter: Function.prototype,
    onMouseLeave: Function.prototype,
    children: (<div />),
    enabled: true,
};

function fadeIn(e) {
    const target = e.target;
    target.classList.add('-is-loaded');
}

function Thumbnail(props) {
    const dominantColorHex = UTILS.findDominantColor(props.dominantColor);
    const inlineBackgroundColour = dominantColorHex ? {
        backgroundColor: dominantColorHex
    } : null;
    const assembledStyle = Object.assign({}, props.style, inlineBackgroundColour);
    let assembledClass = ['xxThumbnail'];
    if (props.className) {
        assembledClass.push(props.className);
    }
    if (props.extraClass) {
        assembledClass.push(props.extraClass);
    }
    if (props.size) {
        assembledClass.push('xxThumbnail--' + props.size);
    }
    if (props.type) {
        assembledClass.push('xxThumbnail--' + props.type);
    }
    if (!props.enabled) {
        assembledClass.push('xxThumbnail--disabled');
    }

    return (
        <div className={props.wrapperClassName}>
            <span
                className={assembledClass.join(' ')}
                data-score={props.score}
                onClick={props.onClick}
                style={assembledStyle}
            >
                <img
                    onLoad={fadeIn}
                    className="xxThumbnail-image -is-loading"
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
