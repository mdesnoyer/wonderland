// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';
import RENDITIONS from '../../modules/renditions';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ThumbnailCollection = React.createClass({
    propTypes: {
        handleClick: React.PropTypes.func,
        type: React.PropTypes.string,
        thumbnails: React.PropTypes.array,
        isMobile: React.PropTypes.bool
    },
    render: function() {
        var self = this;
        switch(self.props.type) {
            case 'lowScores':
                return (
                    <div>
                    {
                        self.props.thumbnails.map(function(thumbnail, i) {
                            var src = RENDITIONS.findRendition(thumbnail, 
                                                               100, 100);
                            return (
                                <Thumbnail
                                    key={i}
                                    uid={i}
                                    title=""
                                    size="small"
                                    score={thumbnail.neon_score}
                                    type={'regular'}
                                    src={src}
                                    isMobile={self.props.isMobile}
                                    extraClass='xxThumbnail--lowLight'
                                    showHref={false}
                                />
                            )
                        })
                    }
                    </div>
                );
                break;
            case 'highScores':
                return (
                    <div>
                    {
                        self.props.thumbnails.map(function(thumbnail, i) {
                            if (i === 0 || i === self.props.thumbnails.length - 1) {
                                return null;
                            }
                            else {
                                var src = RENDITIONS.findRendition(thumbnail, 
                                                                   100, 100);
                                return (
                                    <Thumbnail
                                        key={i}
                                        uid={i}
                                        title=""
                                        size="small"
                                        score={thumbnail.neon_score}
                                        type={'regular'}
                                        src={src}
                                        thumbnailId={thumbnail.thumbnail_id}
                                        handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                                        handleClick={self.props.handleClick}
                                        isMobile={self.props.isMobile}
                                        extraClass='xxThumbnail--highLight'
                                    />
                                )
                            }
                        })
                    }
                    </div>
                );
                break;
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbnailCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -