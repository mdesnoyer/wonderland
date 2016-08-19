// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import FeatureThumbnail from './_FeatureThumbnail';
import InfoActionContainer from './InfoActionContainer';
import {
    ThumbnailList,
    ShowMoreThumbnailList,
    ShowLessThumbnailList,
    ShowMoreLessThumbnailList} from './ThumbnailList';

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

    buildThumbnailList: function() {

        // 4 cases:
        // There's fewer than one row of thumbs
        // There's fewer than the rows displayed -> show less in spot 6.
        // There's more than the rows displayed -> show more in last spot
        // There's more than the rows displayed, and they've
        //   clicked show more once -> show less in spot 6, and show more
        //   in right-hand spot in last row

        // TODO Extract 6 (number per row) and 3 (number of rows added per ShowMore)
        // to constants. This is in some way implemented in CSS.

        const self = this;
        const onMore = (e) => {
            e.preventDefault();
            self.setState({
                smallThumbnailRows: self.state.smallThumbnailRows + 3
            });
        };
        const onLess = (e) => {
            e.preventDefault();
            self.setState({
                smallThumbnailRows: 1
            });
        };
        // TODO? pass from container parent
        const onThumbnailClick = (e) => {
            e.preventDefault();
            // TODO given key of thumbnail, load zoom view of it.
        };

        // Number of rows of item to display.
        const rows = this.state.smallThumbnailRows;

        // There's fewer than or exactly one row of thumbs: no button.
        if(self.props.smallThumbnails.length <= 6) {
            return <ThumbnailList
                thumbnails={self.props.smallThumbnails}
            />;
        // There's fewer than the number of display rows: put ShowLess in slot 6.
        // (Add one to length for the ShowLess button.)
        } else if (self.props.smallThumbnails.length + 1 <= rows*6) {
            return <ShowLessThumbnailList
                thumbnails={self.props.smallThumbnails}
                onLess={onLess}
            />;
        // There's more than 6 and they haven't shown more at all.
        } else if (rows == 1) {
            return <ShowMoreThumbnailList
                thumbnails={self.props.smallThumbnails}
                numberToDisplay={5} // Show exactly one row of 5 and ShowMore.
                onMore={onMore}
            />
        // There's more thumbs than space to display them and they've expanded
        // once or more: put ShowMore and ShowLess.
        } else {
            return <ShowMoreLessThumbnailList
                thumbnails={self.props.smallThumbnails}
                numberToDisplay={rows * 6 - 2} // N rows of 6, minus one for each button.
                onMore={onMore}
                onLess={onLess}
            />
        }
    },

    render: function() {
        // The main left and right feature thumbnails
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
        return (
            <div className="xxCollection">
                <div className="xxCollectionImages">
                    {left}
                    {right}
                    {this.buildThumbnailList()}
                </div>
                <div className="xxCollection-content">
                    <InfoActionContainer
                        children={this.props.infoActionPanels}
                        controls={this.props.infoActionControls}
                    />
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BaseCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
