// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ThumbnailCollection = React.createClass({
    propTypes: {
        handleClick: React.PropTypes.func
    },
    render: function() {
        var self = this;
        return (
            <div>
                {
                    self.props.thumbnails.map(function(thumbnail, i) {
                        if (i === 0 || i === self.props.thumbnails.length - 1) {
                            return null;
                        }
                        else {
                            return (
                                <Thumbnail
                                    key={i}
                                    uid={i}
                                    title=""
                                    size="small"
                                    score={thumbnail.neon_score}
                                    type={'regular'}
                                    src={thumbnail.url}
                                    thumbnailId={thumbnail.thumbnail_id}
                                    handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                                    handleClick={self.props.handleClick}
                                />
                            )
                        }
                    })
                }
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbnailCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
