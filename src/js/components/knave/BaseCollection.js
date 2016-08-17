// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import FeatureThumbnail from './_FeatureThumbnail';
import ThumbnailList from './ThumbnailList';
import InfoPanels from './InfoPanels';

import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const BaseCollection = React.createClass({

    propTypes: {
        // User's name of this collection
        title: PropTypes.string.isRequired,

        // Left and right large thumbnail
        leftFeatureThumbnail: PropTypes.object.isRequired,
        rightFeatureThumbnail: PropTypes.object.isRequired,
        leftFeatureTitle: PropTypes.string.isRequired,
        rightFeatureTitle: PropTypes.string.isRequired,

        // List of thumbnails to be displayed as small items
        smallThumbnails: PropTypes.array.isRequired,

        // Defines the control components of the right-side box
        controls: PropTypes.array.isRequired
    },

    handleClick: function() { },

    render: function() {

        const left = (
            <FeatureThumbnail
                title={this.props.leftFeatureTitle}
                score={this.props.leftFeatureThumbnail.neon_score}
                src={RENDITIONS.findRendition(this.props.leftFeatureThumbnail)}
            />
        );

        const right = (
            <FeatureThumbnail
                title={this.props.rightFeatureTitle}
                score={this.props.rightFeatureThumbnail.neon_score}
                src={RENDITIONS.findRendition(this.props.rightFeatureThumbnail)}
            />
        );

        const info = (
            <InfoPanels {...this.props.infoPanels} />
        );

        const list = (
            <ThumbnailList
                className="xxCollectionImages-all"
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={5}
            />
        );

        return (
            <div className="xxCollection">
                <div className="xxCollectionImages">
                    {left}
                    {right}
                    {info}
                    {list}
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BaseCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
