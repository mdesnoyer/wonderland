// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { PropTypes } from 'react';

import _ from 'lodash';

import FeatureThumbnail from './_FeatureThumbnail';
import InfoActionContainer from './InfoActionContainer';
import {
    ThumbnailList,
    ShowMoreThumbnailList,
    ShowLessThumbnailList,
    ShowMoreLessThumbnailList } from './ThumbnailList';

import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const propTypes = {

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
    setLiftThumbnailId: PropTypes.func,

    // class name for the wrapper around the
    // component defaults to xxCollection
    wrapperClassName: PropTypes.string,

    selectedPanel: PropTypes.number.isRequired,

    smallBadThumbnails: PropTypes.array,
};

const defaultProps = {
    translationOverrideMap: {},
    wrapperClassName: 'xxCollection',
    onThumbnailClick: () => {},
    setLiftThumbnailId: () => {},
};


class BaseCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { smallThumbnailRows: 1 };

        this.onLeftThumbnailClick = this.onLeftThumbnailClick.bind(this);
        this.onRightThumbnailClick = this.onRightThumbnailClick.bind(this);
        this.onMore = this.onMore.bind(this);
        this.onLess = this.onLess.bind(this);

        this.setDefaultLiftThumbnail = this.setDefaultLiftThumbnail.bind(this);
        this.setLiftThumbnailToLeft = this.setLiftThumbnailToLeft.bind(this);
        this.setLiftThumbnailToRight = this.setLiftThumbnailToRight.bind(this);
    }

    onLeftThumbnailClick() {
        const leftThumbnailId = this.props.leftFeatureThumbnail.thumbnail_id;
        this.props.onThumbnailClick(leftThumbnailId);
    }

    onRightThumbnailClick() {
        const rightThumbnailId = this.props.rightFeatureThumbnail.thumbnail_id;
        this.props.onThumbnailClick(rightThumbnailId);
    }

    // TODO Extract 6 (number per row) and 3 (number of rows added per ShowMore)
    // to constants. This is in some way implemented in CSS.
    onMore(e) {
        e.preventDefault();
        this.setState({
            smallThumbnailRows: this.state.smallThumbnailRows + 3,
        });
    }

    onLess(e) {
        e.preventDefault();
        this.setState({
            smallThumbnailRows: 1,
        });
    }

    setDefaultLiftThumbnail() {
        this.props.setLiftThumbnailId(null);
    }

    setLiftThumbnailToLeft() {
        const leftThumbnailId = this.props.leftFeatureThumbnail.thumbnail_id;
        this.props.setLiftThumbnailId.bind(leftThumbnailId);
    }

    setLiftThumbnailToRight() {
        const rightThumbnailId = this.props.rightFeatureThumbnail.thumbnail_id;
        this.props.setLiftThumbnailId(rightThumbnailId);
    }

    getThumbnailList() {
        // Number of rows of item to display.
        const rows = this.state.smallThumbnailRows;

        // 2 cases for video:
        // Expanded: ShowLess with more than one row
        // Initial: ShowMore with one row
        if (!_.isEmpty(this.props.smallBadThumbnails)) {
            if (rows > 1) {
                // Constrain good thumbnails to 5.
                const truncatedSmallThumbnails = this.props.smallThumbnails.slice(0, 5);
                const thumbnails = _.flatten([
                    truncatedSmallThumbnails,
                    this.props.smallBadThumbnails.slice(0, 6),
                ]);
                const numberToDisplay = truncatedSmallThumbnails.length;
                return (<ShowLessThumbnailList
                    thumbnails={thumbnails}
                    numberToDisplay={numberToDisplay}
                    // TODO would like to remove the need for the T.get
                    lessLabel={T.get('action.showLess')}
                    onLess={this.onLess}
                    onMouseEnter={this.props.setLiftThumbnailId}
                    onMouseLeave={this.setDefaultLiftThumbnail}
                    onClick={this.props.onThumbnailClick}
                    className="xxThumbnail--lowLight"
                />);
            }
            return (<ShowMoreThumbnailList
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={5} // N rows of 6, minus one for each button.
                moreLabel={T.get('action.showMore')}
                onMore={this.onMore}
                onMouseEnter={this.props.setLiftThumbnailId}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.props.onThumbnailClick}
            />);
        }

        // 4 cases:
        // There's fewer than one row of thumbs
        // There's fewer than the rows displayed -> show less in spot 6.
        // There's more than the rows displayed -> show more in last spot
        // There's more than the rows displayed, and they've
        //   clicked show more once -> show less in spot 6, and show more
        //   in right-hand spot in last row

        // There's fewer than or exactly one row of thumbs: no button.
        if (this.props.smallThumbnails.length <= 6) {
            return (<ThumbnailList
                thumbnails={this.props.smallThumbnails}
                onMouseEnter={this.props.setLiftThumbnailId}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.props.onThumbnailClick}
            />);
        // There's fewer than the number of display rows: put ShowLess in slot 6.
        // (Add one to length for the ShowLess button.)
        } else if (this.props.smallThumbnails.length + 1 <= rows * 6) {
            return (<ShowLessThumbnailList
                thumbnails={this.props.smallThumbnails}
                onLess={this.onLess}
                onMouseEnter={this.props.setLiftThumbnailId}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.props.onThumbnailClick}
            />);
        // There's more than 6 and they haven't shown more at all.
        } else if (rows === 1) {
            return (<ShowMoreThumbnailList
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={5} // Show exactly one row of 5 and ShowMore.
                onMore={this.onMore}
                onMouseEnter={this.props.setLiftThumbnailId}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.props.onThumbnailClick}
            />);
        // There's more thumbs than space to display them and they've expanded
        // once or more: put ShowMore and ShowLess.
        }
        return (<ShowMoreLessThumbnailList
            thumbnails={this.props.smallThumbnails}
            numberToDisplay={(rows * 6) - 2} // N rows of 6, minus one for each button.
            onMore={this.onMore}
            onLess={this.onLess}
            onMouseEnter={this.props.setLiftThumbnailId}
            onMouseLeave={this.setDefaultLiftThumbnail}
            onClick={this.props.onThumbnailClick}
        />);
    }

    // Wraps calls to T.get with any keys in
    // this.props.translationOverrideMap.
    //
    // Returns function that removes the wrapper.
    applyTranslationOverride() {
        const mapped = this.props.translationOverrideMap;
        const originalTGet = T.get;
        T.get = _.wrap(T.get, (get, key) =>
            get(key in mapped ? mapped[key] : key));

        return () => { T.get = originalTGet; };
    }

    render() {
        // Let mapped labels be overriden.
        const unapplyOverride = this.applyTranslationOverride();

        // The main left and right feature thumbnails
        const left = (
            <FeatureThumbnail
                title={T.get('copy.worstThumbnail')}
                score={this.props.leftFeatureThumbnail.neon_score}
                className="xxThumbnail--lowLight"
                src={RENDITIONS.findRendition(this.props.leftFeatureThumbnail)}
                onMouseEnter={this.setLiftThumbnailToLeft}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.onLeftThumbnailClick}
            />
        );

        const right = (
            <FeatureThumbnail
                title={T.get('copy.bestThumbnail')}
                score={this.props.rightFeatureThumbnail.neon_score}
                src={RENDITIONS.findRendition(this.props.rightFeatureThumbnail)}
                onMouseEnter={this.setLiftThumbnailToRight}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.onRightThumbnailClick}
            />
        );

        const result = (
            <div className={this.props.wrapperClassName}>
                <div className="xxCollectionImages">
                    {left}
                    {right}
                    {this.getThumbnailList()}
                </div>
                <div className="xxCollection-content">
                    <InfoActionContainer
                        children={this.props.infoActionPanels}
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
}

BaseCollection.propTypes = propTypes;
BaseCollection.defaultProps = defaultProps;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default BaseCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
