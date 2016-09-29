'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import _ from 'lodash';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';

import BasePage from './BasePage';
import CollectionsContainer from '../knave/CollectionsContainer';
import {
    LoadActions,
    Dispatcher,
    Store,
    cancelActions
} from '../../stores/CollectionStores.js';

const ViewSharedCollectionPage = React.createClass({

    getInitialState: function() {
        return Object.assign(
            Store.getState(),
            { metaTags: [] },
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

    componentWillUnmount: function() {
        Dispatcher.unregister(this.updateState);
        Store.resetStores();
        cancelActions();
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
        self.setState(Store.getState(),
            () => {
                self.setState({metaTags: self.getMetaTagsFromProps()});
            }
        );
    },

    // Takes a string in [
    // learnMore, contact, signUp, account ] or null
    setSidebarContent: function(sidebarContent) {
        const self = this;
        self.setState({sidebarContent});
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
            <BasePage
                meta={this.state.metaTags}
                title={T.get('copy.myCollections.title')}
                setSidebarContent={this.setSidebarContent}
                sidebarContent={this.state.sidebarContent}
            >
                <CollectionsContainer
                    isMine={false}
                    shownIds={this.getShownIds()}
                    ownerAccountId={this.props.params.accountId}
                    stores={{
                        tags: this.state.tags,
                        videos: this.state.videos,
                        clips: this.state.clips,
                        thumbnails: this.state.thumbnails,
                        lifts: this.state.lifts,
                        thumbnailFeatures: this.state.thumbnailFeatures,
                        features: this.state.features,
                        tagShares: this.state.tagShares,
                        accounts: this.state.accounts,
                    }}
                    loadTagForDemographic={LoadActions.loadTagForDemographic}
                    loadFeaturesForTag={LoadActions.loadFeaturesForTag}
                    setSidebarContent={this.setSidebarContent}
                    getVideoStatus={this.getVideoStatus}
                    infoPanelOnly={true}
                />
            </BasePage>
        );
    }
});

export default ViewSharedCollectionPage;
