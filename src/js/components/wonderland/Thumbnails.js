// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import Thumbnail from './Thumbnail';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import Slide from './Slide';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Thumbnails = React.createClass({
    propTypes: {
        videoState: React.PropTypes.string.isRequired,
        videoStateMapping: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        forceOpen: React.PropTypes.bool.isRequired,
        isAccountServingEnabled: React.PropTypes.bool.isRequired
    },
    render: function() {
        var self = this;
        if (self.props.videoState === 'processing') {
            return (
                <div className="wonderland-slides container">
                    <Slide slideContent={T.get('copy.processingSlide.1')} icon="check-circle"/>
                    <Slide slideContent={T.get('copy.processingSlide.2')} icon="clock-o"/>
                    <Slide slideContent={T.get('copy.processingSlide.3')} icon="trophy"/>
                    <Slide slideContent={T.get('copy.processingSlide.4')} icon="picture-o"/>
                </div>
            );
        }
        else {
            var sortedThumbnails = this.props.thumbnails.sort(function(a, b) {
                return (b.neon_score === '?' ? 0 : b.neon_score) - (a.neon_score === '?' ? 0 : a.neon_score);
            });
            return (
                <div className="columns is-multiline is-mobile">
                    {
                        sortedThumbnails.map(function(thumbnail, i) {
                            if (thumbnail.type != 'random' && thumbnail.type !='centerframe') {
                                var neonScoreData = UTILS.NEON_SCORE_ENABLED ? UTILS.getNeonScoreData(thumbnail.neon_score) : '',
                                    rawNeonScore = UTILS.NEON_SCORE_ENABLED ? thumbnail.neon_score : 0,
                                    cookedNeonScore = UTILS.NEON_SCORE_ENABLED ? neonScoreData.neonScore : 0,
                                    strippedUrl = UTILS.stripProtocol(thumbnail.url)
                                ;
                                return (
                                    <div className="column is-half-mobile is-third-tablet is-third-desktop" key={thumbnail.thumbnail_id}>
                                        <Thumbnail
                                            index={i}
                                            videoStateMapping={self.props.videoStateMapping}
                                            isEnabled={thumbnail.enabled}
                                            strippedUrl={strippedUrl}
                                            url={thumbnail.url}
                                            rawNeonScore={rawNeonScore}
                                            cookedNeonScore={cookedNeonScore}
                                            thumbnailId={thumbnail.thumbnail_id}
                                            type={thumbnail.type}
                                            forceOpen={self.props.forceOpen}
                                            isAccountServingEnabled={self.props.isAccountServingEnabled}
                                        />
                                    </div>
                                );
                            }
                            else {
                                return false;
                            }
                        })
                    }
                </div>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Thumbnails;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
