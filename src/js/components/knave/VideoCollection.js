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

    componentWillUpdate: function() {
        this.setProcessingMonitor();
    },

    componentWillUnmount: function() {
        this.clearProcessingMonitor();
    },

    setProcessingMonitor: function() {
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
            />,
            <FilterPanel
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
                onDemographicChange={this.props.onDemographicChange}
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
    getControls() {
        if (this.props.infoPanelOnly) {
            return [];
        }
        let account = this.props.account;
        let control_array = [  
            <ShareControl handleClick={()=>{this.setSelectedPanel(2)}} />,
            <EmailControl handleClick={()=>{this.setSelectedPanel(3)}} />,
            <DeleteControl handleClick={()=>{this.setSelectedPanel(4)}} />,
        ];
        if (account && account.serving_enabled) {
            control_array.push(
                <ServingStatusControl handleClick={()=>{this.setSelectedPanel(5)}} />,
                <AddControl handleClick={()=>{this.setSelectedPanel(6)}} panelType='video'/>
            ); 
        } 
        return control_array; 
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
