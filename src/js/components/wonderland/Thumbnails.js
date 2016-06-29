// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import FuzzyTime from '../core/FuzzyTime';
import AjaxMixin from '../../mixins/Ajax';
import FeatureThumbnail from '../knave/FeatureThumbnail';
import ThumbnailCollection from '../knave/ThumbnailCollection';
import ZoomThumbnail from '../knave/ZoomThumbnail';
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
            isPageOverlayActive: false
        };
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
    closePageOverlay: function(e) {
        e.preventDefault();
        var self = this;
        self.togglePageOverlay(self.state.selectedItem);
    },
    togglePageOverlay: function(selectedItem) {
        var self = this;
        self.setState({
            isPageOverlayActive: !self.state.isPageOverlayActive,
            selectedItem: selectedItem
        });
    },
    render: function() {
        var self = this,
            tempValenceArray = ['sunshine', 'rainbows', 'unicorns', 'happiness', 'kittens'], // TODO
            pageOverlayComponent = self.state.isPageOverlayActive ? (
                <article className="xxOverlay xxOverlay--dark xxOverlay--scroll">
                    <a href="#" className="xxOverlay-close" onClick={self.closePageOverlay}>Close</a>
                    <div className="xxImageZoom">
                        {
                            self.state.thumbnails.map(function(thumbnail, i) {
                                return (
                                    <ZoomThumbnail
                                        key={i}
                                        thumbnail={thumbnail}
                                        index={i}
                                        selectedItem={self.state.selectedItem}
                                        total={self.state.total}
                                        handleClickPrevious={self.handleClickPrevious}
                                        handleClickNext={self.handleClickNext}
                                        displayThumbLift={self.props.displayThumbLift}
                                        valence={[tempValenceArray[Math.floor(Math.random() * tempValenceArray.length)]]}
                                    />
                                );
                            })
                        }
                    </div>
                </article>
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
                        handleClick={self.togglePageOverlay}
                    />
                    <div className="xxCollectionImages-all">
                        <ThumbnailCollection
                            videoId={self.props.videoId}
                            thumbnails={self.state.thumbnails}
                            handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                            handleClick={self.togglePageOverlay}
                        />
                    </div>
                </div>
                {pageOverlayComponent}
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
