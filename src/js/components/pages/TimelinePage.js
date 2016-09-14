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
            LoadActions.loadNNewestTags(self.state.pageSize, null, UTILS.TAG_TYPE_VIDEO_COL, true, function() {
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
            timelineConfigFile = require('../../../../env/timeline/timeline.config.json')
        ;
        let timelineConfig = {};
        try {
            // TODO fetch from file
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
                threshold: timelineConfig.THRESHOLD,
                showNeonScore: timelineConfig.SHOWNEONSCORE
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
                        self.fetchData(); self._interval = setInterval(self.fetchData, 10000);
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
    render: function() {
        const self = this,
            loadingComponent = self.state.isLoading ? <div className="xxOverlay"><div className="xxVideoloadingSpinner">{T.get('copy.loading')}</div></div> : null,
            pollingComponent = self.state.isPolling ? <div className="pollingSpinner"></div> : null
        ;
        return (
            <main className="xxPage">
                {loadingComponent}
                <Helmet
                    title={UTILS.buildPageTitle(self.state.title)}
                />
                <SiteHeader
                    killNav={true}
                />
                <h1 className="xxTitle">{self.state.title} {pollingComponent}</h1>
                <Timeline
                    stores={{
                        videos: self.state.videos,
                    }}
                    feed={self.state.feed}
                    pageSize={self.state.pageSize}
                    threshold={self.state.threshold}
                    showNeonScore={self.state.showNeonScore}
                />
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default timelinePage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -