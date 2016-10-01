// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import ReactTooltip from 'react-tooltip';

import _ from 'lodash';

import BaseCollection from './BaseCollection';
import MobileBaseCollection from './MobileBaseCollection';

import T from '../../modules/translation';
import RENDITIONS from '../../modules/renditions';

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
    ImageServingEnabledControl,
    ImageServingDisabledControl,
    AddPanel,
    AddControl,
    DownloadControl
} from './InfoActionPanels';

import { LoadActions } from '../../stores/CollectionStores';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const VideoCollection = React.createClass({

    // TODO factor this and VideoProcessing's
    // A reference to a setTimeout/setInterval for monitoring
    // the state of a processing video.
    processingMonitor: null,

    propTypes: {
        isRefiltering: React.PropTypes.bool
    },

    contextTypes: {
        isMobile: PropTypes.bool
    },

    getInitialState() {
        return {
            // What panel to display, based on user input by
            // clicking on the buttons (email/del/share) in the right panel
            selectedPanel: 0,
            liftThumbnailId: null,
            selectedGifClip: 0
        };
    },
    componentDidMount() {
        this.setProcessingMonitor();
    },

    componentWillUpdate() {
        this.setProcessingMonitor();
    },

    componentWillUnmount() {
        this.clearProcessingMonitor();
    },

    setProcessingMonitor() {
        if (this.props.isRefiltering) {
            const tagId = this.props.tagId;
            const monitorFunction = LoadActions.loadTags.bind(null, [tagId], this.props.selectedDemographic[0], this.props.selectedDemographic[1]);
            if (this.props.timeRemaining > 10) {
                this.clearProcessingMonitor();
                const timeout = 1000 * this.props.timeRemaining;
                setTimeout(monitorFunction, timeout);
                return;
            }

            // Only set one setInterval per video.
            if(this.processingMonitor) {
                return;
            }

            // Let's set a monitor until the video is out of processing.
            const interval = 1000 * 10;
            this.processingMonitor = setInterval(monitorFunction, interval);
            return;
        }

        // Else, the video is processed so clear a monitor.
        this.clearProcessingMonitor();
    },

    clearProcessingMonitor() {
        if (this.processingMonitor !== null) {
            clearInterval(this.processingMonitor);
            this.processingMonitor = null;
        }
    },

    setSelectedPanel(panelId) {
        // Clear any open tooltip.
        ReactTooltip.hide();
        this.setState({selectedPanel: panelId});
    },

    setLiftThumbnailId(thumbnailId) {
        this.setState({liftThumbnailId: thumbnailId})
    },

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
    },

    onWhyClick() {
        const self = this;
        self.props.onThumbnailClick(
            self.props.rightFeatureThumbnail.thumbnail_id);
    },

    getPanels() {
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
                />
            ];
        }
        let account = this.props.account;
        let panel_array = [
            <InfoDemoLiftPanel
                title={this.props.title}
                liftValue={this.getLiftValue()}
                onDemographicChange={this.props.onDemographicChange}
                demographicOptions={this.props.demographicOptions}
                selectedDemographic={this.props.selectedDemographic}
                handleRefiltersPanelClick={()=>{this.setSelectedPanel(1)}}
                isRefiltering={this.props.isRefiltering}
                timeRemaining={this.props.timeRemaining}
                clips={this.props.clips}
                tagId={this.props.tagId}
                copyOverrideMap={copyOverrideMap}
                onWhyClick={onWhyClick}
            />,
            <FilterPanel
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
                onDemographicChange={this.props.onDemographicChange}
                clips={this.props.clips}
                videoId={this.props.videoId}
            />,
            <SharePanel
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
                socialClickHandler={this.props.socialClickHandler}
                tagId={this.props.tagId}
                shareUrl={this.props.shareUrl}
                loadShareUrl={LoadActions.loadShareUrl.bind(null, this.props.tagId)}
                setTooltipText={this.props.setTooltipText}
            />,
            <EmailPanel
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
                shareUrl={this.props.shareUrl}
                loadShareUrl={LoadActions.loadShareUrl.bind(null, this.props.tagId)}
                sendResultsEmail={this.sendResultsEmail}
            />,
            <DeletePanel
                deleteCollection={this.props.deleteCollection}
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
            />
        ];
        if (account && account.serving_enabled) {
            panel_array.push(<ServingStatusPanel
                goodThumbnails={this.props.goodThumbnails}
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
                enableThumbnail={this.props.enableThumbnail}
                disableThumbnail={this.props.disableThumbnail}
            />,
            <AddPanel
                tagId={this.props.tagId}
                videoId={this.props.videoId}
                panelType='video'
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
            />);
        }
        return panel_array;
    },

    sendResultsEmail(email, callback) {
        const self = this;
        self.props.sendResultsEmail(email, self.props.tagId, callback);
    },

    getControls() {
        if (this.props.infoPanelOnly) {
            return [];
        }

        let account = this.props.account;
        let control_array = [
            <ShareControl handleClick={()=>{this.setSelectedPanel(2)}} />,
            <EmailControl handleClick={()=>{this.setSelectedPanel(3)}} />
        ];
        if (!_.isEmpty(this.props.clips)) {
            var currentClip = this.props.clips[this.props.clipsIds[this.state.selectedGifClip]]
            var clipThumb = this.props.clipThumbs[currentClip.thumbnail_id]
            control_array.push(<DownloadControl href={currentClip.renditions[0].url}/>);
        }

        control_array.push(<DeleteControl handleClick={()=>{this.setSelectedPanel(4)}} />)

        if (account && account.serving_enabled) {
            control_array.push(
                <ServingStatusControl handleClick={()=>{this.setSelectedPanel(5)}} />,
                <AddControl handleClick={()=>{this.setSelectedPanel(6)}} panelType='video'/>
            );
        }
        return control_array;
    },

    getMobile() {
        const copyOverrideMap = {
            'copy.worstThumbnail': 'copy.currentThumbnail',
            'copy.bestThumbnail': 'copy.topNeonImage',
            'action.showMore': 'copy.thumbnails.low',
            'action.showLess': 'copy.thumbnails.high'
        };

        if (!_.isEmpty(this.props.clips)) {
            var currentClip = this.props.clips[this.props.clipsIds[this.state.selectedGifClip]]
            var clipThumb = this.props.clipThumbs[currentClip.thumbnail_id]
            var clipPoster =  clipThumb ? RENDITIONS.findRendition(clipThumb, 875, 500): null;
        }

        return (
            <MobileBaseCollection
                {...this.props}
                clip={currentClip}
                clipThumb={clipThumb}
                clipPoster={clipPoster}
                copyOverrideMap={copyOverrideMap}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanel={this.state.selectedPanel}
                wrapperClassName={'xxCollection xxCollection--video'}
                isSoloImage={this.isSoloImage()}
                liftValue={this.getLiftValue()}
                onGifClickPrev={this.onGifClickPrev}
                onGifClickNext={this.onGifClickNext}
                selectedGifClip={this.state.selectedGifClip}
            />
        );
    },

    getDesktop() {
        // Apply Video component-specific labels.
        const copyOverrideMap = {
            'copy.worstThumbnail': 'copy.currentThumbnail',
            'copy.bestThumbnail': 'copy.topNeonImage',
            'action.showMore': 'copy.thumbnails.low',
            'action.showLess': 'copy.thumbnails.high'
        };
        if (!_.isEmpty(this.props.clips)) {
            var currentClip = this.props.clips[this.props.clipsIds[this.state.selectedGifClip]]
            var clipThumb = this.props.clipThumbs[currentClip.thumbnail_id]
            var clipPoster = clipThumb ? RENDITIONS.findRendition(clipThumb, 875, 500): null;
        }
        return (
            <BaseCollection
                {...this.props}
                clip={currentClip}
                clipThumb={clipThumb}
                clipPoster={clipPoster}
                copyOverrideMap={copyOverrideMap}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanel={this.state.selectedPanel}
                wrapperClassName={'xxCollection xxCollection--video'}
                isSoloImage={this.isSoloImage()}
                setLiftThumbnailId={this.setLiftThumbnailId}
                onGifClickPrev={this.onGifClickPrev}
                onGifClickNext={this.onGifClickNext}
                selectedGifClip={this.state.selectedGifClip}
            />
        );
    },

    onGifClickPrev() {
        if (this.state.selectedGifClip === 0 ) {
            this.setState({ selectedGifClip: this.props.clipsIds.length - 1 });
            return
        }
            this.setState({ selectedGifClip: this.state.selectedGifClip - 1 });
    },

    onGifClickNext() {
        if (this.state.selectedGifClip === this.props.clipsIds.length - 1) {
            this.setState({ selectedGifClip: 0 });
            return
        };
        this.setState({ selectedGifClip: this.state.selectedGifClip + 1 });
    },


    isSoloImage() {
        if (this.props) {
            return (this.props.thumbnailLength <= 1)
        }
        return false;
    },

    render() {
        if (this.context.isMobile) {
            return this.getMobile();
        }
        return this.getDesktop();
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
