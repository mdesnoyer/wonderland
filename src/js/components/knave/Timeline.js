// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import UTILS from '../../modules/utils';
import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
import moment from 'moment';

import _ from 'lodash';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Timeline = React.createClass({
    propTypes: {
        stores: React.PropTypes.object.isRequired,
        feed: React.PropTypes.string,
        threshold: React.PropTypes.number.isRequired,
        showNeonScore: React.PropTypes.bool.isRequired,
        pageTitle: React.PropTypes.string.isRequired
    },
    getDefaultProps: function() {
        return {
            stores: {},
            feed: '',
            threshold: 0,
            showNeonScore: false
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
                                timestamp: t.updated,
                                lowSrc: RENDITIONS.findRendition(t, 160 * 2.5, 90 * 2.5),
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
            snapshots = self.getSnapshots(),
            snapshotsCount = snapshots.length
        ;
        // Wee bit hacky but does the job for now - EH
        if (snapshotsCount > 0) {
            document.title = '(' + snapshotsCount + ') ' + self.props.pageTitle;
        }
        else {
            document.title = self.props.pageTitle;   
        }
        return (
            <div>
                <ol
                    className="timeline"
                    data-threshold={self.props.threshold}
                    data-show-neonscore={self.props.showNeonScore}
                    data-feed={self.props.feed}
                    data-snapshots-count={snapshots.length}
                >
                    {
                        snapshots.map(function(snapshot, i) {
                            let neonScoreElement = self.props.showNeonScore ? <figcaption className="timeline__score">{snapshot.neonScore}</figcaption> : null,
                                fuzzyTimestamp = moment.utc(snapshot.timestamp).fromNow(),
                                uniqueKey = snapshot.videoId + snapshot.thumbnailId
                            ;
                            return (
                                <li
                                    className="timeline__moment"
                                    key={uniqueKey}
                                    data-score={snapshot.neonScore}
                                    data-video-id={snapshot.videoId}
                                    data-thumbnail-id={snapshot.thumbnailId}
                                    data-timestamp={snapshot.timestamp}
                                >
                                    <a
                                        id={uniqueKey}
                                        download
                                        href={snapshot.highSrc}
                                        className="timeline__download"
                                    >
                                        <figure>
                                            <img
                                                className="timeline__snapshot"
                                                src={snapshot.lowSrc}
                                                alt={fuzzyTimestamp}
                                                title={fuzzyTimestamp}
                                            />
                                            {neonScoreElement}
                                        </figure>
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
