// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import UTILS from '../../modules/utils';
import RENDITIONS from '../../modules/renditions';
import T from '../../modules/translation';
import moment from 'moment';
import DropDown from './DropDown';
import _ from 'lodash';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Timeline = React.createClass({
    propTypes: {
        snapshots: React.PropTypes.object.isRequired,
        showNeonScore: React.PropTypes.bool.isRequired,
        pageTitle: React.PropTypes.string.isRequired,
        isPolling: React.PropTypes.bool.isRequired
    },
    getDefaultProps: function() {
        return {
            pageTitle: '',
            snapshots: {},
            isPolling: false,
            showNeonScore: false
        }
    },
    getInitialState: function() {
        const self = this;
        return ({
            snapshots: self.props.snapshots,
            sortedBy: 'timestamp' // timestamp || neonScore
        })
    },
    componentWillReceiveProps: function(nextProps) {
        const self = this;
        if (nextProps && nextProps.snapshots) {
            self.setState({
                snapshots: nextProps.snapshots
            });
        }
    },
    handleSortByChange: function(value) {
        const self = this;
        self.setState({
            sortedBy: value
        });
    },
    getSnapshots: function() {
        const self = this;
        let _snapshots = [];
        if (!(Object.keys(self.state.snapshots).length === 0
            && self.state.snapshots.constructor === Object)) {
            // We need to iterate each one and get the best rendition
            _.values(self.state.snapshots).forEach(function(t) {
                _snapshots.push({
                    videoId: t.video_id,
                    thumbnailId: t.thumbnail_id,
                    timestamp: t.updated,
                    lowSrc: RENDITIONS.findRendition(t, 160 * 2.5, 90 * 2.5),
                    highSrc: t.url,
                    neonScore: t.neon_score,
                    dominantColor: t.dominant_color
                });
            });
            // We now got snapshots in the state we want, lets order them
            _snapshots = _.sortBy(_snapshots, self.state.sortedBy).reverse();
        }
        return _snapshots;
    },
    render: function() {
        const self = this,
            _snapshots = self.getSnapshots(),
            snapshotsCount = _snapshots.length,
            pollingBaseClass = ['timeline__controls__control timelinePolling'],
            pollingComponentClass = self.props.isPolling ? 'is-visible' : 'is-hidden'
        ;
        pollingBaseClass.push(pollingComponentClass);
        // Wee bit hacky but does the job for now - EH
        if (snapshotsCount > 0) {
            document.title = '(' + snapshotsCount + ') ' + self.props.pageTitle;
        }
        else {
            document.title = self.props.pageTitle;   
        }
        return (
            <div className="timeline__container">
                <nav className="timeline__controls">
                    <fieldset className="timeline__controls__control">
                        <label className="xxLabel">{T.get('label.sortBy')}</label>
                        <DropDown
                            options={
                                [
                                    {
                                        label: T.get('date'),
                                        value: 'timestamp'
                                        
                                    },
                                    {
                                        label: T.get('neonScore'),
                                        value: 'neonScore'
                                    }
                                ]
                            }
                            handleChange={self.handleSortByChange}
                            label={T.get('date')}
                        />
                    </fieldset>
                    <aside className={pollingBaseClass.join(' ')}>
                        <b className="timelinePolling__message">{T.get('copy.timelinePage.pollingMessage')}</b>
                        <i className="timelinePolling__spinner"></i>
                    </aside>
                </nav>
                <ol
                    className="timeline"
                    data-snapshots-count={snapshotsCount}
                >
                    {
                        _snapshots.map(function(snapshot, i) {
                            let neonScoreElement = self.props.showNeonScore ? <figcaption className="timeline__score">{snapshot.neonScore}</figcaption> : null,
                                fuzzyTimestamp = moment.utc(snapshot.timestamp).fromNow(),
                                uniqueKey = snapshot.videoId + snapshot.thumbnailId
                            ;
                            const dominantColorHex = UTILS.findDominantColor(snapshot.dominantColor);
                            const inlineBackgroundColour = dominantColorHex ? {
                                backgroundColor: dominantColorHex
                            } : null;
                            return (
                                <li
                                    className="timeline__moment"
                                    key={uniqueKey}
                                    data-neonscore={snapshot.neonScore}
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
                                        <figure
                                            className="timeline__frame"
                                            style={inlineBackgroundColour}
                                        >
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
