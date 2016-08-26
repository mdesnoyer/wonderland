// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { PropTypes } from 'react';
import Thumbnail from './_Thumbnail';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    score: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    tagId: PropTypes.string,
    thumbnaiId: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onClick: PropTypes.func,
};



function FeatureThumbnail(props) {
    const wrapperClass = props.isSoloImage ? 'xxThumbnailSolorBlurWrapper' : '';
    const soloMessage = props.isSoloImage ? <div className="xxThumbnailSolorMessage"> Add more images by clicking the plus sign to the right </div> : null;
    return (
        <div className="xxCollectionImages-featured">
            <h2 className="xxCollection-subtitle">
                {props.title}
            </h2>
                {soloMessage}
            <div className={wrapperClass}>
                <Thumbnail
                    {...props}
                />
            </div>
        </div>
    );
}

FeatureThumbnail.propTypes = propTypes;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default FeatureThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
