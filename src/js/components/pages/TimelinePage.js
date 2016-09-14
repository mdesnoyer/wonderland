// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Helmet from 'react-helmet';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import _ from 'lodash';
import AjaxMixin from '../../mixins/Ajax';
import {LoadActions, Dispatcher, ThumbnailStore} from '../../stores/CollectionStores.js';
import Timeline from '../knave/Timeline';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var timelinePage = React.createClass({
    mixins: [AjaxMixin],
    _interval: null,
    _videoFilter: null,
    _thumbnailFilter: null,
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getStateFromStores: function() {
        const allThumbnails = ThumbnailStore.getAll();
        let thumbnails = {};
        if (allThumbnails && allThumbnails[0] && allThumbnails[0][0]) {
            thumbnails = allThumbnails[0][0];
        }
        return {
            thumbnails: thumbnails
        }
    },
    updateState: function() {
        const self = this,
            state = self.getStateFromStores()
        ;
        self.setState(state);
    },
    getInitialState: function() {
        const self = this;
        return Object.assign(
            self.getStateFromStores(),
            {
                thumbnails: {},
                title: '',
                isLoading: true,
                isPolling: true
            }
        );
    },
    componentWillMount: function() {
        const self = this,
            timelineId = self.props.params.timelineId,
            timelineConfigFile = require('../../../../env/timeline.config.json')
        ;
        Dispatcher.register(self.updateState);
        let timelineConfig = {};
        try {
            timelineConfig = timelineConfigFile[timelineId];
        }
        catch (ex) {
            self.context.router.replace(UTILS.DRY_NAV.NOT_FOUND.URL);
        }
        if (timelineConfig) {
            SESSION.end();
            self.setState({
                title: T.get('copy.timelinePage.title', {
                    '@title': timelineConfig.TITLE
                }),
                feed: timelineConfig.FEED,
                pageSize: timelineConfig.PAGESIZE,
                pollMinutes: timelineConfig.POLLMINUTES,
                threshold: timelineConfig.THRESHOLD,
                showNeonScore: timelineConfig.SHOWNEONSCORE,
            }, function() {
                SESSION.signIn(timelineConfig.UN, timelineConfig.PW)
                    .then(function (res) {
                        SESSION.set(res.access_token, res.refresh_token, res.account_ids[0], res.user_info);
                        // Setup our filters
                        self._videoFilter = function(v) {
                                return ((this.state.feed === '') || (v.custom_data && v.custom_data.feed && v.custom_data.feed === this.state.feed));
                            }.bind(self)
                            // passing in self allows us to access this.state.feed
                        ;
                        self._thumbnailFilter = function(t) {
                                return (t.type === 'neon' && t.neon_score >= this.state.threshold)
                            }.bind(self)
                            // passing in self allows us to access this.state.threshold
                        ;
                        self.fetchData();
                        self._interval = setInterval(self.fetchData, self.state.pollMinutes * 60 * 1000); // minutes to milliseconds
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
                ;
            });
        }
        else {
            self.context.router.replace(UTILS.DRY_NAV.NOT_FOUND.URL);
        }
    },
    componentWillUnmount: function() {
        const self = this;
        if (self._interval !== null) {
            clearInterval(self._interval);
            self._interval = null;
        }
    },
    fetchData: function() {
        const self = this;
        self.setState({
            isPolling: true
        }, function() {
            LoadActions.loadNNewestTags(
                self.state.pageSize,
                null,
                UTILS.TAG_TYPE_VIDEO_COL,
                true,
                self._videoFilter,
                self._thumbnailFilter, function() {
                    self.setState({
                        isLoading: false,
                        isPolling: false
                    });
                }
            );
        });
    },
    loadMore: function(e) {
        const self = this;
        e.preventDefault();
        self.setState({
            isLoading: true,
        }, function() {
            LoadActions.loadNOlderTags(self.state.pageSize, UTILS.TAG_TYPE_VIDEO_COL, self._videoFilter, self._thumbnailFilter, function() {
                self.setState({
                    isLoading: false
                });
            });
        })
    },
    render: function() {
        const self = this,
            loadingComponent = self.state.isLoading ? <div className="xxOverlay"><div className="xxVideoloadingSpinner">{T.get('copy.loading')}</div></div> : null,
            pageTitle = UTILS.buildPageTitle(self.state.title)
        ;
        return (
            <main className="xxPage">
                {loadingComponent}
                <Helmet
                    title={pageTitle}
                    meta={UTILS.HELMET_META_TAGS}
                />
                <SiteHeader
                    killNav={true}
                />
                <section className="xxText">
                    <div className="timelinePage__masthead">
                        <h1 className="xxTitle">{self.state.title}</h1>
                    </div>
                    <p>{T.get('copy.timelinePage.instructions', {
                        '@value': self.state.pollMinutes,
                        '@unit': self.state.pollMinutes === 1 ? 'minute' : 'minutes'
                    })}</p>
                </section>
                <Timeline
                    showNeonScore={self.state.showNeonScore}
                    pageTitle={pageTitle}
                    snapshots={self.state.thumbnails}
                    isPolling={self.state.isPolling}
                />
                <nav className="timelinePage__actions">
                    <a className="xxButton xxButton--highlight" href="#" onClick={self.loadMore}>{T.get('action.loadMore')}</a>
                </nav>
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default timelinePage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -