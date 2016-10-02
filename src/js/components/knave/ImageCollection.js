import React, { PropTypes } from 'react';

import BaseCollection from './BaseCollection';
import MobileBaseCollection from './MobileBaseCollection';
import {
    ThumbnailList,
    ShowMoreThumbnailList,
    ShowLessThumbnailList,
    ShowMoreLessThumbnailList } from './ThumbnailList';
import {
    AddPanel,
    AddControl } from './InfoActionPanels';
import FeatureThumbnail from './FeatureThumbnail';
import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';

export default class ImageCollection extends BaseCollection {

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

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            // What panel to display, based on user input by
            // clicking on the buttons (email/del/share) in the right panel
            selectedPanelIndex: 0,
            // Which thumbnail's lift to show
            liftObjectId: null,
        };

        this.onWhyClick = this.props.onThumbnailClick.bind(this,
            props.tagId, props.rightFeatureThumbnail.thumbnail_id);
        this.onShareControlClick = this.onControlClick.bind(this, 1);
        this.onEmailControlClick = this.onControlClick.bind(this, 2);
        this.onDeleteControlClick = this.onControlClick.bind(this, 3);
        this.onAddControlClick = this.onControlClick.bind(this, 4);
        this.onLeftThumbnailClick = this.onThumbnailClick.bind(
            this, props.leftFeatureThumbnail.thumbnail_id);
        this.onRightThumbnailClick = this.onRightThumbnailClick.bind(this);
        this.onSetLiftThumbnailId = this.onSetLiftThumbnailId.bind(this);
        this.onSetLiftThumbnailToLeft = this.onSetLiftThumbnailId.bind(
            null, props.leftFeatureThumbnail.thumbnail_id);
        this.onSetLiftThumbnailToDefault = this.onSetLiftObjectId.bind(
            null, null);
        this.onControlRefilterClick = undefined;
    }

    getDefaultLiftObjectId() {
        return this.props.rightFeatureThumbnail.thumbnail_id;
    }

    getPanels() {
        const copyOverrideMap = {
            'copy.lift.explanation': 'copy.lift.explanation.images',
            'copy.lift.explanation.solo': 'copy.lift.explanation.images.solo',
        };
        const panels = super.getBasePanels(copyOverrideMap);
        if (this.props.isViewOnly) {
            return panels;
        }
        panels.push(<AddPanel cancelClickHandler={this.onCancelClick} />);
        return panels;
    }

    getControls() {
        if (this.props.isViewOnly) {
            return [];
        }
        const controls = super.getBaseControls();
        const nextIndex = controls.length + 1;
        controls.push(<AddControl index={nextIndex} handleClick={this.onAddControlClick} />);
        return controls;
    }

    onSetLiftThumbnailId(thumbnailId) {
        this.onSetLiftObjectId(thumbnailId);
    }

    renderMobile() {
        const copyOverrideMap = {
            'copy.lift.explanation': 'copy.lift.explanation.images',
            'copy.lift.explanation.solo': 'copy.lift.explanation.images.solo',
        };
        return (
            <MobileBaseCollection
                {...this.props}
                featureContent={this.renderFeatureThumbnails()}
                subContent={this.renderThumbnailList()}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanelIndex={this.state.selectedPanelIndex}
                wrapperClassName={'xxCollection xxCollection--photo'}
                copyOverrideMap={copyOverrideMap}
            />
        );
    }

    renderDesktop() {
        return (
            <BaseCollection
                {...this.props}
                featureContent={this.renderFeatureThumbnails()}
                subContent={this.renderThumbnailList()}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanelIndex={this.state.selectedPanelIndex}
                wrapperClassName={'xxCollection xxCollection--photo'}
            />
        );
    }

    renderFeatureThumbnails() {
        const left = this.props.leftFeatureThumbnail;
        const right = this.props.rightFeatureThumbnail;
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
                    isSoloImage={!right}
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
        const rows = this.state.smallThumbnailRows;

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
                onMouseEnter={this.onSetLiftThumbnailId}
                onMouseLeave={this.onSetLiftThumbnailToDefault}
                onClick={this.onThumbnailClick}
            />);
        // There's fewer than the number of display rows: put ShowLess in slot 6.
        // (Add one to length for the ShowLess button.)
        } else if (this.props.smallThumbnails.length + 1 <= rows * 6) {
            return (<ShowLessThumbnailList
                thumbnails={this.props.smallThumbnails}
                onLess={this.onLess}
                onMouseEnter={this.onSetLiftThumbnailId}
                onMouseLeave={this.onSetLiftThumbnailToDefault}
                onClick={this.onThumbnailClick}
            />);
        // There's more than 6 and they haven't shown more at all.
        } else if (rows === 1) {
            return (<ShowMoreThumbnailList
                thumbnails={this.props.smallThumbnails}
                numberToDisplay={5} // Show exactly one row of 5 and ShowMore.
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
            numberToDisplay={(rows * 6) - 2} // N rows of 6, minus one for each button.
            onMore={this.onMore}
            onLess={this.onLess}
            onMouseEnter={this.onSetLiftThumbnailId}
            onMouseLeave={this.onSetLiftThumbnailToDefault}
            onClick={this.onThumbnailClick}
        />);
    }

    onRightThumbnailClick() {
        const right = this.props.rightFeatureThumbnail;
        if (!right) {
            this.onAddControlClick();
        }
        this.onThumbnailClick(this.props.rightFeatureThumbnail.thumbnail_id);
    }

    render() {
        if (this.context.isMobile) {
            return this.renderMobile();
        }
        return this.renderDesktop();
    }
}
