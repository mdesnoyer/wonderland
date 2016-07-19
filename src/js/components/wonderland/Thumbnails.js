// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import FuzzyTime from '../core/FuzzyTime';
import AjaxMixin from '../../mixins/Ajax';
import FeatureThumbnail from '../knave/FeatureThumbnail';
import ThumbnailOverlay from '../knave/ThumbnailOverlay';
import ThumbnailCollection from '../knave/ThumbnailCollection';
import TRACKING from '../../modules/tracking';
import Lift from '../knave/Lift';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnails = React.createClass({
    mixins: [AjaxMixin],
    propTypes: {
        thumbnails: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            thumbnails: self.props.thumbnails,
            total: self.props.thumbnails.length,
            selectedItem: 0,
            isThumbnailOverlayActive: false,
            isPageOverlayActive: false,
            badThumbs: self.props.badThumbs,
            showLowScores: false
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
    componentWillReceiveProps: function(nextProps){
        var self = this;
        debugger 
        if (nextProps.thumbnails !== self.state.thumbnails){
            debugger
            self.setState({thumbnails: UTILS.fixThumbnails(nextProps.thumbnails)})
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
        var self = this;
        self.toggleThumbnailOverlay(e, self.state.selectedItem);
    },
    toggleThumbnailOverlay: function(e, selectedItem) {
        e.preventDefault();
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
        debugger
        return (
            <div className="xxCollectionImages">
                {
                    self.props.isMobile ? null : ThumbnailOverlayComponent
                }
                <FeatureThumbnail
                    thumbnails={self.props.thumbnails}
                    videoId={self.props.videoId}
                    type="default"
                    isMobile={self.props.isMobile}
                />
                <FeatureThumbnail
                    thumbnails={self.props.thumbnails}
                    videoId={self.props.videoId}
                    type="neon"
                    handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                    handleClick={self.toggleThumbnailOverlay}
                    isMobile={self.props.isMobile}
                />
                {
                    self.props.isMobile ? (
                        <Lift displayThumbLift={self.props.displayThumbLift} />
                    ) : null
                }
                <div className="xxCollectionImages-all">
                    {
                        self.props.isMobile ? (
                            <h2 className="xxCollection-subtitle">{T.get('copy.videos.topSelects')}</h2>
                        ) : null
                    }
                    <ThumbnailCollection
                        videoId={self.props.videoId}
                        thumbnails={self.state.thumbnails}
                        handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                        handleClick={self.toggleThumbnailOverlay}
                        type="highScores"
                        isMobile={self.props.isMobile}
                    />
                    {
                        self.props.isMobile || self.state.badThumbs.length === 0 ? null : (
                            <strong 
                                className="xxCollectionImages-allAnchor"
                                onClick={self.toggleLowScoresVisibility}
                            >
                                <span>
                                    {self.state.showLowScores ? T.get('copy.thumbnails.high') : T.get('copy.thumbnails.low')}
                                </span>
                            </strong>
                        )
                    }
                    </div>
                <div className="xxCollectionImages-all">
                    {
                        self.props.isMobile ? (
                            <h2 className="xxCollection-subtitle">{T.get('copy.videos.lowest')}</h2>
                        ) : null
                    }
                    {
                        self.state.showLowScores || self.props.isMobile ? (
                            <ThumbnailCollection
                                thumbnails={UTILS.fixThumbnails(self.state.badThumbs, false)}
                                type="lowScores"
                                isMobile={self.props.isMobile}
                            />
                        ): null
                    }
                </div>
            </div>
        );
    },
    toggleLowScoresVisibility: function(e) {
        var self = this;
        self.setState({
            showLowScores: !self.state.showLowScores
        });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
