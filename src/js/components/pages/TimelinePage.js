// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import Helmet from 'react-helmet';
import SiteHeader from '../wonderland/SiteHeader';
import SiteFooter from '../wonderland/SiteFooter';

import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';

import _ from 'lodash';

import {VideoStore} from '../../stores/CollectionStores.js';
import {LoadActions} from '../../stores/CollectionStores.js';

import Timeline from '../knave/Timeline';

import AjaxMixin from '../../mixins/Ajax';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var timelinePage = React.createClass({
    _interval: null,
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    mixins: [AjaxMixin],
    getInitialState: function() {
        return {
            videos: [],
            title: '',
            isLoading: true,
            isPolling: true
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
            LoadActions.loadNNewestTags(self.state.actualPageSize, null, UTILS.TAG_TYPE_VIDEO_COL, true, function() {
                self.setState({
                    videos: VideoStore.getAll(),
                    isLoading: false,
                    isPolling: false
                });
            });
        });
    },
    componentWillMount: function() {
        const self = this,
            timelineId = self.props.params.timelineId,
            timelineConfigFile = require('../../../../env/timeline.config.json')
        ;
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
                initialPageSize: timelineConfig.PAGESIZE,
                actualPageSize: timelineConfig.PAGESIZE,
                threshold: timelineConfig.THRESHOLD,
                showNeonScore: timelineConfig.SHOWNEONSCORE,
                pollMinutes: timelineConfig.POLLMINUTES
            }, function() {
                self.POST('authenticate', {
                    host: CONFIG.AUTH_HOST,
                    data: {
                        username: timelineConfig.UN,
                        password: timelineConfig.PW
                    }
                })
                    .then(function (res) {
                        SESSION.set(res.access_token, res.refresh_token, res.account_ids[0], res.user_info);
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
    loadMore: function(e) {
        const self = this;
        e.preventDefault();
        // Increase the actualPageSize and force a fetch
        self.setState({
            isLoading: true,
            actualPageSize: self.state.actualPageSize + self.state.initialPageSize
        }, function() {
            self.fetchData();
        })
    },
    render: function() {
        const self = this,
            loadingComponent = self.state.isLoading ? <div className="xxOverlay"><div className="xxVideoloadingSpinner">{T.get('copy.loading')}</div></div> : null,
            pollingComponentClass = self.state.isPolling ? 'timelinePolling is-visible' : 'timelinePolling is-hidden',
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
                        <aside className={pollingComponentClass}>
                            <b className="timelinePolling__message">{T.get('copy.timelinePage.pollingMessage')}</b>
                            <i className="timelinePolling__spinner"></i>
                        </aside>
                    </div>
                    <p>{T.get('copy.timelinePage.instructions', {
                        '@value': self.state.pollMinutes,
                        '@unit': self.state.pollMinutes === 1 ? 'minute' : 'minutes'
                    })}</p>
                </section>
                <Timeline
                    stores={{
                        videos: self.state.videos,
                    }}
                    feed={self.state.feed}
                    threshold={self.state.threshold}
                    showNeonScore={self.state.showNeonScore}
                    pageTitle={pageTitle}
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