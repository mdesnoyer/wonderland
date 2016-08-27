// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import ReactTooltip from 'react-tooltip';

import BaseCollection from './BaseCollection';
import MobileBaseCollection from './MobileBaseCollection';

import T from '../../modules/translation';

import {
    InfoDemoLiftPanel,
    InfoLiftPanel,
    EmailPanel,
    EmailControl,
    SharePanel,
    ShareControl,
    DeletePanel,
    DeleteControl,
    AddPanel, 
    AddControl } from './InfoActionPanels';

import {LoadActions} from '../../stores/CollectionStores';

import ImageUploadOverlay from './ImageUploadOverlay';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const ImageCollection = React.createClass({

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
        // Hide any open tooltip.
        ReactTooltip.hide();
        this.setState({selectedPanel : panelId});
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
        const overrideMap = {
            'copy.lift.explanation.default': 'copy.lift.explanation.images'
        };
        if (this.props.infoPanelOnly) {
            return [
                <InfoLiftPanel
                    title={this.props.title}
                    liftValue={this.getLiftValue()}
                    isSoloImage={this.props.rightFeatureThumbnail.thumbnail_id === this.props.leftFeatureThumbnail.thumbnail_id}
                    translationOverrideMap={overrideMap}
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
                displayRefilterButton={false}
                isSoloImage={this.props.rightFeatureThumbnail.thumbnail_id === this.props.leftFeatureThumbnail.thumbnail_id}
                translationOverrideMap={overrideMap}
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
            <AddPanel
                tagId={this.props.tagId}
                panelType='photo'
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
            />
        ];
    },
    getControls(){
        if (this.props.infoPanelOnly) {
            return [];
        }
        return [
            <ShareControl handleClick={()=>{this.setSelectedPanel(1)}} />,
            <EmailControl handleClick={()=>{this.setSelectedPanel(2)}} />,
            <DeleteControl handleClick={()=>{this.setSelectedPanel(3)}} />,
            <AddControl handleClick={()=>{this.setSelectedPanel(4)}} />
        ];
    },

    getMobile() {
        const overrideMap = {
            'copy.lift.explanation.default': 'copy.lift.explanation.images'
        };
        return (
            <MobileBaseCollection
                {...this.props}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanel={this.state.selectedPanel}
                wrapperClassName={'xxCollection xxCollection--photo'}
                liftValue={this.getLiftValue()}
                translationOverrideMap={overrideMap}
            />
        );
    },

    getDesktop() {
        return (
            <BaseCollection
                {...this.props}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanel={this.state.selectedPanel}
                wrapperClassName={'xxCollection xxCollection--photo'}
                setLiftThumbnailId={this.setLiftThumbnailId}
                isSoloImage={this.props.rightFeatureThumbnail.thumbnail_id === this.props.leftFeatureThumbnail.thumbnail_id}
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

export default ImageCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
