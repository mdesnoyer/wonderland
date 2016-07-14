// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';
import Message from '../wonderland/Message'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoProcessing = React.createClass({
    render: function() {
        var self = this,
            title = !self.props.title ? '' : self.props.title,
            errorMessage = self.props.error ? <Message message={self.props.error} isError={true} /> : ''
        ;
        return (
            <article className="xxCollection xxCollection--video xxCollection--processing">
                <h1 className="xxCollection-title">
                    {self.props.videoState.toUpperCase() + ' : ' + title}
                </h1>
                { 
                    self.props.error ? null : (
                        <div>
                            <a className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown">
                                <span>11:11</span>
                            </a>
                            <div className="xxCollectionFilters">
                                <strong className="xxCollectionFilters-title">Filters</strong>
                                <span className="xxCollectionFilters-value">None</span>
                            </div>
                        </div>
                    )
                }
                {errorMessage}
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoProcessing;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
