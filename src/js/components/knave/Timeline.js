// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import UTILS from '../../modules/utils';
import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';

import _ from 'lodash';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Timeline = React.createClass({
    propTypes: {
        stores: React.PropTypes.object.isRequired,
        feed: React.PropTypes.string,
        threshold: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            stores: {},
            feed: '',
            threshold: 0
        }
    },
    getInitialState: function() {
        const self = this;
        return ({
            videos: []
        });
    },
    componentWillReceiveProps: function(nextProps) {
        const self = this;
        if (nextProps && nextProps.stores && nextProps.stores.videos) {
            self.setState({
                videos: nextProps.stores.videos
            });
        }
    },
    getSnapshots: function() {
        const self = this,
            videos = _.values(self.state.videos)
        ;
        let snapshots = [];
        if (videos) {
            videos.forEach(function(v) {
                
                if ((self.props.feed === '') || (v.custom_data && v.custom_data.feed && v.custom_data.feed === self.props.feed)) {
                    
                    // Get a video's thumbnails
                    const demographicThumbnailObject = UTILS.findDemographicThumbnailObject(v.demographic_thumbnails);
                    
                    
                    if (demographicThumbnailObject && demographicThumbnailObject.thumbnails) {

                        // We are only interested in good thumbnails (neon ones)    
                        const neonThumbnails = demographicThumbnailObject.thumbnails.filter(function(t) {
                            return (t.type === 'neon' && t.neon_score >= self.props.threshold)
                        });
                    
                        // We need to iterate each one and get the best rendition
                        neonThumbnails.forEach(function(t) {
                            snapshots.push({
                                videoId: v.video_id,
                                thumbnailId: t.thumbnail_id,
                                timestamp: new Date(t.updated).getTime(),
                                lowSrc: RENDITIONS.findRendition(t, 160 * 3, 90 * 3),
                                highSrc: t.url,
                                neonScore: t.neon_score
                            });
                        });

                        // We now got snapshots in the state we want, lets order them
                        snapshots = _.sortBy(snapshots, 'timestamp').reverse();
                    }
                }
            });
        }
        return snapshots;
    },
    render: function() {
        const self = this,
            snapshots = self.getSnapshots()
        ;
        return (
            <div>
                <ol className="timeline" data-threshold={self.props.threshold} data-feed={self.props.feed}>
                    {
                        snapshots.map(function(snapshot, i) {
                            return (
                                <li className="timeline__moment" key={i}>
                                    <a
                                        download
                                        href={snapshot.highSrc}
                                    >
                                        <img
                                            className="timeline__snapshot"
                                            data-video-id={snapshot.videoId}
                                            data-thumbnail-id={snapshot.videoId}
                                            data-timestamp={snapshot.timestamp}
                                            data-neonscore={snapshot.neonScore}
                                            src={snapshot.lowSrc}
                                            alt=''
                                            title=''
                                        />
                                    </a>
                                </li>
                            );
                        })
                    }
                </ol>
            </div>
        );
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Timeline;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
