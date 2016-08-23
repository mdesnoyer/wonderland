'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import _ from 'lodash';

import UTILS from '../../modules/Utils';
import T from '../../modules/Translation';

import Helmet from 'react-helmet';
import SiteHeader from '../wonderland/SiteHeader';
import CollectionsContainer from '../knave/CollectionsContainer';
import SiteFooter from '../wonderland/SiteFooter';
import {
    TagStore,
    VideoStore,
    ThumbnailStore,
    LiftStore,
    FeatureStore,
    ThumbnailFeatureStore,
    LoadActions,
    Dispatcher } from '../../stores/CollectionStores.js';

// TODO Factor this from here and CollectionsMainPage.
const getStateFromStores = () => {

    return {
        // These are stores of tag, video, thumbnail resources.
        //
        // Map of tag id to tag.
        tags: TagStore.getAll(),

        // Map of video id to video.
        videos: VideoStore.getAll(),

        // Map of gender, age, thumbnail id to thumbnail.
        thumbnails: ThumbnailStore.getAll(),

        // Map of gender, age, tag id to map of thumb id to lift float
        //
        // Note: This assumes the tag has only one base thumbnail
        // for comparisons: for a video with a default thumbnail,
        // it is the default thumbnail. In all other cases, it's
        // the worst thumbnail.
        lifts: LiftStore.getAll(),

        // Map of feature key to feature name
        features: FeatureStore.getAll(),

        // Map of gender, age, thumbnail id to array of feature key
        // sorted by value descending.
        thumbnailFeatures: ThumbnailFeatureStore.getAll()
    };
};

const ViewSharedCollectionPage = React.createClass({

    getInitialState: function() {
        return Object.assign(
            {
                pageTitle: T.get('share'),
                metaTags: []
            },
            getStateFromStores()
        );
    },

    componentWillMount: function() {
        // Register our update function with the store dispatcher.
        Dispatcher.register(this.updateState);
        LoadActions.loadTagByShareToken(
            this.props.params.accountId,
            this.props.params.tagId,
            this.props.params.shareToken
        );
    },

    baseMetaTags: [
        {property: 'fb:app_id', content: UTILS.FACEBOOK_APP_ID},
        {property: 'og:type', content: 'article'},
        {property: 'og:title', content: T.get('copy.share.contentTitle')},
        {property: 'og:description', content: T.get('copy.share.facebook')},
        {property: 'twitter:card', content: 'summary_large_image'},
        {property: 'twitter:site', content: UTILS.NEON_TWITTER_HANDLE},
        {property: 'twitter:description', content: T.get('copy.share.twitter')},
        {content: 'width=device-width, initial-scale=1.0', name: 'viewport'}
    ],

    // TODO factor this from here and VideoPageGuest.
    // Build urls for the share image service endpoints.
    getMetaTagsFromProps: function() {
        var _url = CONFIG.API_HOST +
            this.props.params.accountId +
            '/social/image/'
        // Config is missing the protocol. @TODO
        UTILS.stripProtocol(_url)
        _url = 'https:' + _url;

        const twitter_image_url = _url + 'twitter/' +
            '?share_token=' +
            this.props.params.shareToken;
        const image_url = _url +
            '?share_token=' +
            this.props.params.shareToken;

        return this.baseMetaTags.concat([
            {property: 'og:image', content: image_url},
            {property: 'og:image:width', content: 800},
            {property: 'og:image:height', content: 800},
            {property: 'twitter:image', content: twitter_image_url}
        ]);
    },

    updateState: function() {
        const self = this;
        self.setState(getStateFromStores(),
            () => {
                const stateDiff = {};
                // Set the page title to the first collection's name.
                if(!_.isEmpty(self.state.tags)) {
                    const name = _(self.state.tags)
                        .values()
                        .head()
                        .name;
                    if(name) {
                        stateDiff.pageTitle = name;
                    }
                }
                stateDiff.metaTags = self.getMetaTagsFromProps();
                self.setState(stateDiff);
            }
        );
    },

    getVideoStatus: function(videoId) {
        var self = this;
        self.GET('videos', {data: {video_id: videoId, fields: UTILS.VIDEO_FIELDS}})
            .then(function(res) {
                res.videos[0].state === 'processed' || res.videos[0].state === 'failed' ? LoadActions.loadVideos([videoId]) : setTimeout(function() {self.getVideoStatus(videoId);}, 30000);
            })
            .catch(function(err) {
                console.log(err)
            });
    },

    getShownIds: function() {
        const tagIds = _.keys(this.state.tags);
        if (tagIds.length > 0) {
            return [tagIds[0]];
        }
        return [];
    },


    render: function() {
        return (
            <main className='xxPage'>
                <Helmet
                    meta={this.state.metaTags}
                    title={UTILS.buildPageTitle(this.state.pageTitle)}
                />
                <SiteHeader />
                <CollectionsContainer
                    shownIds={this.getShownIds()}
                    stores={{
                        tags: this.state.tags,
                        videos: this.state.videos,
                        thumbnails: this.state.thumbnails,
                        lifts: this.state.lifts,
                        thumbnailFeatures: this.state.thumbnailFeatures,
                        features: this.state.features
                    }}
                    loadTagForDemographic={LoadActions.loadTagForDemographic}
                    loadFeaturesForTag={LoadActions.loadFeaturesForTag}
                    loadThumbnails={LoadActions.loadThumbnails}
                    getVideoStatus={this.getVideoStatus}
                    infoPanelOnly={true}
                />
                <SiteFooter />
            </main>
        );
    }
});

export default ViewSharedCollectionPage;
