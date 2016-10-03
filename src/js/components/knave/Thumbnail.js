import React, { PropTypes } from 'react';
import UTILS from '../../modules/utils';

class Thumbnail extends React.Component {

    static displayName = 'Thumbnail';

    static propTypes = {
        // The neon score [0-99]
        score: PropTypes.number,

        thumbnailId: PropTypes.string.isRequired,

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
        className: PropTypes.string,
        wrapperClassName: PropTypes.string,

        enabled: PropTypes.bool,
        children: PropTypes.node,
    }

    static defaultProps = {
        className: '',
        wrapperClassName: '',
        onClick: Function.prototype, // i.e., do nothing.
        onMouseEnter: Function.prototype,
        onMouseLeave: Function.prototype,
        enabled: true,
    }

    constructor(props) {
        super(props);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onMouseEnter() {
        this.props.onMouseEnter(this.props.thumbnailId);
    }

    onMouseLeave() {
        this.props.onMouseLeave(this.props.thumbnailId);
    }

    onClick(e) {
        e.preventDefault();
        this.props.onClick(this.props.thumbnailId);
    }

    fadeIn(e) {
        const target = e.target;
        target.classList.add('-is-loaded');
    }


    render() {
        const disabledClassName = this.props.enabled ? '' : 'xxThumbnail--disabled';
        const dominantColorHex = UTILS.findDominantColor(this.props.dominantColor);
        const inlineBackgroundColour = dominantColorHex ? {
            backgroundColor: dominantColorHex
        } : null;
        const className = `xxThumbnail xxThumbnail--regular xxThumbnail--small \
            xxThumbnail--highLight xxThumbnail--neon ${this.props.className} \
            ${disabledClassName}`;

        return (
            <div className={this.props.wrapperClassName}>
                <span
                    className={className}
                    data-score={this.props.score}
                    onClick={this.onClick}
                    style={inlineBackgroundColour}
                >
                    <img
                        onLoad={this.fadeIn}
                        className="xxThumbnail-image"
                        alt={this.props.alt || this.props.score}
                        src={this.props.src}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                    />
                </span>
                {this.props.children}
            </div>
        );
    }
}

export default Thumbnail;
