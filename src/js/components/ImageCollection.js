// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import Thumbnails from './Thumbnails';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const ImageCollection = React.createClass({

    propTypes: {
        thumbnails: React.PropTypes.object.isRequired
        /*
        name: React.PropTypes.string.isRequired,
        thumbnail_ids: React.PropTypes.array.isRequired,
        /**/
    },

    render: function() {
        console.log(this.props);
        return (
            <div className="xxCollection">
                <div
                    className="xxCollection-content"
                >{this.props.collection.name}</div>
                <div
                    className="xxCollectionImages"
                >
                    <Thumbnails
                        className="xxCollectionImages-all"
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
