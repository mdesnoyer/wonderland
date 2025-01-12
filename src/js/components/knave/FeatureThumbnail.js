import React, { PropTypes } from 'react';

import Thumbnail from './Thumbnail';
import T from '../../modules/translation';

const propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    score: PropTypes.number,
    dominantColor: PropTypes.array,
    src: PropTypes.string.isRequired,
    tagId: PropTypes.string,
    thumbnaiId: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onClick: PropTypes.func,
    blurText: PropTypes.string,
    isSoloImage: PropTypes.bool,
};

export default function FeatureThumbnail(props) {
    const getSoloMessage = () => {
        if (props.isSoloImage) {
            return (
                <div className="xxThumbnailSoloMessage">
                    {props.blurText}
                </div>
            );
        }
        return null;
    };
    const wrapperClass = props.isSoloImage ? 'xxThumbnailSoloBlurWrapper' : '';
    return (
        <div className="xxCollectionImages-featured">
            <h2 className="xxCollection-subtitle">
                {props.title}
            </h2>
                {getSoloMessage()}
            <div className={wrapperClass}>
                <Thumbnail
                    {...props}
                />
            </div>
        </div>
    );
}

FeatureThumbnail.propTypes = propTypes;
