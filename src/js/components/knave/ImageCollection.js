// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import BaseCollection from './BaseCollection';
import FeatureThumbnail from './_FeatureThumbnail';
import ThumbnailList from './ThumbnailList';
import InfoPanels from './InfoPanels';

import RENDITIONS from '../../modules/renditions';
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
