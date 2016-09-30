import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import BaseCollection from './BaseCollection';
import MobileBaseCollection from './MobileBaseCollection';
import RENDITIONS from '../../modules/renditions';
// TODO put these inside the default export.
import {
    InfoDemoLiftPanel,
    InfoLiftPanel,
    FilterPanel,
    EmailPanel,
    EmailControl,
    SharePanel,
    ShareControl,
    DeletePanel,
    DeleteControl,
    ServingStatusPanel,
    ServingStatusControl,
    AddPanel,
    AddControl,
    DownloadControl } from './InfoActionPanels';
import { LoadActions } from '../../stores/CollectionStores';

const propTypes = {
    isRefiltering: PropTypes.bool,
};

const contextTypes = {
    isMobile: PropTypes.bool,
};

class VideoCollection extends BaseCollection {
    constructor(props) {
        super(props);
        this.state = {
            // What panel to display, based on user input by
            // clicking on the buttons (email/del/share) in the right panel
            selectedPanel: 0,
            liftThumbnailId: null,
            selectedGifClip: 0,
        };
        this.onGifClickNext = this.onGifClickNext.bind(this);
        this.onGifClickPrev = this.onGifClickPrev.bind(this);
        this.onLoadShareUrl = this.onLoadShareUrl.bind(this);
        this.onSendResultsEmail = this.onSendResultsEmail.bind(this);
        this.onSetLiftThumbnail = this.onSetLiftThumbnail.bind(this);
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

    onGifClickNext() {
        if (this.state.selectedGifClip === this.props.clipIds.length - 1) {
            return this.setState({ selectedGifClip: 0 });
        }
        return this.setState({ selectedGifClip: this.state.selectedGifClip + 1 });
    }

    onGifClickPrev() {
        if (this.state.selectedGifClip === 0) {
            return this.setState({ selectedGifClip: this.props.clipIds.length - 1 });
        }
        return this.setState({ selectedGifClip: this.state.selectedGifClip - 1 });
    }

    onLoadShareUrl() {
        LoadActions.loadShareUrl(this.props.tagId);
    }

    onSetLiftThumbnail(liftThumbnailId) {
        this.setState({ liftThumbnailId });
    }

    onSetPanel(selectedPanelId) {
        // Clear any open tooltip.
        ReactTooltip.hide();
        this.setState({ selectedPanelId });
    }

    onSendResultsEmail(email, callback) {
        this.props.onSendResultsEmail(email, this.props.tagId, callback);
    }

    onWhyClick() {
        const self = this;
        self.props.onThumbnailClick(
            self.props.tagId,
            self.props.rightFeatureThumbnail.thumbnail_id);
    }

    getLiftValue() {
        const selectedId = this.state.liftThumbnailId;
        const defaultId = this.props.rightFeatureThumbnail.thumbnail_id;
        const map = this.props.thumbLiftMap || {};
        // The lift value for a map of one thumbnail
        // is undefined to signal that components
        // will not render the lift score.
        if (Object.keys(map).length === 1) {
            return undefined;
        }
        return map[selectedId || defaultId];
    }

    isSoloImage() {
        return this.props.thumbnailLength <= 1;
    }

    renderPanels() {
        const copyOverrideMap = _.isEmpty(this.props.clips) ?
        {
            'copy.lift.explanation': 'copy.lift.explanation',
            'copy.lift.explanation.solo': 'copy.lift.explanation',
        } :
        {
            'copy.lift.explanation': 'copy.lift.explanation.gifs',
            'copy.lift.explanation.solo': 'copy.lift.explanation.gifs',
        };
        const onWhyClick = _.isEmpty(this.props.clips) ?
            this.onWhyClick :
            null;

        if (this.props.infoPanelOnly) {
            return [
                <InfoLiftPanel
                    title={this.props.title}
                    liftValue={this.getLiftValue()}
                    copyOverrideMap={copyOverrideMap}
                    onWhyClick={onWhyClick}
                />,
            ];
        }
        const account = this.props.account;
        const panels = [
            <InfoDemoLiftPanel
                title={this.props.title}
                liftValue={this.getLiftValue()}
                onDemographicChange={this.onDemographicChange}
                demographicOptions={this.props.demographicOptions}
                selectedDemographic={this.props.selectedDemographic}
                handleRefiltersPanelClick={() => this.setSelectedPanel(1)}
                isRefiltering={this.props.isRefiltering}
                timeRemaining={this.props.timeRemaining}
                clips={this.props.clips}
                tagId={this.props.tagId}
                copyOverrideMap={copyOverrideMap}
                onWhyClick={onWhyClick}
            />,
            <FilterPanel
                cancelClickHandler={() => this.setSelectedPanel(0)}
                onDemographicChange={this.onDemographicChange}
                clips={this.props.clips}
                videoId={this.props.videoId}
            />,
            <SharePanel
                cancelClickHandler={() => this.setSelectedPanel(0)}
                socialClickHandler={this.props.socialClickHandler}
                tagId={this.props.tagId}
                shareUrl={this.props.shareUrl}
                loadShareUrl={this.onLoadShareUrl}
                setTooltipText={this.props.setTooltipText}
            />,
            <EmailPanel
                cancelClickHandler={() => this.setSelectedPanel(0)}
                shareUrl={this.props.shareUrl}
                loadShareUrl={this.onLoadShareUrl}
                sendResultsEmail={this.onSendResultsEmail}
            />,
            <DeletePanel
                onDeleteCollection={this.onDeleteCollection}
                cancelClickHandler={() => this.setSelectedPanel(0)}
            />,
        ];
        if (account && account.serving_enabled) {
            panels.push(
                <ServingStatusPanel
                    goodThumbnails={this.props.goodThumbnails}
                    cancelClickHandler={() => this.setSelectedPanel(0)}
                    enableThumbnail={this.props.enableThumbnail}
                    disableThumbnail={this.props.disableThumbnail}
                />,
                <AddPanel
                    tagId={this.props.tagId}
                    videoId={this.props.videoId}
                    panelType="video"
                    cancelClickHandler={() => this.setSelectedPanel(0)}
                />
            );
        }
        return panels;
    }

    renderControls() {
        if (this.props.infoPanelOnly) {
            return [];
        }

        const controls = [
            <ShareControl handleClick={() => this.setSelectedPanel(2)} />,
            <EmailControl handleClick={() => this.setSelectedPanel(3)} />,
        ];
        if (!_.isEmpty(this.props.clips)) {
            const currentClip = this.props.clips[this.props.clipIds[this.state.selectedGifClip]];
            controls.push(<DownloadControl href={currentClip.renditions[0].url} />);
        }

        controls.push(<DeleteControl handleClick={() => this.setSelectedPanel(4)} />);

        if (this.props.account && this.props.account.serving_enabled) {
            controls.push(
                // TODO Remove fat arrow in render path
                <ServingStatusControl handleClick={() => this.setSelectedPanel(5)} />,
                <AddControl handleClick={() => this.setSelectedPanel(6)} panelType="video" />
            );
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

        let currentClip;
        let clipThumb;
        let clipPoster;
        if (!_.isEmpty(this.props.clips)) {
            currentClip = this.props.clips[this.props.clipIds[this.state.selectedGifClip]];
            clipThumb = this.props.clipThumbs[currentClip.thumbnail_id];
            clipPoster = clipThumb ? RENDITIONS.findRendition(clipThumb, 1280, 720) : null;
        }

        return (
            <MobileBaseCollection
                {...this.props}
                clip={currentClip}
                clipThumb={clipThumb}
                clipPoster={clipPoster}
                copyOverrideMap={copyOverrideMap}
                infoActionPanels={this.renderPanels()}
                infoActionControls={this.renderControls()}
                selectedPanel={this.state.selectedPanel}
                wrapperClassName={'xxCollection xxCollection--video'}
                isSoloImage={this.isSoloImage()}
                liftValue={this.getLiftValue()}
                onGifClickPrev={this.onGifClickPrev}
                onGifClickNext={this.onGifClickNext}
                selectedGifClip={this.state.selectedGifClip}
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
        let currentClip;
        let clipThumb;
        let clipPoster;
        if (!_.isEmpty(this.props.clips)) {
            currentClip = this.props.clips[this.props.clipIds[this.state.selectedGifClip]];
            clipThumb = this.props.clipThumbs[currentClip.thumbnail_id];
            clipPoster = clipThumb ? RENDITIONS.findRendition(clipThumb, 1280, 720) : null;
        }
        return (
            <BaseCollection
                {...this.props}
                clip={currentClip}
                clipThumb={clipThumb}
                clipPoster={clipPoster}
                copyOverrideMap={copyOverrideMap}
                infoActionPanels={this.renderPanels()}
                infoActionControls={this.renderControls()}
                selectedPanel={this.state.selectedPanel}
                wrapperClassName={'xxCollection xxCollection--video'}
                isSoloImage={this.isSoloImage()}
                onGifClickPrev={this.onGifClickPrev}
                onGifClickNext={this.onGifClickNext}
                selectedGifClip={this.state.selectedGifClip}
            />
        );
    }

    render() {
        return this.context.isMobile ? this.renderMobile() : this.renderDesktop();
    }
}

VideoCollection.propTypes = propTypes;
VideoCollection.contextTypes = contextTypes;

export default VideoCollection;
