// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Thumbnail from './Thumbnail';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Thumbnails = React.createClass({
    propTypes: {
        videoState: React.PropTypes.string.isRequired,
        videoStateMapping: React.PropTypes.string.isRequired,
        thumbnails:  React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this;
        if (self.props.videoState === 'processing') {
            return (
                <div className="wonderland-slides">
                    <div className="wonderland-slides-slide notification is-info">
                        {T.get('copy.slideOne')}
                    </div>
                    <div className="wonderland-slides-slide notification is-info">
                        {T.get('copy.slideTwo')}
                    </div>
                    <div className="wonderland-slides-slide notification is-info">
                        {T.get('copy.slideThree')}
                    </div>
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
                                var neonScoreData = UTILS.getNeonScoreData(thumbnail.neon_score);
                                return (
                                    <div className="column is-half-mobile is-third-tablet is-third-desktop" key={thumbnail.thumbnail_id}>
                                        <Thumbnail
                                            index={i}
                                            videoStateMapping={self.props.videoStateMapping}
                                            isEnabled={thumbnail.enabled}
                                            url={thumbnail.url}
                                            rawNeonScore={thumbnail.neon_score || ''}
                                            cookedNeonScore={neonScoreData.neonScore}
                                            thumbnailId={thumbnail.thumbnail_id}
                                            type={thumbnail.type}
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
