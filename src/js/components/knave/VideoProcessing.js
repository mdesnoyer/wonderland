// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoProcessing = React.createClass({
    render: function() {
        var self = this;
        return (
            <article className="xxCollection xxCollection--video xxCollection--processing">
                <h1 className="xxCollection-title">
                    {self.props.videoState.toUpperCase() + ': ' + self.props.title}
                </h1>
                <a
                    href=""
                    className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown"
                >
                    <span>TIME TODO</span>
                </a>

                <div className="xxCollectionFilters">
                    <strong className="xxCollectionFilters-title">Filters</strong>
                    <span className="xxCollectionFilters-value">None</span>
                </div>
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoProcessing;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
