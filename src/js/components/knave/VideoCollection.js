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
    ImageServingDisabledControl} from './InfoActionPanels';

import {LoadActions} from '../../stores/CollectionStores';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const VideoCollection = React.createClass({

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
            <ServingStatusControl handleClick={()=>{this.setSelectedPanel(5)}} />
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
