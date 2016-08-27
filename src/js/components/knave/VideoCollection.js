// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import ReactTooltip from 'react-tooltip';

import BaseCollection from './BaseCollection';
import MobileBaseCollection from './MobileBaseCollection';

import T from '../../modules/translation';

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
    AddControl } from './InfoActionPanels';

import {LoadActions} from '../../stores/CollectionStores';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const VideoCollection = React.createClass({

    // A reference to a setTimeout/setInterval for monitoring
    // the state of a processing video.
    processingMonitor: null,

    propTypes: {
        isRefiltering: React.PropTypes.bool
    },

    contextTypes: {
        isMobile: PropTypes.bool
    },

    getInitialState: function() {
        return {
            // What panel to display, based on user input by
            // clicking on the buttons (email/del/share) in the right panel
            selectedPanel: 0,
            liftThumbnailId: null
        };
    },
    componentDidMount: function() {
        this.setProcessingMonitor();
    },

    componentWillUpdate: function(nextProps, nextState) {
        this.setProcessingMonitor();
    },

    componentWillUnmount: function() {
        this.clearProcessingMonitor();
    },

    setProcessingMonitor: function() {
        const videoId = this.props.videoId;
        if (this.props.isRefiltering) {

            // Only set one per video.
            if(this.processingMonitor) {
                return;
            }

            const monitorFunction = LoadActions.loadVideos.bind(null, [videoId]);
            if (this.props.timeRemaining > 5) {
                const timeout = 1000 * this.props.timeRemaining;
                setTimeout(monitorFunction, timeout);
                return;
            }

            // Let's set a monitor until the video is out of processing.
            const interval = 1000 * 5;
            this.processingMonitor = setInterval(monitorFunction, interval);
            return;
        }

        // Else, the video is processed so clear a monitor.
        this.clearProcessingMonitor();
    },

    clearProcessingMonitor: function() {
        if (this.processingMonitor !== null) {
            clearInterval(this.processingMonitor);
            this.processingMonitor = null;
        }
    },


    setSelectedPanel: function(panelId) {
        // Clear any open tooltip.
        ReactTooltip.hide();
        this.setState({selectedPanel: panelId});
    },

    setLiftThumbnailId: function(thumbnailId) {
        this.setState({liftThumbnailId: thumbnailId})
    },

    getLiftValue() {
        const selectedId = this.state.liftThumbnailId;
        const defaultId = this.props.rightFeatureThumbnail.thumbnail_id;
        const map = this.props.thumbLiftMap || {};
        return map[selectedId || defaultId];
    },
    getPanels() {
        if (this.props.infoPanelOnly) {
            return [
                <InfoLiftPanel
                    title={this.props.title}
                    liftValue={this.getLiftValue()}
                />
            ];
        }
        return [
            <InfoDemoLiftPanel
                title={this.props.title}
                liftValue={this.getLiftValue()}
                onDemographicChange={this.props.onDemographicChange}
                demographicOptions={this.props.demographicOptions}
                selectedDemographic={this.props.selectedDemographic}
                handleRefiltersPanelClick={()=>{this.setSelectedPanel(1)}}
                isRefiltering={this.props.isRefiltering}
                timeRemaining={this.props.timeRemaining}
            />,
            <FilterPanel
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
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
                sendResultsEmail={this.props.sendResultsEmail}
            />,
            <DeletePanel
                deleteCollection={this.props.deleteCollection}
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
            />,
            <ServingStatusPanel
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
            />
        ];
    },
    getControls() {
        if (this.props.infoPanelOnly) {
            return [];
        }
        return [
            <ShareControl handleClick={()=>{this.setSelectedPanel(2)}} />,
            <EmailControl handleClick={()=>{this.setSelectedPanel(3)}} />,
            <DeleteControl handleClick={()=>{this.setSelectedPanel(4)}} />,
            <ServingStatusControl handleClick={()=>{this.setSelectedPanel(5)}} />,
            <AddControl handleClick={()=>{this.setSelectedPanel(6)}} />
        ];
    },

    getMobile: function() {
        const overrideMap = {
            'copy.worstThumbnail': 'copy.currentThumbnail',
            'copy.bestThumbnail': 'copy.topNeonImage',
        };
        return (
            <MobileBaseCollection
                {...this.props}
                translationOverrideMap={overrideMap}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanel={this.state.selectedPanel}
                wrapperClassName={'xxCollection xxCollection--video'}
                liftValue={this.getLiftValue()}
            />
        );
    },

    getDesktop: function() {
        // Apply Video component-specific labels.
        const overrideMap = {
            'copy.worstThumbnail': 'copy.currentThumbnail',
            'copy.bestThumbnail': 'copy.topNeonImage',
            'action.showMore': 'copy.thumbnails.low',
            'action.showLess': 'copy.thumbnails.high'
        };

        return (
            <BaseCollection
                {...this.props}
                translationOverrideMap={overrideMap}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanel={this.state.selectedPanel}
                wrapperClassName={'xxCollection xxCollection--video'}
                setLiftThumbnailId={this.setLiftThumbnailId}
            />
        );
    },

    render: function() {
        if (this.context.isMobile) {
            return this.getMobile();
        }
        return this.getDesktop();
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
