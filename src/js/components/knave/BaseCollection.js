import React, { PropTypes } from 'react';
import _ from 'lodash';

import FeatureThumbnail from './FeatureThumbnail';
import InfoActionContainer from './InfoActionContainer';
import {
    ThumbnailList,
    ShowMoreThumbnailList,
    ShowLessThumbnailList,
    ShowMoreLessThumbnailList } from './ThumbnailList';
import GifClip from './GifClip';
import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

const propTypes = {

    // Left and right large thumbnail
    leftFeatureThumbnail: PropTypes.object.isRequired,
    rightFeatureThumbnail: PropTypes.object.isRequired,

    // A map of T get key string to T get key
    // e.g., {'action.showMore': 'copy.thumbnails.low', ...}
    // overrides "Show More" with "View Low Scores"
    copyOverrideMap: PropTypes.object,

    infoActionPanels: PropTypes.array.isRequired,
    infoActionControls: PropTypes.array.isRequired,

    // List of thumbnails to be displayed as small items
    smallThumbnails: PropTypes.array.isRequired,

    // Handlers for image events
    onThumbnailClick: PropTypes.func,
    // Override the onThumbnailClick for right.
    onRightThumbnailClick: PropTypes.func,

    // class name for the wrapper around the
    // component defaults to xxCollection
    wrapperClassName: PropTypes.string,

    selectedPanel: PropTypes.number.isRequired,

    smallBadThumbnails: PropTypes.array,
    isMine: PropTypes.bool,
    clips: PropTypes.object,
    clip: PropTypes.object,
    isSoloImage: PropTypes.bool,
    onGifClickNext: PropTypes.func,
    onGifClickPrev: PropTypes.func,
    clipIds: PropTypes.array,
    tagId: PropTypes.string,
    onDeleteCollection: PropTypes.func,
    selectedGifClip: PropTypes.number,
    clipPoster: PropTypes.string,
    onDemographicChange: PropTypes.func,
};

const defaultProps = {
    wrapperClassName: 'xxCollection',
    isMine: true,
};

class BaseCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { smallThumbnailRows: 1 };

        this.onThumbnailClick = this.onThumbnailClick.bind(this);
        this.onLeftThumbnailClick = this.onLeftThumbnailClick.bind(this);
        this.onRightThumbnailClick = this.onRightThumbnailClick.bind(this);
        this.onMore = this.onMore.bind(this);
        this.onLess = this.onLess.bind(this);
        this.onDeleteCollection = this.onDeleteCollection.bind(this);
        this.onDemographicChange = this.onDemographicChange.bind(this);

        this.setLiftThumbnailId = this.setLiftThumbnailId.bind(this);
        this.setDefaultLiftThumbnail = this.setDefaultLiftThumbnail.bind(this);
        this.setLiftThumbnailToLeft = this.setLiftThumbnailToLeft.bind(this);
        this.setLiftThumbnailToRight = this.setLiftThumbnailToRight.bind(this);
    }

    onDeleteCollection() {
        this.props.onDeleteCollection(this.props.tagId);
    }

    onDemographicChange(gender, age) {
        this.props.onDemographicChange(this.props.tagId, gender, age);
    }

    onThumbnailClick(thumbnailId) {
        this.props.onThumbnailClick(this.props.tagId, thumbnailId);
    }

    onLeftThumbnailClick() {
        const leftThumbnailId = this.props.leftFeatureThumbnail.thumbnail_id;
        this.props.onThumbnailClick(this.props.tagId, leftThumbnailId);
    }

    onRightThumbnailClick() {
        if (this.props.onRightThumbnailClick) {
            this.props.onRightThumbnailClick();
        } else {
            const rightThumbnailId = this.props.rightFeatureThumbnail.thumbnail_id;
            this.props.onThumbnailClick(this.props.tagId, rightThumbnailId);
        }
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

    setLiftThumbnailId(liftThumbnailId) {
        this.setState({ liftThumbnailId });
    }

    setDefaultLiftThumbnail() {
        this.setLiftThumbnailId(null);
    }

    setLiftThumbnailToLeft() {
        const leftThumbnailId = this.props.leftFeatureThumbnail.thumbnail_id;
        this.setLiftThumbnailId(leftThumbnailId);
    }

    setLiftThumbnailToRight() {
        const rightThumbnailId = this.props.rightFeatureThumbnail.thumbnail_id;
        this.setLiftThumbnailId(rightThumbnailId);
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
                    onMouseEnter={this.setLiftThumbnailId}
                    onMouseLeave={this.setDefaultLiftThumbnail}
                    onClick={this.onThumbnailClick}
                    firstClassName="xxThumbnail--highLight"
                    secondClassName="xxThumbnail--lowLight"
                />);
            }
            return (<ShowMoreThumbnailList
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={5}
                moreLabel={T.get('action.showMore')}
                onMore={this.onMore}
                onMouseEnter={this.setLiftThumbnailId}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.onThumbnailClick}
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
                onMouseEnter={this.setLiftThumbnailId}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.onThumbnailClick}
            />);
        // There's fewer than the number of display rows: put ShowLess in slot 6.
        // (Add one to length for the ShowLess button.)
        } else if (this.props.smallThumbnails.length + 1 <= rows * 6) {
            return (<ShowLessThumbnailList
                thumbnails={this.props.smallThumbnails}
                onLess={this.onLess}
                onMouseEnter={this.setLiftThumbnailId}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.onThumbnailClick}
            />);
        // There's more than 6 and they haven't shown more at all.
        } else if (rows === 1) {
            return (<ShowMoreThumbnailList
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={5} // Show exactly one row of 5 and ShowMore.
                onMore={this.onMore}
                onMouseEnter={this.setLiftThumbnailId}
                onMouseLeave={this.setDefaultLiftThumbnail}
                onClick={this.onThumbnailClick}
            />);
        // There's more thumbs than space to display them and they've expanded
        // once or more: put ShowMore and ShowLess.
        }
        return (<ShowMoreLessThumbnailList
            thumbnails={this.props.smallThumbnails}
            numberToDisplay={(rows * 6) - 2} // N rows of 6, minus one for each button.
            onMore={this.onMore}
            onLess={this.onLess}
            onMouseEnter={this.setLiftThumbnailId}
            onMouseLeave={this.setDefaultLiftThumbnail}
            onClick={this.onThumbnailClick}
        />);
    }

    getClipComponent() {
        return (
            <div className="xxCollectionImages">
                <GifClip
                    url={this.props.clip.renditions[2].url}
                    score={this.props.clip.neon_score}
                    poster={this.props.clipPoster}
                    id={this.props.clip.clip_id}
                />
                {this.getClipPaging()}
            </div>
        );
    }

    getClipPaging() {
        if (!this.props.clipIds.length) {
            return null;
        }
        return (
            <nav className="xxPagingControls-navigation xxPagingControls-navigation--GifClip">
                <div
                    className="xxPagingControls-prev xxPagingControls-prev--GifClip"
                    onClick={this.props.onGifClickPrev}
                />
                <div className="xxPagingControls-navigation-item xxPagingControls-item--GifClip">
                    {T.get('copyxOfY', {
                        '@x': this.props.selectedGifClip + 1,
                        '@y': this.props.clipIds.length })}
                </div>
                <div
                    className="xxPagingControls-next xxPagingControls-prev--GifClip"
                    onClick={this.props.onGifClickNext}
                />
            </nav>
        );
    }

    getOnClick(isLeft) {
        if (isLeft) {
            return this.onLeftThumbnailClick;
        }
        if (this.props.isSoloImage) {
            if (!this.props.isMine) {
                return null;
            }
        }
        return this.onRightThumbnailClick;
    }

    getFeatureThumbnail(thumbnail, isLeft = true) {
        const title = isLeft ? T.get('copy.worstThumbnail') : T.get('copy.bestThumbnail');
        const blurText = this.props.isMine ?
            T.get('imageUpload.addMoreBlurText') : '';
        const className = isLeft ? 'xxThumbnail--lowLight' : '';
        const onMouseEnter = isLeft ? this.setLiftThumbnailToLeft : this.setLiftThumbnailToRight;
        return (
            <FeatureThumbnail
                thumbnailId={thumbnail.thumbnail_id}
                title={title}
                score={thumbnail.neon_score}
                enabled={thumbnail.enabled}
                className={className}
                src={RENDITIONS.findRendition(thumbnail)}
                isSoloImage={!isLeft && this.props.isSoloImage}
                blurText={blurText}
                onClick={this.getOnClick(isLeft)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={this.setDefaultLiftThumbnail}
            />
        );
    }

    getThumbComponent() {
        return (
            <div className="xxCollectionImages">
                {this.getFeatureThumbnail(this.props.leftFeatureThumbnail, true)}
                {this.getFeatureThumbnail(this.props.rightFeatureThumbnail, false)}
                {this.getThumbnailList()}
            </div>
        );
    }

    render() {
        // Let mapped labels be overriden.
        const unapplyOverride = UTILS.applyTranslationOverride(
            this.props.copyOverrideMap);

        const result = (
            <div className={this.props.wrapperClassName}>
                {this.props.clip ? this.getClipComponent() : this.getThumbComponent()}
                <div className="xxCollection-content">
                    <InfoActionContainer
                        children={this.props.infoActionPanels}
                        controls={this.props.infoActionControls}
                        selectedPanel={this.props.selectedPanel}
                        clips={this.props.clips}
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

export default BaseCollection;
