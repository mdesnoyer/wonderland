// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var FeatureThumbnail = React.createClass({
    // mixins: [ReactDebugMixin],
    render: function() {
        var self = this,
            score,
            src,
            title,
            thumbnail_id
        ;
        switch(self.props.type) {
            case 'default':
                title= T.get('copy.defaultThumbnail');
                score = self.props.thumbnails[self.props.thumbnails.length - 1].neon_score;
                thumbnail_id = null;
                src = self.props.thumbnails[self.props.thumbnails.length - 1].url;
                break;
            case 'neon':
                title = T.get('copy.neonSelect');
                score = self.props.thumbnails[0].neon_score;
                thumbnail_id = self.props.thumbnails[0].thumbnail_id;
                src = self.props.thumbnails[0].url;
                break;
        }
        return (
            <div className="xxCollectionImages-featured">
                <h2 className="xxCollection-subtitle">
                    {title}
                </h2>
                <Thumbnail
                    score={score}
                    size="large"
                    src={src}
                    thumbnail_id={thumbnail_id}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default FeatureThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
