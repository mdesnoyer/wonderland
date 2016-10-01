import React, { PropTypes } from 'react';
import _ from 'lodash';

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
import { LoadActions } from '../../stores/CollectionStores';
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

        onDemographicChange: PropTypes.func.isRequired,

        shareUrl: PropTypes.string,

        onSendResultEmail: PropTypes.func.isRequired,
        onDeleteCollection: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            // What panel to display, based on user input by
            // clicking on the buttons (email/del/share) in the right panel
            selectedPanelIndex: 0,
            // Which thumbnail's lift to show
            liftThumbnailId: null,
        };

        this.onControlClick = this.onControlClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onSharePanelLoad = this.onSharePanelLoad.bind(this);
        this.onWhyClick = this.props.onThumbnailClick.bind(this,
            props.tagId, props.rightFeatureThumbnail.thumbnail_id);
        this.onShareControlClick = this.onControlClick.bind(this, 1);
        this.onEmailControlClick = this.onControlClick.bind(this, 2);
        this.onDeleteControlClick = this.onControlClick.bind(this, 3);
        this.onAddControlClick = this.onControlClick.bind(this, 4);
        this.onRightThumbnailClick = this.props.onThumbnailClick.bind(this,
            props.tagId, props.rightFeatureThumbnail.thumbnail_id);
        this.onSendResultEmail = this.onSendResultEmail.bind(this);
        this.setLiftThumbnailToLeft = this.setLiftThumbnailToLeft.bind(this);
        this.setLiftThumbnailToRight = this.setLiftThumbnailToRight.bind(this);
    }

    onSharePanelLoad() {
        LoadActions.loadShareUrl(this.props.tagId);
    }

    getDefaultLiftObjectId() {
        return this.props.rightFeatureThumbnail.thumbnail_id;
    }

    getPanels() {
        const copyOverrideMap = {
            'copy.lift.explanation': 'copy.lift.explanation.images',
            'copy.lift.explanation.solo': 'copy.lift.explanation.images.solo',
        };
        const panels = super.getPanels(copyOverrideMap);
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
        const controls = super.getControls();
        const nextIndex = controls.length + 1;
        controls.push(<AddControl index={nextIndex} handleClick={this.onAddControlClick} />);
        return controls;
    }

    renderMobile() {
        const copyOverrideMap = {
            'copy.lift.explanation': 'copy.lift.explanation.images',
            'copy.lift.explanation.solo': 'copy.lift.explanation.images.solo',
        };
        return (
            <MobileBaseCollection
                featureContent={this.renderFeatureContent()}
                subContent={this.renderSubContent()}
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
                featureContent={this.renderFeatureContent()}
                subContent={this.renderSubContent()}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanelIndex={this.state.selectedPanelIndex}
                wrapperClassName={'xxCollection xxCollection--photo'}
            />
        );
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

    onRightThumbnailClick() {
        // TODO add panel wire.
        this.onThumbnailClick(this.props.rightFeatureThumbnail.thumbnail_id);
    }

    render() {
        if (this.context.isMobile) {
            return this.getMobileComponent();
        }
        return this.getDesktopComponent();
    }
}
