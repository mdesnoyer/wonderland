// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import RENDITIONS from '../modules/renditions';

import Thumbnail from './Thumbnail';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Thumbnails = React.createClass({

    propTypes: {
        thumbnail_ids: React.PropTypes.array.isRequired,
        thumbnails: React.PropTypes.object.isRequired
    },

    render: function() {
        const thumbs = this.props.thumbnails.slice(0, 24).map(thumb => {
            if (!thumb) {
                return;  // Problem.
            }
            return (
                <Thumbnail
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
