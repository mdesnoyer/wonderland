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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnails = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    propTypes: {
        isGuest: React.PropTypes.bool.isRequired,
        videoState: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        videoId: React.PropTypes.string.isRequired,
        isServingEnabled: React.PropTypes.bool.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            isModalActive: false,
            selectedItem: 0,
            thumbnails: self.props.thumbnails,
            thumbnailsStats: {},
            showLowScores: false
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            thumbnails: nextProps.thumbnails
        });
        self.GET('statistics/thumbnails', {
            data: {
                video_id: self.props.videoId,
                fields: UTILS.THUMBNAIL_FIELDS
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
    },
    render: function() {
        var self = this,
            thumbnailElements = []
        ;
            return (
                <div className="xxCollectionImages">
                    <FeatureThumbnail
                        thumbnails={self.props.thumbnails}
                        type="default"
                    />
                    <FeatureThumbnail
                        thumbnails={self.props.thumbnails}
                        type="neon"
                    />
                    <div className="xxCollectionImages-all">
                        <ThumbnailCollection
                            thumbnails={self.state.thumbnails}
                        />
                    </div>
                </div>
            );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
