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

        // Tag id of the collection
        tagId: PropTypes.string.isRequired,

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
        infoActionControls: PropTypes.array.isRequired,

        // Handlers for image events
        onThumbnailClick: PropTypes.func,

        // what panel should we display
        selectedPanel: PropTypes.number.isRequired
    },

    getInitialState: function() {
        return {
            smallThumbnailRows: 1,
            liftThumbnailId: null
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
                onMouseEnter={self.onThumbnailMouseEnter}
                onClick={self.props.onThumbnailClick}
            />;
        // There's fewer than the number of display rows: put ShowLess in slot 6.
        // (Add one to length for the ShowLess button.)
        } else if (self.props.smallThumbnails.length + 1 <= rows*6) {
            return <ShowLessThumbnailList
                thumbnails={self.props.smallThumbnails}
                onLess={onLess}
                onMouseEnter={self.onThumbnailMouseEnter}
                onClick={self.props.onThumbnailClick}
            />;
        // There's more than 6 and they haven't shown more at all.
        } else if (rows == 1) {
            return <ShowMoreThumbnailList
                thumbnails={self.props.smallThumbnails}
                numberToDisplay={5} // Show exactly one row of 5 and ShowMore.
                onMore={onMore}
                onMouseEnter={self.onThumbnailMouseEnter}
                onClick={self.props.onThumbnailClick}
            />
        // There's more thumbs than space to display them and they've expanded
        // once or more: put ShowMore and ShowLess.
        } else {
            return <ShowMoreLessThumbnailList
                thumbnails={self.props.smallThumbnails}
                numberToDisplay={rows * 6 - 2} // N rows of 6, minus one for each button.
                onMore={onMore}
                onLess={onLess}
                onMouseEnter={self.onThumbnailMouseEnter}
                onClick={self.props.onThumbnailClick}
            />
        }
    },

    onThumbnailMouseEnter: function(thumbnailId) {
        const self = this;
        self.setState({liftThumbnailId: thumbnailId})
    },

    render: function() {
        const leftThumbnailId = this.props.leftFeatureThumbnail.thumbnail_id;
        // The main left and right feature thumbnails
        const left = (
            <FeatureThumbnail
                title={this.props.leftFeatureTitle}
                score={this.props.leftFeatureThumbnail.neon_score}
                src={RENDITIONS.findRendition(this.props.leftFeatureThumbnail)}
                onMouseEnter={this.onThumbnailMouseEnter.bind(null, leftThumbnailId)}
                onClick={this.props.onThumbnailClick.bind(null, leftThumbnailId)}
            />
        );
        const rightThumbnailId = this.props.rightFeatureThumbnail.thumbnail_id;
        const right = (
            <FeatureThumbnail
                title={this.props.rightFeatureTitle}
                score={this.props.rightFeatureThumbnail.neon_score}
                src={RENDITIONS.findRendition(this.props.rightFeatureThumbnail)}
                onMouseEnter={this.onThumbnailMouseEnter.bind(null, rightThumbnailId)}
                onClick={this.props.onThumbnailClick.bind(null, rightThumbnailId)}
            />
        );
        const liftThumbnailId = this.state.liftThumbnailId?
            this.state.liftThumbnailId:
            this.props.rightFeatureThumbnail.thumbnail_id;

        // The bottom small thumbnail list
        // Show 6*rows of thumbnails unless there are more,
        // then show 6*rows-1 and the show more button.
        // TODO Extract 6 to constant.
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
                    {this.buildThumbnailList()}
                </div>
                <div className="xxCollection-content">
                    <InfoActionContainer
                        children={this.props.infoActionPanels}
                        controls={this.props.infoActionControls}
                        liftThumbnailId={liftThumbnailId}
                        selectedPanel={this.props.selectedPanel}
                    />
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BaseCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
