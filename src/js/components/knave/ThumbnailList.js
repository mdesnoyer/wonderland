// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';
import Thumbnail from './_Thumbnail';

import RENDITIONS from '../../modules/renditions';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const ThumbnailList = React.createClass({
    propTypes: {
        // An array of thumbnail resource
        thumbnails: PropTypes.array.isRequired,
        // The number of thumbnails to display
        numberToDisplay: PropTypes.number.isRequired
    },

    render: function() {
        const thumbs = this.props.thumbnails.slice(0, this.props.numberToDisplay).map(t => {
            return (<Thumbnail
                key={t.thumbnail_id}
                score={t.neon_score}
                src={RENDITIONS.findRendition(t)}
            />);
        });
        return (
            <div className="xxCollectionImages-all">{thumbs}</div>
        );
    }
});

// TODO wrap this with the show more behavior
export const ShowMoreThumbnailList = React.createClass({
    render: function() {
        return <ThumbnailList {...this.props} />;
    }
});
