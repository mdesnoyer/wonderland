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
        demographicThumbnails: React.PropTypes.array.isRequired
    },
    getInitialState: function() {
        // move these up V some of them 
        var self = this;
        var curSelection = self.props.demographicThumbnails[self.props.selectedDemographic];
        var goodThumbs = UTILS.fixThumbnails(curSelection.thumbnails, true);
        var badThumbs = self.organizeBadThumbs(
            curSelection.bad_thumbnails,
            curSelection.thumbnails);
        var overlayThumbs = self.buildOverlayThumbs(goodThumbs, badThumbs); 
        return {
            thumbnails: overlayThumbs,
            goodThumbs: goodThumbs, 
            selectedItem: 0,
            isThumbnailOverlayActive: false,
            isPageOverlayActive: false,
            badThumbs: badThumbs,
            thumbsLength: overlayThumbs.length, 
            showLowScores: false, 
            defaultThumbnail: self.props.defaultThumbnail,
            showThumbnails: false
        };
    },
    componentWillReceiveProps: function(nextProps, nextState){
        var self = this;
        if (nextProps.selectedDemographic !== self.props.selectedDemographic) {
            if (nextProps.demographicThumbnails &&
              nextProps.demographicThumbnails[nextProps.selectedDemographic]) {  
                var nextSelection = nextProps.demographicThumbnails[nextProps.selectedDemographic];
                var goods = UTILS.fixThumbnails(nextSelection.thumbnails,
                                                true); 
                var bads = self.organizeBadThumbs(
                    nextSelection.bad_thumbnails,
                    nextSelection.thumbnails);
                var overlayThumbs = self.buildOverlayThumbs(goods, bads); 
                self.setState({ thumbnails: overlayThumbs, 
                                badThumbs: bads,
                                goodThumbs: goods,  
                                thumbsLength: overlayThumbs.length, 
                                defaultThumbnail: nextProps.defaultThumbnail }); 
            }
        }
    },
    handleClickPrevious: function(e) {
        e.preventDefault();
        var self = this;
        TRACKING.sendEvent(self, arguments, self.state.thumbnails[self.state.selectedItem]);
        self.setState({
            selectedItem: (self.state.selectedItem === 0) ? (self.state.thumbsLength - 1) : (self.state.selectedItem - 1)
        });
    },
    handleClickNext: function(e) {
        e.preventDefault();
        var self = this;
        TRACKING.sendEvent(self, arguments, self.state.thumbnails[self.state.selectedItem]);
        self.setState({
            selectedItem: (self.state.selectedItem === self.state.thumbsLength - 1) ? (0) : (self.state.selectedItem + 1)
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
        TRACKING.sendEvent(self, arguments,
                           self.state.isThumbnailOverlayActive);
    },
    render: function() {
        var self = this,
            thumbnailClassName = ['xxCollectionImages-all'],
            ThumbnailOverlayComponent = self.state.isThumbnailOverlayActive ? (
                <ThumbnailOverlay
                    closeThumbnailOverlay={self.closeThumbnailOverlay}
                    thumbnails={self.state.thumbnails}
                    selectedItem={self.state.selectedItem}
                    handleClickPrevious={self.handleClickPrevious}
                    handleClickNext={self.handleClickNext}
                    displayThumbLift={self.props.displayThumbLift || 0}
                    openLearnMore={self.props.openLearnMore}
                />
            ) : null
        ;
        if (!self.state.showThumbnails && self.props.isMobile) {
            thumbnailClassName.push('is-hidden');
        }
        return (
            <div className="xxCollectionImages">
                {ThumbnailOverlayComponent}
                <FeatureThumbnail
                    thumbnails={self.state.thumbnails}
                    videoId={self.props.videoId}
                    type="default"
                    handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                    handleClick={self.toggleThumbnailOverlay}
                    isMobile={self.props.isMobile}
                />
                <FeatureThumbnail
                    thumbnails={self.state.thumbnails}
                    videoId={self.props.videoId}
                    type="neon"
                    handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                    handleClick={self.toggleThumbnailOverlay}
                    isMobile={self.props.isMobile}
                />
                {
                    self.props.isMobile ? (
                        <div>
                            <Lift displayThumbLift={self.props.displayThumbLift} />
                            {
                                self.state.showThumbnails ? null : (
                                    <div className="xxShowMore" onClick={self.toggleThumbnails}>
                                        <a href="#">{T.get('action.showMore')}</a>
                                    </div>
                                )
                            }
                        </div>
                    ) : null
                }
                <div className={thumbnailClassName.join(' ')}>
                    {
                        self.props.isMobile ? (
                            <h2 className="xxCollection-subtitle">{T.get('copy.videos.topSelects')}</h2>
                        ) : null
                    }
                    <ThumbnailCollection
                        videoId={self.props.videoId}
                        thumbnails={self.state.goodThumbs}
                        handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                        handleClick={self.toggleThumbnailOverlay}
                        keyStart={1} // start these after the default 
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
                <div className={thumbnailClassName.join(' ')}>
                    {
                        self.props.isMobile ? (
                            <h2 className="xxCollection-subtitle">{T.get('copy.videos.lowest')}</h2>
                        ) : null
                    }
                    {
                        self.state.showLowScores || self.props.isMobile ? (
                            <ThumbnailCollection
                                thumbnails={self.state.badThumbs}
                                handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                                handleClick={self.toggleThumbnailOverlay}
                                // length of goodthumbs + 1 for default
                                keyStart={self.state.goodThumbs.length}
                                type="lowScores"
                                isMobile={self.props.isMobile}
                            />
                        ): null
                    }
                </div>
                {
                    (self.state.showThumbnails && self.props.isMobile) ? (
                        <div className="xxShowMore" onClick={self.toggleThumbnails}>
                            <a href="#">{T.get('action.showLess')}</a>
                        </div>
                    ) : null
                }
            </div>
        );
    },
    toggleLowScoresVisibility: function(e) {
        var self = this;
        self.setState({
            showLowScores: !self.state.showLowScores
        });
        TRACKING.sendEvent(self, arguments, self.state.showLowScores);
    },
    buildOverlayThumbs: function(goodThumbs, badThumbs) { 
        var self = this,
            dt = self.props.defaultThumbnail,
            gtExcDt = goodThumbs.filter(x => x.type !== 'default'),
            rv = [].concat(dt).concat(gtExcDt).concat(badThumbs); 
        return rv; 
    }, 
    organizeBadThumbs: function(allBadThumbs, goodThumbs) {
        // Filters a list of bad thumbnails so that we only have a the
        // set which is worse than the worst good thumb. Also, sorts
        // the bad thumbs by score.
        var self = this;
        var goodScores = goodThumbs.filter(
            x => x.type === 'neon' || x.type ==='customupload').map(
                x => x.neon_score);
        var filteredThumbs = allBadThumbs || [];
        if (goodScores != undefined && goodScores.length > 0) {
            var minGoodScore = Math.min.apply(Math, goodScores);
            filteredThumbs = filteredThumbs.filter(
                x => x.neon_score < minGoodScore);
        }
        var v = UTILS.fixThumbnails(filteredThumbs, false);
        return v;
    },
    toggleThumbnails: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            showThumbnails: !self.state.showThumbnails
        });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
