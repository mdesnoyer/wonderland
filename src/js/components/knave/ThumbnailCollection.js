// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ThumbnailCollection = React.createClass({
    render: function() {
        var self = this;
        return (
            <div>
                {
                    self.props.thumbnails.map(function(thumbnail, i) {
                        if (i === 0 || i === self.props.thumbnails.length -1) {
                            return null;
                        }
                        else {
                            return (
                                <Thumbnail
                                    key={i}
                                    score={thumbnail.neon_score}
                                    src={thumbnail.url}
                                    thumbnail_id={thumbnail.thumbnail_id}
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
