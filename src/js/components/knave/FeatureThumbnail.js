// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var FeatureThumbnail = React.createClass({
    // mixins: [ReactDebugMixin],
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
            showHref
        ;
        switch(self.props.type) {
            case 'default':
                uid = self.props.thumbnails.length - 1;
                title= T.get('copy.defaultThumbnail');
                thumbnailId = null;
                handleChildOnMouseEnter = null;
                showHref = false;
                break;
            case 'neon':
                uid = 0;
                title = T.get('copy.neonSelect');
                thumbnailId = self.props.thumbnails[uid].thumbnail_id;
                handleChildOnMouseEnter = self.props.handleChildOnMouseEnter;
                showHref = true;
                break;
        }
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
                    src={self.props.thumbnails[uid].url}
                    thumbnailId={thumbnailId}
                    handleChildOnMouseEnter={handleChildOnMouseEnter}
                    type={self.props.type}
                    isMobile={self.props.isMobile}
                    showHref={showHref}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default FeatureThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
