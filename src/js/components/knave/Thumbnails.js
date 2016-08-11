// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import RENDITIONS from '../../modules/renditions';

import _Thumbnail from './_Thumbnail';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Thumbnails = React.createClass({

    propTypes: {
        thumbnail_ids: React.PropTypes.array.isRequired,
        thumbnails: React.PropTypes.object.isRequired
    },

    render: function() {
        const thumbs = this.props.thumbnail_ids.slice(0, 24).map(thumbnail_id => {
            const thumb = this.props.thumbnails[thumbnail_id];
            if (!thumb) {
                return;  // Problem.
            }
            return (
                <_Thumbnail
                    key={thumbnail_id}
                    type={thumb.type}
                    src={RENDITIONS.findRendition(thumb, 160, 120)}
                    score={thumb.neon_score}
                />

            );
        });
        return (<div className="xxCollectionImages-all">{thumbs}</div>);
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
