// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import FeatureThumbnail from './_FeatureThumbnail';
import InfoActionContainer from './InfoActionContainer';
import {ThumbnailList, ShowMoreThumbnailList} from './ThumbnailList';

import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const BaseCollection = React.createClass({

    propTypes: {

        // Left and right large thumbnail
        leftFeatureThumbnail: PropTypes.object.isRequired,
        rightFeatureThumbnail: PropTypes.object.isRequired,
        leftFeatureTitle: PropTypes.string.isRequired,
        rightFeatureTitle: PropTypes.string.isRequired,

        // List of thumbnails to be displayed as small items
        smallThumbnails: PropTypes.array.isRequired,

        // TODO shape the array
        // Defines the display components of the right-hand box as array
        infoActionPanels: PropTypes.array.isRequired,
        // Defines the control components of the right-side box as array
        infoActionControls: PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            smallThumbnailRows: 1
        };
    },

    handleClick: function() { },

    render: function() {

        // The main left, right comparison thumbnails
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

        /*
        const info = (
            <InfoActionContainer panels={this.props.infoActions} />
        );
        /**/

        // The bottom small thumbnail list
        // Show 6*rows of thumbnails unless there are more,
        // then show 6*rows-1 and the show more button.
        let thumbnailList;
        if(6 * this.state.smallThumbnailRows >= this.props.smallThumbnails.length) {
            thumbnailList = <ThumbnailList
                className="xxCollectionImages-all"
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={this.props.smallThumbnails.length}
            />;
        } else {
            thumbnailList = <ShowMoreThumbnailList
                className="xxCollectionImages-all"
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={6 * this.state.smallThumbnailRows - 1}
                handleShowMore={() => {
                    this.setState({
                        smallThumbnailRows: this.state.smallThumbnailRows + 3
                    });
                }}
            />;
        }


        return (
            <div className="xxCollection">
                <div className="xxCollectionImages">
                    {left}
                    {right}
                    <InfoActionContainer
                        children={this.props.infoActionPanels}
                        controls={this.props.infoActionControls}
                    />
                    {thumbnailList}
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BaseCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
