// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var FeatureThumbnail = React.createClass({
    getInitialState: function() {
        return {
            renditionNumber: 0
        }
    },
    componentWillMount: function(){
        var self = this,
        //331.03 is the pixel size of the large feature thumbnails. 
            number = UTILS.closest(Math.pow(331.03, 2), self.props.thumbnails[1])
        ;
        self.setState({
            renditionNumber: number 
        })
    },
    render: function() {
        var self = this,
            score,
            src,
            title,
            thumbnailId,
            handleChildOnMouseEnter
        ;
        switch(self.props.type) {
            case 'default':
                title= T.get('copy.defaultThumbnail');
                score = self.props.thumbnails[self.props.thumbnails.length - 1].neon_score;
                thumbnailId = null;
                src = self.props.thumbnails[self.props.thumbnails.length - 1].renditions[self.state.renditionNumber].url;
                handleChildOnMouseEnter = null;
                break;
            case 'neon':
                title = T.get('copy.neonSelect');
                score = self.props.thumbnails[0].neon_score;
                thumbnailId = self.props.thumbnails[0].thumbnail_id;
                src = self.props.thumbnails[0].renditions[self.state.renditionNumber].url;
                handleChildOnMouseEnter = self.props.handleChildOnMouseEnter;
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
                    thumbnailId={thumbnailId}
                    handleChildOnMouseEnter={handleChildOnMouseEnter}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default FeatureThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
