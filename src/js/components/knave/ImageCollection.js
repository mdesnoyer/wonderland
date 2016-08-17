// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import BaseCollection from './BaseCollection';

import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const ImageCollection = React.createClass({

    render: function() {
        return (
            <BaseCollection
                {...this.props}
                leftFeatureTitle={T.get('copy.worstThumbnail')}
                rightFeatureTitle={T.get('copy.bestThumbnail')}
            />
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
