// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import BaseCollection from './BaseCollection';

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
    DeleteControl
} from './InfoActionPanels';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const ImageCollection = React.createClass({

    getInitialState: function() {
        return {
            // What panel to display, based on user input by
            // clicking on the buttons (email/del/share) in the right panel
            selectedPanel: 0,
            liftThumbnailId: null
        };
    },
    setSelectedPanel: function(panelId) {
        var self = this;
        self.setState({
            selectedPanel: panelId
        });
    },
    setLiftThumbnailId: function(thumbnailId) {
        this.setState({liftThumbnailId: thumbnailId||this.props.rightFeatureThumbnail.thumbnail_id})
    },
    getPanels() {
        var self = this;
        const liftValue = this.props.thumbLiftMap[this.state.liftThumbnailId]
        if (this.props.infoPanelOnly) {
            return [
                <InfoLiftPanel
                    title={this.props.title}
                    liftValue={liftValue}
                />
            ];
        }
        return [
            <InfoDemoLiftPanel
                title={this.props.title}
                liftValue={liftValue}
                onDemographicChange={this.props.onDemographicChange}
                demographicOptions={this.props.demographicOptions}
                selectedDemographic={this.props.selectedDemographic}
                displayRefilterButton={false} 
                handleFiltersClick={self.setSelectedPanel(1)}
            />,
            <FilterPanel
                cancelClickHandler={this.setSelectedPanel(0)}
            />,
            <SharePanel
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
                socialClickHandler={this.props.socialClickHandler}
                getShareUrl={this.props.getShareUrl}
                id={this.props.tagId}
                type={'image'} // TODO extract
            />,
            <EmailPanel
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
                getShareUrl={this.props.getShareUrl}
                sendResultsEmail={this.props.sendResultsEmail}
                id={this.props.tagId}
                type={'image'}
            />,
            <DeletePanel
                deleteCollection={this.props.deleteCollection}
                cancelClickHandler={()=>{this.setSelectedPanel(0)}}
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
            <DeleteControl handleClick={()=>{this.setSelectedPanel(4)}} />
        ];
    },
    render: function() {
        return (
            <BaseCollection
                {...this.props}
                infoActionPanels={this.getPanels()}
                infoActionControls={this.getControls()}
                selectedPanel={this.state.selectedPanel}
                wrapperClassName={'xxCollection xxCollection--photo'}
                setLiftThumbnailId={this.setLiftThumbnailId}
            />
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
