import React, { PropTypes } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import T from '../../modules/translation';

class Clip extends React.Component {

    static displayName = 'Clip';

    static propTypes = {
        url: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        posterUrl: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        if (this.props.width < 670) {
            this.container.style.width = `${this.props.width}px`;
        }
        if (this.props.height < 420) {
            this.container.style.height = `${this.props.height}px`;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
            this.video.load();
        }
    }

    onChange(isVisible) {
        if (!this.video) {
            return;
        }
        if (isVisible) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    onClick() {
        if (this.video.paused) {
            this.video.play();
            return;
        }
        this.video.pause();
    }

    render() {
        const score = Math.round(this.props.score);
        return (
            <div
                className="xxGifContainer"
                data-score={score}
                ref={(container) => { this.container = container; }}
            >
                <h2 className="xxCollection-subtitle">
                    {T.get('copy.topNeonGif')}
                </h2>
                <VisibilitySensor onChange={this.onChange}>
                    <video
                        ref={(video) => { this.video = video; }}
                        poster={this.props.posterUrl}
                        className="xxGifVideo"
                        loop
                    >
                        <source
                            src={this.props.url}
                            type="video/mp4"
                        />
                    </video>
                </VisibilitySensor>
            </div>
        );
    }
}

export default Clip;
