/* global CONFIG:false */
import React from 'react';
import _ from 'lodash';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import BasePage from './BasePage';
import CollectionsMainPage from './CollectionsMainPage';
import CollectionsContainer from '../knave/CollectionsContainer';
import {
    LoadActions,
    Dispatcher,
    Store,
} from '../../stores/CollectionStores';

class ViewSharedCollectionPage extends CollectionsMainPage {

    static baseMetaTags = [
        { property: 'fb:app_id', content: UTILS.FACEBOOK_APP_ID },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: T.get('copy.share.contentTitle') },
        { property: 'og:description', content: T.get('copy.share.facebook') },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:site', content: UTILS.NEON_TWITTER_HANDLE },
        { property: 'twitter:description', content: T.get('copy.share.twitter') },
        { content: 'width=device-width, initial-scale=1.0', name: 'viewport' },
    ]

    constructor(props) {
        super(props);
        this.state = {
            ...Store.getState(),
            metaTags: [],
        };
        this.onUpdateState = this.onUpdateState.bind(this);
    }

    componentWillMount() {
        // Register our update function with the store dispatcher.
        Dispatcher.register(this.onUpdateState);
        LoadActions.loadTagByShareToken(
            this.props.params.accountId,
            this.props.params.tagId,
            this.props.params.shareToken
        );
    }

    // Build urls for the share image service endpoints.
    getMetaTagsFromProps() {
        let url = `${CONFIG.API_HOST +
            this.props.params.accountId
            }/social/image/`;
        // Config is missing the protocol. @TODO
        UTILS.stripProtocol(url);
        url = `https:${url}`;

        const twitterImageUrl = `${url}twitter/` +
            `?share_token=${
            this.props.params.shareToken}`;
        const imageUrl = `${url
            }?share_token=${
            this.props.params.shareToken}`;

        return this.baseMetaTags.concat([
            { property: 'og:image', content: imageUrl },
            { property: 'og:image:width', content: 800 },
            { property: 'og:image:height', content: 800 },
            { property: 'twitter:image', content: twitterImageUrl },
        ]);
    }

    onUpdateState() {
        this.setState(Store.getState(),
            () => {
                this.setState({ metaTags: this.getMetaTagsFromProps() });
            }
        );
    }

    getShownIds() {
        const tagIds = _.keys(this.state.tags);
        if (tagIds.length > 0) {
            return [tagIds[0]];
        }
        return [];
    }

    render() {
        return (
            <BasePage
                meta={this.state.metaTags}
                title={T.get('copy.myCollections.title')}
                onSetSidebarContent={this.onSetSidebarContent}
                sidebarContent={this.state.sidebarContent}
            >
                <CollectionsContainer
                    isViewOnly
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
                    }}
                    loadTagForDemographic={LoadActions.loadTagForDemographic}
                    loadFeaturesForTag={LoadActions.loadFeaturesForTag}
                    onSetSidebarContent={this.onSetSidebarContent}
                />
            </BasePage>
        );
    }
}

export default ViewSharedCollectionPage;
