import React, { PropTypes } from 'react';

import Thumbnail from './Thumbnail';

const propTypes = {
    title: PropTypes.string.isRequired,
    dominantColor: PropTypes.array,
    isSoloImage: PropTypes.bool,
    blurText: PropTypes.string,
};

export default function FeatureThumbnail(props) {
    const blurText = props.isSoloImage ? (
        <div className="xxThumbnailSoloMessage">
            {props.blurText}
        </div>) : null;
    const wrapperClass = props.isSoloImage ? 'xxThumbnailSoloBlurWrapper' : '';

    return (
        <div className="xxCollectionImages-featured">
            <h2 className="xxCollection-subtitle">
                {props.title}
            </h2>
            {blurText}
            <div className={wrapperClass}>
                <Thumbnail
                    {...props}
                />
            </div>
        </div>
    );
}
FeatureThumbnail.propTypes = propTypes;
