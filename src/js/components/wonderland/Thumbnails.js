// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import Thumbnail from './Thumbnail';
import ThumbnailInfoBox from './ThumbnailInfoBox';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import FuzzyTime from '../core/FuzzyTime';
import Slide from './Slide';
import ModalParent from '../core/ModalParent';
import Carousel from '../core/Carousel';
import AjaxMixin from '../../mixins/Ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnails = React.createClass({
	mixins: [AjaxMixin], // ReactDebugMixin
    propTypes: {
        videoState: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        forceOpen: React.PropTypes.bool.isRequired,
        videoId: React.PropTypes.string.isRequired,
        isServingEnabled: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            isModalActive: false,
            selectedItem: 0,
            thumbnails: self.props.thumbnails,
            thumbnailsStats: {}
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            thumbnails: nextProps.thumbnails
        });
        if (nextProps.forceOpen) {
            self.GET('statistics/thumbnails', {
                data: {
                    video_id: self.props.videoId,
                    // Comma-separated string of fields to return. Can include
                    // serving_frac (the fraction of traffic seeing this
                    // thumbnail), ctr (the click-through rate), impressions
                    // (the number of impressions), conversions (the number
                    // of conversions), created, and updated.
                    fields: ['thumbnail_id', 'ctr', 'serving_frac', 'impressions', 'conversions', 'created', 'updated']
                }
            })
            .then(function(json) {
                var parsedThumbnailsStats = {};
                json.statistics.map(function(thumbnail, i) {
                    parsedThumbnailsStats[thumbnail.thumbnail_id] = {
                        ctr: UTILS.formatCtr(thumbnail.ctr),
                        servingFrac: UTILS.formatServingFrac(thumbnail.serving_frac),
                        impressions: thumbnail.impressions || 0,
                        conversions: thumbnail.conversions || 0,
                        created: <FuzzyTime date={thumbnail.created} />,
                        updated: <FuzzyTime date={thumbnail.updated} />
                    };
                });
                self.setState({
                    thumbnailsStats: parsedThumbnailsStats
                });
            })
            .catch(function(err) {
                // If this errors, we don't want to shout it. It can just
                // gracefully not work.
                console.log(err);
            });
        }
    },
    handleEnabledChange: function(index) {
        var self = this,
            newThumbnails = self.state.thumbnails
        ;
        newThumbnails[index].enabled = !newThumbnails[index].enabled;
        self.setState({
            thumbnails: newThumbnails,
            selectedItem: index
        });
    },
    handleToggleModal: function(selectedItem) {
        var self = this;
        self.setState({
            isModalActive: !self.state.isModalActive,
            selectedItem: selectedItem ? selectedItem : 0
        });
    },
    render: function() {
        var self = this,
            thumbnailElements = []
        ;
        if (self.props.videoState === 'processing') {
            return (
                <div className="wonderland-slides container">
                    <Slide slideContent={T.get('copy.processingSlide.1')} icon="check-circle" />
                    <Slide slideContent={T.get('copy.processingSlide.2')} icon="clock-o" />
                    <Slide slideContent={T.get('copy.processingSlide.3')} icon="trophy" />
                    <Slide slideContent={T.get('copy.processingSlide.4')} icon="picture-o" />
                </div>
            )
        }
        else {
            return (
                <div className="columns is-multiline is-mobile">
                    {
                        self.state.thumbnails.map(function(thumbnail, i) {
                            var neonScoreData = UTILS.NEON_SCORE_ENABLED ? UTILS.getNeonScoreData(thumbnail.neon_score) : '',
                                rawNeonScore = UTILS.NEON_SCORE_ENABLED ? thumbnail.neon_score : 0,
                                cookedNeonScore = UTILS.NEON_SCORE_ENABLED ? neonScoreData.neonScore : 0,
                                thumbnailElement = <Thumbnail
                                        index={i}
                                        isEnabled={thumbnail.enabled}
                                        strippedUrl={UTILS.stripProtocol(thumbnail.url)}
                                        url={thumbnail.url}
                                        rawNeonScore={rawNeonScore}
                                        cookedNeonScore={cookedNeonScore}
                                        frameNo={thumbnail.frameno || 0}
                                        type={thumbnail.type}
                                        forceOpen={self.props.forceOpen}
                                        isServingEnabled={self.props.isServingEnabled}
                                        width={thumbnail.width}
                                        height={thumbnail.height}
                                        thumbnailId={thumbnail.thumbnail_id}
                                        created={thumbnail.created}
                                        updated={thumbnail.updated}
                                        handleToggleModal={self.handleToggleModal}
                                        handleEnabledChange={self.handleEnabledChange}
                                        isModalActive={self.state.isModalActive}
                                        thumbnailStats={self.state.thumbnailsStats[thumbnail.thumbnail_id]}
                                    />
                            ;
                            thumbnailElements.push(thumbnailElement);
                            return (
                                <div
                                    className="column is-half-mobile is-half-tablet is-one-third-desktop"
                                    key={thumbnail.thumbnail_id}
                                >
                                    {thumbnailElement}
                                </div>
                            );
                        })
                    }
                    <ModalParent
                        isModalActive={self.state.isModalActive}
                        handleToggleModal={self.handleToggleModal}
                        isModalContentMax={true}
                    >
                        <Carousel
                            selectedItem={self.state.selectedItem}
                            isActive={self.state.isModalActive}
                        >
                            {
                                self.state.thumbnails.map(function(thumbnail, i) {
                                    return (
                                        <div
                                            className="box"
                                            key={thumbnail.thumbnail_id}
                                        >
                                            <div className="columns">
                                                <div className="column is-9">
                                                    {thumbnailElements[i]}
                                                </div>
                                                <div className="column is-3">
                                                    <ThumbnailInfoBox
                                                        frameNo={thumbnail.frameno || 0}
                                                        type={thumbnail.type}
                                                        width={thumbnail.width}
                                                        height={thumbnail.height}
                                                        thumbnailId={thumbnail.thumbnail_id}
                                                        created={thumbnail.created}
                                                        updated={thumbnail.updated}
                                                        thumbnailStats={self.state.thumbnailsStats[thumbnail.thumbnail_id]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </Carousel>
                    </ModalParent>
                </div>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
