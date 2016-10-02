import React, { PropTypes } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import T from '../../modules/translation';

class Clip extends React.Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        posterUrl: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
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

    render() {
        const score = Math.round(this.props.score);
        return (
            <div className="xxGifContainer" data-score={score}>
                <VisibilitySensor onChange={this.onChange} />
                <h2 className="xxCollection-subtitle">
                    {T.get('copy.topNeonGif')}
                </h2>
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
            </div>
        );
    }
}
export default Clip;
