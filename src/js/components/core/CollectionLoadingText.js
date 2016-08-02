// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var CollectionLoadingText = React.createClass({
    render: function() {
        var self = this;
        return (
            <p>
                LOADING
                <span className="xxCollectionLoadingText">
                <span>.</span>
                <span>.</span>
                <span>.</span>
                </span>
            </p>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionLoadingText;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
