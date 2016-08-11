// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import Thumbnails from './Thumbnails';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const ImageCollection = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        thumbnail_ids: React.PropTypes.array.isRequired,
        thumbnails: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
            <div className="xxCollection">
                <div
                    className="xxCollection-content"
                >{this.props.name}</div>
                <div
                    className="xxCollectionImages"
                >
                    <Thumbnails
                        className="xxCollectionImages-all"
                        thumbnail_ids={this.props.thumbnail_ids}
                        thumbnails={this.props.thumbnails}
                    />
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
