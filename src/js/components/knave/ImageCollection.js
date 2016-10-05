import React, { PropTypes } from 'react';

import Collection from './Collection';
import FeatureThumbnail from './FeatureThumbnail';
import {
    AddPanel,
    AddControl } from './InfoActionPanels';
import {
    ThumbnailList,
    ShowMoreThumbnailList,
    ShowLessThumbnailList,
    ShowMoreLessThumbnailList } from './ThumbnailList';
import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

class ImageCollection extends Collection {

    static displayName = 'ImageCollection';

    static propTypes = {
        tagId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,

        leftFeatureThumbnail: PropTypes.shape({
            thumbnail_id: PropTypes.string.isRequired,
        }).isRequired,
        rightFeatureThumbnail: PropTypes.shape({
            thumbnail_id: PropTypes.string.isRequired,
        }).isRequired,

        isShareView: PropTypes.bool,
        shareUrl: PropTypes.string,
    }

    static copyOverrideMap = {
        'copy.lift.explanation': 'copy.lift.explanation.images',
        'copy.lift.explanation.solo': 'copy.lift.explanation.images.solo',
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            // What panel to display, based on user input by
            // clicking on the buttons (email/del/share) in the right panel
            selectedPanelIndex: 0,
            // Which thumbnail's lift to show
            liftObjectId: null,
            // How many rows to display in the sub content.
            smallContentRows: context.isMobile ? 0 : 1,
        };

        this.onAddControlClick = this.onControlClick.bind(this, 5);
        this.onDeleteControlClick = this.onControlClick.bind(this, 4);
        this.onEmailControlClick = this.onControlClick.bind(this, 3);
        this.onLeftThumbnailClick = this.onThumbnailClick.bind(
            this, props.leftFeatureThumbnail.thumbnail_id);
        this.onRightThumbnailClick = this.onRightThumbnailClick.bind(this);
        this.onSetLiftThumbnailId = this.onSetLiftObjectId.bind(this);
        this.onSetLiftThumbnailToDefault = this.onSetLiftObjectId.bind(
            null, null);
        this.onSetLiftThumbnailToLeft = this.onSetLiftThumbnailId.bind(
            null, props.leftFeatureThumbnail.thumbnail_id);
        this.onShareControlClick = this.onControlClick.bind(this, 1);
        this.onWhyClick = this.props.onThumbnailClick.bind(
            this, props.tagId, props.rightFeatureThumbnail.thumbnail_id);

        this.onControlRefilterClick = undefined;
    }

    onRightThumbnailClick() {
        const right = this.props.rightFeatureThumbnail;
        const left = this.props.leftFeatureThumbnail;
        if (left.thumbnail_id === right.thumbnail_id) {
            this.onAddControlClick();
            return;
        }
        this.onThumbnailClick(this.props.rightFeatureThumbnail.thumbnail_id);
    }

    getDefaultLiftObjectId() {
        return this.props.rightFeatureThumbnail.thumbnail_id;
    }

    getPanels() {
        const panels = super.getBasePanels();
        if (this.props.isViewOnly) {
            return panels;
        }
        panels.push(
            <AddPanel
                key="add"
                isMobile={this.context.isMobile}
                panelType={'photo'}
                tagId={this.props.tagId}
                onCancelClick={this.onControlClick}
            />);
        return panels;
    }

    getControls() {
        if (this.props.isViewOnly) {
            return [];
        }
        const controls = super.getBaseControls();
        const nextIndex = controls.length + 1;
        controls.push(<AddControl index={nextIndex} onClick={this.onAddControlClick} />);
        return controls;
    }

    renderFeatureThumbnails() {
        const left = this.props.leftFeatureThumbnail;
        const right = this.props.rightFeatureThumbnail;
        const isSoloImage = left.thumbnail_id === right.thumbnail_id;
        const blurText = T.get('imageUpload.addMoreBlurText');
        return (
            <div>
                <FeatureThumbnail
                    thumbnailId={left.thumbnail_id}
                    title={T.get('copy.worstThumbnail')}
                    score={left.neon_score}
                    enabled={left.enabled}
                    className={'xxThumbnail--lowLight'}
                    src={RENDITIONS.findRendition(left)}
                    dominantColor={left.dominant_color}
                    onClick={this.onLeftThumbnailClick}
                    onMouseEnter={this.onSetLiftThumbnailToLeft}
                    onMouseLeave={this.onSetLiftThumbnailToDefault}
                />
                <FeatureThumbnail
                    thumbnailId={right.thumbnail_id}
                    title={T.get('copy.bestThumbnail')}
                    score={right.neon_score}
                    enabled={right.enabled}
                    src={RENDITIONS.findRendition(right)}
                    dominantColor={right.dominant_color}
                    isSoloImage={isSoloImage}
                    blurText={!this.props.isShareView ? blurText : ''}
                    onClick={this.onRightThumbnailClick}
                    onMouseEnter={this.onSetLiftThumbnailToDefault}
                    onMouseLeave={this.onSetLiftThumbnailToDefault}
                />
            </div>
        );
    }

    renderThumbnailList() {
        // Number of rows of item to display.
        const rows = this.state.smallContentRows;

        // Number of thumbnails per row.
        const perRow = UTILS.THUMBNAILS_PER_ROW;

        // 5 cases:
        //
        // Given X thumbnails per row (e.g., 6).
        //
        // There's no row shown but more thumbnails.
        // There's fewer than one row of thumbs
        // There's fewer than the rows displayed -> show less in spot X.
        // There's more than the rows displayed -> show more in last spot
        // There's more than the rows displayed, and they've
        //   clicked show more once -> show less in spot X, and show more
        //   in right-hand spot in last row

        // If there's no rows but there is a thumbnail.
        if (!rows && this.props.smallThumbnails.length) {
            const showMoreClassName = this.context.isMobile ?
                'xxShowMore' : null;
            return (<ShowMoreThumbnailList
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={0} // Show exactly one row of X-1 and ShowMore.
                showMoreClassName={showMoreClassName}
                onMore={this.onMore}
                onMouseEnter={this.onSetLiftThumbnailId}
                onMouseLeave={this.onSetLiftThumbnailToDefault}
                onClick={this.onThumbnailClick}
            />);
        // There's fewer than or exactly one row of thumbs: no button.
        } else if (this.props.smallThumbnails.length <= perRow) {
            return (<ThumbnailList
                thumbnails={this.props.smallThumbnails}
                onMouseEnter={this.onSetLiftThumbnailId}
                onMouseLeave={this.onSetLiftThumbnailToDefault}
                onClick={this.onThumbnailClick}
            />);
        // There's fewer than the number of display rows: put ShowLess in slot X.
        // (Add one to length for the ShowLess button.)
        } else if (this.props.smallThumbnails.length + 1 <= rows * perRow) {
            return (<ShowLessThumbnailList
                thumbnails={this.props.smallThumbnails}
                onLess={this.onLess}
                onMouseEnter={this.onSetLiftThumbnailId}
                onMouseLeave={this.onSetLiftThumbnailToDefault}
                onClick={this.onThumbnailClick}
            />);
        // There's more than X and they haven't shown more at all.
        } else if (rows === 1) {
            return (<ShowMoreThumbnailList
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={perRow - 1} // Show exactly one row of X-1 and ShowMore.
                onMore={this.onMore}
                onMouseEnter={this.onSetLiftThumbnailId}
                onMouseLeave={this.onSetLiftThumbnailToDefault}
                onClick={this.onThumbnailClick}
            />);
        // There's more thumbs than space to display them and they've expanded
        // once or more: put ShowMore and ShowLess.
        }
        return (<ShowMoreLessThumbnailList
            thumbnails={this.props.smallThumbnails}
            numberToDisplay={(rows * perRow) - 2} // N rows of X, minus one for each button.
            onMore={this.onMore}
            onLess={this.onLess}
            onMouseEnter={this.onSetLiftThumbnailId}
            onMouseLeave={this.onSetLiftThumbnailToDefault}
            onClick={this.onThumbnailClick}
        />);
    }

    render() {
        const content = {
            featureContent: this.renderFeatureThumbnails(),
            subContent: this.renderAsMobile(
                this.renderThumbnailList(),
                ImageCollection.copyOverrideMap),
            panels: this.getPanels(),
            controls: this.getControls(),
            wrapperClassName: 'xxCollection xxCollection--photo',
            selectedPanelIndex: this.state.selectedPanelIndex,
        };
        return <Collection {...this.props} {...content} />;
    }
}

export default ImageCollection;
