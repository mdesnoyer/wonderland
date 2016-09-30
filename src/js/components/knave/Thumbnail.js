import React, { PropTypes } from 'react';

const propTypes = {
    // The neon score [0-99]
    score: PropTypes.number,

    thumbnailId: PropTypes.string.isRequired,

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
    onClick: (e) => e.preventDefault(), // i.e., do nothing.
    onMouseEnter: Function.prototype,
    onMouseLeave: Function.prototype,
    children: (<div />),
    enabled: true,
};

class Thumbnail extends React.Component {

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

    render() {
        const disabledClassName = this.props.enabled ? '' : 'xxThumbnail--disabled';
        const className = `xxThumbnail xxThumbnail--regular xxThumbnail--small \
            xxThumbnail--highLight xxThumbnail--neon ${this.props.className} \
            ${disabledClassName}`;

        return (
            <div className={this.props.wrapperClassName}>
                <span
                    className={className}
                    data-score={this.props.score}
                    onClick={this.onClick}
                >
                    <img
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

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

export default Thumbnail;
