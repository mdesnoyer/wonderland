import React, { PropTypes } from 'react';
import _ from 'lodash';

import BaseCollection from './BaseCollection';
import MobileBaseCollection from './MobileBaseCollection';
import T from '../../modules/translation';
import {
    ThumbnailList,
    ShowMoreThumbnailList,
    ShowLessThumbnailList,
    ShowMoreLessThumbnailList } from './ThumbnailList';
import {
    SetDefaultControl,
    SetDefaultPanel,
    EnableControl,
    EnablePanel } from './InfoActionPanels';
import { LoadActions } from '../../stores/CollectionStores';

class VideoCollection extends BaseCollection {

    static propTypes = {
        // Left and right large thumbnail
        leftFeatureThumbnail: PropTypes.shape({
            thumbnail_id: PropTypes.string.isRequired,
        }).isRequired,
        rightFeatureThumbnail: PropTypes.shape({
            thumbnail_id: PropTypes.string.isRequired,
        }).isRequired,
        smallBadThumbnails: PropTypes.arrayOf(PropTypes.object),
        timeRemaining: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            // What panel to display, based on user input by
            // clicking on the buttons (email/del/share) in the right panel
            selectedPanelIndex: 0,
            liftObjectId: null,
        };
        this.onLoadShareUrl = this.onLoadShareUrl.bind(this);
        this.onSendResultEmail = this.onSendResultEmail.bind(this);
        this.onSetLiftObjectId = this.onSetLiftObjectId.bind(this);
        this.onSetPanel = this.onSetPanel.bind(this);
        this.onWhyClick = this.onWhyClick.bind(this);
    }

    componentDidMount() {
        this.setProcessingMonitor();
    }

    componentWillUpdate() {
        this.setProcessingMonitor();
    }

    componentWillUnmount() {
        this.clearProcessingMonitor();
    }

    setProcessingMonitor() {
        if (this.props.isRefiltering) {
            const tagId = this.props.tagId;
            const monitorFunction = LoadActions.loadTags.bind(
                null, [tagId], this.props.selectedDemographic[0],
                this.props.selectedDemographic[1]);
            if (this.props.timeRemaining > 10) {
                this.clearProcessingMonitor();
                const timeout = 1000 * this.props.timeRemaining;
                setTimeout(monitorFunction, timeout);
                return;
            }

            // Only set one setInterval per video.
            if (this.processingMonitor) {
                return;
            }

            // Let's set a monitor until the video is out of processing.
            const interval = 1000 * 10;
            this.processingMonitor = setInterval(monitorFunction, interval);
            return;
        }

        // Else, the video is processed so clear a monitor.
        this.clearProcessingMonitor();
    }

    clearProcessingMonitor() {
        if (this.processingMonitor) {
            clearInterval(this.processingMonitor);
            delete this.processingMonitor;
        }
    }

    onWhyClick() {
        this.props.onThumbnailClick(
            this.props.tagId,
            this.props.rightFeatureThumbnail.thumbnail_id);
    }

    getPanels() {
        const copyOverrideMap = {
            'copy.lift.explanation': 'copy.lift.explanation',
            'copy.lift.explanation.solo': 'copy.lift.explanation' };

        const panels = super.getPanels(copyOverrideMap);
        if (this.props.isViewOnly) {
            return panels;
        }
        if (this.props.isServingEnabled) {
            panels.push(
                <EnablePanel
                    goodThumbnails={this.props.goodThumbnails}
                    onToggleThumbnailEnabled={this.props.onToggleThumbnailEnabled}
                    onCancelClick={this.onControlCancelClick}
                />,
                <SetDefaultPanel
                    onSetDefaultThumbnail={this.onSetDefaultThumbnail}
                    onCancelClick={this.onControlCancelClick}
                />
            );
        }
        return panels;
    }

    getControls() {
        if (this.props.infoPanelOnly) {
            return [];
        }
        const controls = super.getControls();
        const nextIndex = controls.length + 1;
        if (this.props.servingEnabled) {
            controls.push(
                <EnableControl
                    index={nextIndex}
                    onClick={this.onControlClick}
                />);
            controls.push(
                <SetDefaultControl
                    index={nextIndex + 1}
                    onClick={this.onControlClick}
                />);
        }
        return controls;
    }

    renderMobile() {
        const copyOverrideMap = {
            'copy.worstThumbnail': 'copy.currentThumbnail',
            'copy.bestThumbnail': 'copy.topNeonImage',
            'action.showMore': 'copy.thumbnails.low',
            'action.showLess': 'copy.thumbnails.high',
        };

        return (
            <MobileBaseCollection
                {...this.props}
                copyOverrideMap={copyOverrideMap}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanelIndex={this.state.selectedPanelIndex}
                wrapperClassName={'xxCollection xxCollection--video'}
                liftValue={this.getLiftValue()}
                setLiftThumbnailId={this.setLiftThumbnailId}
            />
        );
    }

    renderDesktop() {
        // Apply Video component-specific labels.
        const copyOverrideMap = {
            'copy.worstThumbnail': 'copy.currentThumbnail',
            'copy.bestThumbnail': 'copy.topNeonImage',
            'action.showMore': 'copy.thumbnails.low',
            'action.showLess': 'copy.thumbnails.high',
        };
        return (
            <BaseCollection
                {...this.props}
                copyOverrideMap={copyOverrideMap}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanelIndex={this.state.selectedPanelIndex}
                wrapperClassName={'xxCollection xxCollection--video'}
                isSoloImage={this.isSoloImage()}
            />
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

    getDefaultLiftObjectId() {
        return this.props.rightFeatureThumbnail.thumbnail_id;
    }

    render() {
        if (this.context.isMobile) {
            return this.renderMobile();
        }
        return this.renderDesktop();
    }
}

export default VideoCollection;
