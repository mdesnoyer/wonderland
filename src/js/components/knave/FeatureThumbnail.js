// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';
import T from '../../modules/translation';
import RENDITIONS from '../../modules/renditions';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var FeatureThumbnail = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        handleClick: React.PropTypes.func
    },
    render: function() {
        var self = this,
            title,
            thumbnailId,
            uid,
            handleChildOnMouseEnter,
            showHref,
            src,
            extraClass
        ;
        switch(self.props.type) {
            case 'default':
                uid = 0;
                title= T.get('copy.defaultImage');
                thumbnailId = self.props.thumbnails[uid].thumbnail_id;
                handleChildOnMouseEnter = self.props.handleChildOnMouseEnter;
                showHref = true;
                extraClass = 'xxThumbnail--lowLight';
                break;
            case 'neon':
                uid = 1;
                title = T.get('copy.topNeonImage');
                thumbnailId = self.props.thumbnails[uid].thumbnail_id;
                handleChildOnMouseEnter = self.props.handleChildOnMouseEnter;
                showHref = true;
                extraClass = 'xxThumbnail--highLight';
                break;
        }
        src = (RENDITIONS.findRendition(self.props.thumbnails[uid], 350, 350));
        return (
            <div className="xxCollectionImages-featured">
                <h2 className="xxCollection-subtitle">
                    {title}
                </h2>
                <Thumbnail
                    score={self.props.thumbnails[uid].neon_score}
                    uid={uid}
                    title={title}
                    size="large"
                    handleClick={self.props.handleClick}
                    src={src}
                    thumbnailId={thumbnailId}
                    handleChildOnMouseEnter={handleChildOnMouseEnter}
                    type={self.props.type}
                    isMobile={self.props.isMobile}
                    showHref={showHref}
                    extraClass={extraClass}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default FeatureThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
