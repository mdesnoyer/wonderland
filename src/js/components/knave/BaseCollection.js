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

        // A map of T get key string to T get key
        // e.g., {'action.showMore': 'copy.thumbnails.low', ...}
        // overrides "Show More" with "View Low Scores"
        translationOverrideMap: PropTypes.object,

        infoActionPanels: PropTypes.array.isRequired,
        infoActionControls: PropTypes.array.isRequired,

        // List of thumbnails to be displayed as small items
        smallThumbnails: PropTypes.array.isRequired,

        // Handlers for image events
        onThumbnailClick: PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            translationOverrideMap: {}
        }
    },

    getInitialState: function() {
        return {
            smallThumbnailRows: 1,
            liftThumbnailId: null
        };
    },

    buildThumbnailList: function() {

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

        // Number of rows of item to display.
        const rows = this.state.smallThumbnailRows;

        // 2 cases for video:
        // Expanded: ShowLess with more than one row
        // Initial: ShowMore with one row
        if(!_.isEmpty(self.props.smallBadThumbnails)) {
            if(rows > 1) {
                const thumbnails = _.flatten([
                    self.props.smallThumbnails,
                    self.props.smallBadThumbnails
                ]);
                const numberToDisplay = self.props.smallThumbnails.length;
                return <ShowLessThumbnailList
                    thumbnails={thumbnails}
                    numberToDisplay={numberToDisplay}
                    // TODO would like to remove the need for the T.get
                    lessLabel={T.get('action.showLess')}
                    onLess={onLess}
                    onMouseEnter={self.onThumbnailMouseEnter}
                    onClick={self.props.onThumbnailClick}
                    className="xxThumbnail--lowLight"
                />;
            }
            return <ShowMoreThumbnailList
                thumbnails={self.props.smallThumbnails}
                numberToDisplay={5} // N rows of 6, minus one for each button.
                moreLabel={T.get('action.showMore')}
                onMore={onMore}
                onMouseEnter={self.onThumbnailMouseEnter}
                onClick={self.props.onThumbnailClick}
            />;
        }

        // 4 cases:
        // There's fewer than one row of thumbs
        // There's fewer than the rows displayed -> show less in spot 6.
        // There's more than the rows displayed -> show more in last spot
        // There's more than the rows displayed, and they've
        //   clicked show more once -> show less in spot 6, and show more
        //   in right-hand spot in last row

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

    // Wraps calls to T.get with any keys in
    // this.props.translationOverrideMap.
    //
    // Returns function that removes the wrapper.
    applyTranslationOverride: function() {

        const mapped = this.props.translationOverrideMap;
        const originalTGet = T.get;
        T.get = _.wrap(T.get, (get, key) => {
            return get(key in mapped? mapped[key]: key);
        });

        return () => { T.get = originalTGet; };
    },

    render: function() {

        // Let mapped labels be overriden.
        const unapplyOverride = this.applyTranslationOverride();

        const leftThumbnailId = this.props.leftFeatureThumbnail.thumbnail_id;
        // The main left and right feature thumbnails
        const left = (
            <FeatureThumbnail
                title={T.get('copy.worstThumbnail')}
                score={this.props.leftFeatureThumbnail.neon_score}
                className="xxThumbnail--lowLight"
                src={RENDITIONS.findRendition(this.props.leftFeatureThumbnail)}
                onMouseEnter={this.onThumbnailMouseEnter.bind(null, leftThumbnailId)}
                onClick={this.props.onThumbnailClick.bind(null, leftThumbnailId)}
            />
        );
        const rightThumbnailId = this.props.rightFeatureThumbnail.thumbnail_id;
        const right = (
            <FeatureThumbnail
                title={T.get('copy.bestThumbnail')}
                score={this.props.rightFeatureThumbnail.neon_score}
                src={RENDITIONS.findRendition(this.props.rightFeatureThumbnail)}
                onMouseEnter={this.onThumbnailMouseEnter.bind(null, rightThumbnailId)}
                onClick={this.props.onThumbnailClick.bind(null, rightThumbnailId)}
            />
        );
        const liftThumbnailId = this.state.liftThumbnailId?
            this.state.liftThumbnailId:
            this.props.rightFeatureThumbnail.thumbnail_id;

        const result = (
            <div className="xxCollection">
                <div className="xxCollectionImages">
                    {left}
                    {right}
                    {this.buildThumbnailList()}
                </div>
                <div className="xxCollection-content">
                    <InfoActionContainer
                        children={this.props.infoActionPanels}
                        liftThumbnailId={liftThumbnailId}
                        controls={this.props.infoActionControls}
                        selectedPanel={this.props.selectedPanel}
                    />
                </div>
            </div>
        );

        // Remove translation override.
        unapplyOverride();

        return result;
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BaseCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
