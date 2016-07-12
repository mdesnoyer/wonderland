// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import FuzzyTime from '../core/FuzzyTime';
import AjaxMixin from '../../mixins/Ajax';
import FeatureThumbnail from '../knave/FeatureThumbnail';
import ThumbnailOverlay from '../knave/ThumbnailOverlay';
import ThumbnailCollection from '../knave/ThumbnailCollection';
import TRACKING from '../../modules/tracking';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnails = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    propTypes: {
        thumbnails: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            thumbnails: self.props.thumbnails,
            total: self.props.thumbnails.length,
            selectedItem: 0,
            isThumbnailOverlayActive: false
        };
    },
    handleKeyEvent: function(e) {
        var self = this;
        switch (e.keyCode) {
            case 27: // Escape
                self.closeThumbnailOverlay(e);
                break;
            case 37: // Left Arrow
                self.handleClickPrevious(e);
                break;
            case 39: // Right Arrow
                self.handleClickNext(e);
                break;
        }
    },
    handleClickPrevious: function(e) {
        e.preventDefault();
        var self = this;
        TRACKING.sendEvent(self, arguments, self.state.thumbnails[self.state.selectedItem]);
        self.setState({
            selectedItem: (self.state.selectedItem === 0) ? (self.state.total - 1) : (self.state.selectedItem - 1)
        });
    },
    handleClickNext: function(e) {
        e.preventDefault();
        var self = this;
        TRACKING.sendEvent(self, arguments, self.state.thumbnails[self.state.selectedItem]);
        self.setState({
            selectedItem: (self.state.selectedItem === self.state.total - 1) ? (0) : (self.state.selectedItem + 1)
        });
    },
    closeThumbnailOverlay: function(e) {
        e.preventDefault();
        var self = this;
        self.toggleThumbnailOverlay(self.state.selectedItem);
    },
    toggleThumbnailOverlay: function(selectedItem) {
        var self = this;
        self.setState({
            isThumbnailOverlayActive: !self.state.isThumbnailOverlayActive,
            selectedItem: selectedItem
        });
    },
    render: function() {
        var self = this,
            ThumbnailOverlayComponent = self.state.isThumbnailOverlayActive ? (
                <ThumbnailOverlay
                    closeThumbnailOverlay={self.closeThumbnailOverlay}
                    thumbnails={self.state.thumbnails}
                    selectedItem={self.state.selectedItem}
                    total={self.state.total}
                    handleClickPrevious={self.handleClickPrevious}
                    handleClickNext={self.handleClickNext}
                    handleKeyEvent={self.handleKeyEvent}
                    displayThumbLift={self.props.displayThumbLift}
                />
            ) : null
        ;
        return (
            <div>
                <div className="xxCollectionImages">
                    <FeatureThumbnail
                        thumbnails={self.props.thumbnails}
                        videoId={self.props.videoId}
                        type="default"
                    />
                    <FeatureThumbnail
                        thumbnails={self.props.thumbnails}
                        videoId={self.props.videoId}
                        type="neon"
                        handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                        handleClick={self.toggleThumbnailOverlay}
                    />
                    <div className="xxCollectionImages-all">
                        <ThumbnailCollection
                            videoId={self.props.videoId}
                            thumbnails={self.state.thumbnails}
                            handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                            handleClick={self.toggleThumbnailOverlay}
                        />
                    </div>
                </div>
                {ThumbnailOverlayComponent}
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
