import React, { PropTypes } from 'react';

import _ from 'lodash';

import RENDITIONS from '../../modules/renditions';
import SESSION from '../../modules/session';
import TRACKING from '../../modules/tracking';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import { windowOpen, objectToGetParams } from '../../modules/sharing';

import BasePage from './BasePage';
import CollectionsContainer from '../knave/CollectionsContainer';
import PagingControls from '../core/PagingControls';
import UploadForm from '../knave/UploadForm';

import {
    filteredTagStore,
    Store,
    cancelActions,
    LoadActions,
    SendActions,
    Dispatcher,
    Search } from '../../stores/CollectionStores';

class CollectionsMainPage extends React.Component {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    constructor() {
        super();
        this.state = {
            ...Store.getState(),
            ...{
                currentPage: 0,
                searchQuery: '',
                tooltipText: undefined,
                isSearchPending: false,
            },
        };
        this.onUpdateState = this.onUpdateState.bind(this);
        this.onChangeCurrentPage = this.onChangeCurrentPage.bind(this);
        this.onSocialShare = this.onSocialShare.bind(this);
        this.onSendResultEmail = this.onSendResultEmail.bind(this);
        this.onSendClipResultEmail = this.onSendClipResultEmail.bind(this);
        this.onSetSidebarContent = this.onSetSidebarContent.bind(this);
        this.onSetTooltipText = this.onSetTooltipText.bind(this);
        this.onSearchBarChange = this.onSearchBarChange.bind(this);
    }

    componentWillMount() {
        if (!SESSION.active() || !SESSION.state.accountId) {
            this.context.router.push(UTILS.DRY_NAV.SIGNIN.URL);
        }

        // Register our update function with the store dispatcher.
        Dispatcher.register(this.onUpdateState);

        // TODO needed?
        LoadActions.loadAccount(SESSION.state.accountId);

        Search.load(20, true);
        // // Load initial results: first 2 quickly and a whole page or more.
        // const callback = () => {
        //    // Route to onboarding if they've got no tags already.
        //    if (_.isEmpty(this.state.tags)) {
        //        this.context.router.push(UTILS.DRY_NAV.ONBOARDING_UPLOAD.URL);
        //    }
        //    Search.load(UTILS.RESULTS_PAGE_SIZE);
        // };
        // Search.load(2, true, callback.bind(this));
        // this.setIntervalId = setInterval(Search.reload.bind(
        //    null, UTILS.RESULTS_PAGE_SIZE), UTILS.POLL_INTERVAL_SECONDS * 1000);
    }

    componentWillUnmount() {
        if (this.setIntervalId) {
            clearInterval(this.setIntervalId);
        }
        Dispatcher.unregister(this.onUpdateState);
        Store.resetStores();
        cancelActions();
    }

    onDeleteCollection(tagId) {
        SendActions.deleteCollection(tagId);
    }

    onToggleThumbnailEnabled(thumbnail) {
        SendActions.toggleThumbnailEnabled(thumbnail);
    }

    onChangeCurrentPage(change) {
        const currentPage = this.state.currentPage + change;
        const isSearchPending = Search.pending > 0;
        this.setState({ currentPage, isSearchPending }, this.loadMoreFromSearch);
    }

    onSocialShare(service, shareUrl) {
        switch (service) {
        case 'facebook':
            this.sendShare(
                UTILS.SHARE_LINK_FACEBOOK,
                shareUrl,
                T.get('copy.share.title'),
                T.get('copy.share.facebook'),
                'facebook');
            break;
        case 'twitter':
            this.sendShare(
                UTILS.SHARE_LINK_TWITTER,
                shareUrl,
                null,
                T.get('copy.share.twitter'),
                'twitter');
            break;
        case 'linkedin':
            this.sendShare(
                UTILS.SHARE_LINK_LINKEDIN,
                shareUrl,
                T.get('copy.share.title'),
                T.get('copy.share.linkedin'),
                'linkedin');
            break;
        default:
        }
    }

    onSendResultEmail(email, tagId, gender, age, fourThumbnails, callback) {
        if (!UTILS.isEmailAddress(email)) {
            callback({
                status_code: 400,
                errorMessage: T.get('error.invalidEmail'),
            });
            return;
        }

        const [best, first, second, third] = fourThumbnails;
        // TODO add wait for share load.
        const shareUrl = this.state.tagShares[tagId].url;

        const tag = this.state.tags[tagId];
        const lift = this.state.lifts[gender][age][tagId][best.thumbnail_id];

        const renditionTop = RENDITIONS.findRendition(best, 425, 240);
        const rendition1 = RENDITIONS.findRendition(first, 140, 79);
        const rendition2 = RENDITIONS.findRendition(second, 140, 79);
        const rendition3 = RENDITIONS.findRendition(third, 140, 79);
        let data = {};

        if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
            data = {
                to_email_address: email,
                template_slug: UTILS.RESULTS_MANDRILL_SLUG,
                template_args: {
                    top_thumbnail: renditionTop,
                    lift: UTILS.makePercentage(lift, 0, true),
                    thumbnail_one: rendition1,
                    thumbnail_two: rendition2,
                    thumbnail_three: rendition3,
                    collection_url: shareUrl,
                },
            };
        } else if (tag.tag_type === UTILS.TAG_TYPE_IMAGE_COL) {
            let liftString = '';
            let buttonString = '';
            let seeMoreString = '';
            const neonScore = best.neon_score;
            if (tag.thumbnail_ids.length <= 1) {
                liftString = T.get('copy.email.oneResultLiftString');
                seeMoreString = T.get('copy.email.oneResultSeeMoreString');
                buttonString = T.get('copy.email.oneResultButtonString');
            } else {
                liftString = T.get('copy.email.multipleResultsLiftString',
                    { '@lift': UTILS.makePercentage(lift, 0, true) });
                buttonString = T.get('copy.email.multipleResultsButtonString');
                seeMoreString = T.get('copy.email.multipleResultsSeeMoreString');
            }
            data = {
                to_email_address: email,
                template_slug: UTILS.IMAGE_RESULTS_MANDRILL_SLUG,
                template_args: {
                    top_thumbnail: renditionTop,
                    lift_string: liftString,
                    button_string: buttonString,
                    see_more_string: seeMoreString,
                    collection_url: shareUrl,
                    neon_score: neonScore,
                },
            };
        } else {
            callback({
                status_code: 400,
                errorMessage: 'unknown tag type unable to send email',
            });
            return;
        }
        TRACKING.sendEvent(this, arguments, tagId);
        SendActions.sendEmail(data, callback);
    }

    onSendClipResultEmail(email, tagId, gender, age, callback) {
        if (!UTILS.isEmailAddress(email)) {
            callback({
                status_code: 400,
                errorMessage: T.get('error.invalidEmail'),
            });
        }

        const tag = this.state.tags[tagId];
        const video = this.state.videos[tag.video_id];
        const demo = UTILS.findDemographicObject(video.demographic_clip_ids, gender, age);

        // Pick the matching clips.
        const clips = _(this.state.clips[gender][age])
            .pick(demo.clip_ids)
            .values()
            .value();

        const sortedClips = _.orderBy(clips, 'neon_score', ['desc']);
        const best = sortedClips[0];
        const worst = sortedClips.pop();
        // Get lift string: the percentage improvement: e.g., "35%".
        const lift = UTILS.makePercentage(
            (best.neon_score / worst.neon_score) - 1, 0, true);

        // Find the gif with the width we need, or just any gif.
        const bestRendition = best.renditions.find(r => (
            r.width === UTILS.GIF_EMAIL_DIMENSION && _.endsWith(r.url, '.gif')
        )) || best.renditions.find(r => _.endsWith(r.url, '.gif'));
        const bestUrl = bestRendition.url;

        const collectionUrl = this.state.tagShares[tagId].url;
        const data = {
            to_email_address: email,
            template_slug: UTILS.GIF_RESULTS_MANDRILL_SLUG,
            template_args: {
                lift,
                top_gif: bestUrl,
                collection_url: collectionUrl,
            },
        };
        TRACKING.sendEvent(this, arguments, tagId);
        SendActions.sendEmail(data, callback);
    }

    // Takes a string in [
    // learnMore, contact, signUp, account ] or null
    onSetSidebarContent(sidebarContent) {
        this.setState({ sidebarContent });
    }

    onSetTooltipText(tooltipText) {
        this.setState({ tooltipText });
    }

    onSearchBarChange(e) {
        // Use the query to filter display of results.
        const searchQuery = e.target.value.trim();

        // Update the stateful filteredtagstore.
        filteredTagStore.isCompletelyLoaded = false;
        if (searchQuery) {
            // Apply a non-empty search to our data provider.
            filteredTagStore.setFilter(this.nameFilter.bind(null, searchQuery));
        } else {
            filteredTagStore.reset();
        }

        // If query is nothing, then don't use backend.
        if (!searchQuery) {
            // If query is running, cancel.
            if (self.searchFunction) {
                self.searchFunction.cancel();
                Search.pending -= 1;
                self.searchFunction = null;
            }
            self.setState({
                searchQuery,
                isSearchPending: Search.pending > 0,
                currentPage: 0,
                selectedTags: filteredTagStore.getAll(),
            });
            return;
        }

        // If we have a query:
        // We debounce a function, store it and use it to throttle requests.
        if (!self.searchFunction) {
            self.searchFunction = _.debounce(
                // Run a stateful search.
                self.loadMoreFromSearch.bind(self, false),
                // Millis between requests after first one.
                1000,
                { leading: true, trailing: true }
            );
        }

        // Resolve state change then search.
        self.setState({
            searchQuery,
            currentPage: 0,
            selectedTags: filteredTagStore.getAll(),
        }, self.searchFunction);
    }

    onUpdateState() {
        const state = Store.getState();
        state.isSearchPending = Search.pending > 1;
        this.setState(state);
    }

    getShownIds() {
        // The size and offset into the list.
        const pageSize = 20; //UTILS.RESULTS_PAGE_SIZE;
        const offset = pageSize * this.state.currentPage;

        // Get the ordered array of selectable tag ids
        // and slice it to size.
        return _(this.state.selectedTags)
            .orderBy(['created'], ['desc'])
            .slice(offset, pageSize + offset)
            .map('tag_id')
            .value();
    }

    // Get the name of a tag, else the title of
    // the tag's video, else the empty string.
    getTagName(tag) {
        if (tag.name == null) {
            return '';
        }
        if (tag.name) {
            return tag.name;
        }
        if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
            return this.state.videos[tag.video_id].title;
        }
        return '';
    }

    getTitle() {
        return UTILS.buildPageTitle(T.get('copy.myCollections.title'));
    }

    getPagingEnableNext() {
        const itemCount = (1 + this.state.currentPage) * UTILS.RESULTS_PAGE_SIZE;
        return Search.hasMoreThan(itemCount);
    }

    // Given a tag, return true if its name
    // contains search query.
    filterOnName(query, tag) {
        if (!query) {
            return true;
        }
        const name = this.getTagName(tag).toLowerCase();
        if (!name) {
            return false;
        }
        return name.search(query.toLowerCase() !== -1);
    }

    // TODO factor this and the default filter.
    nameFilter(searchQuery, tag) {
        return tag.hidden !== true &&
            (tag.thumbnail_ids.length > 0 || tag.tag_type !== UTILS.TAG_TYPE_IMAGE_COL) &&
            this.filterOnName(searchQuery, tag);
    }


    isLoading() {
        return _.isEmpty(this.state.tags) && Search.pending > 0;
    }

    sendShare(baseUrl, shareUrl, title, quote, service) {
        const url = baseUrl + objectToGetParams({
            u: shareUrl,
            title,
            quote,
        });
        windowOpen(url);
        TRACKING.sendEvent(this, arguments, service);
    }

    // Ask the search provider to get more results.
    //
    // If useCurrentPage, only load if the page is near the end of the pages.
    //
    // If not, load more based on how many are in store.
    loadMoreFromSearch(useCurrentPage = true) {
        const count = useCurrentPage ?
            (1 + this.state.currentPage) * UTILS.RESULTS_PAGE_SIZE :
            filteredTagStore.count();

        if (this.state.searchQuery) {
            Search.loadWithQuery(count, this.state.searchQuery);
        } else {
            Search.load(count);
        }
        const isSearchPending = Search.pending > 0;
        this.setState({ isSearchPending });
    }

    renderCollections() {
        return (
            <div>
                <CollectionsContainer
                    isViewOnly={false}
                    shownIds={this.getShownIds()}
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
                    onSocialShare={this.onSocialShare}
                    onSetSidebarContent={this.onSetSidebarContent}
                    onSendResultEmail={this.onSendResultEmail}
                    onSendClipResultEmail={this.onSendClipResultEmail}
                    onSetTooltipText={this.onSetTooltipText}
                    onToggleThumbnailEnabled={this.onToggleThumbnailEnabled}
                    onDeleteCollection={this.onDeleteCollection}
                />
                <PagingControls
                    currentPage={this.state.currentPage}
                    onChangeCurrentPage={this.onChangeCurrentPage}
                    isNextEnabled={this.getPagingEnableNext()}
                    isSearchPending={this.state.isSearchPending}
                />
            </div>
        );
    }

    renderLoading() {
        return (
            <div className="xxOverlay" >
                <div className="xxVideoloadingSpinner">{T.get('copy.loading')}</div>
            </div>
        );
    }

    render() {
        const body = this.isLoading() ?
            this.renderLoading() :
            this.renderCollections();

        return (
            <BasePage
                title={T.get('copy.myCollections.title')}
                setSidebarContent={this.setSidebarContent}
                sidebarContent={this.state.sidebarContent}
                tooltipText={this.state.tooltipText}
                query={this.state.searchQuery}
                onSearchBarChange={this.onSearchBarChange}
                onSearchBarSubmit={this.onSearchBarSubmit}
            >
                {body}
                <UploadForm />
            </BasePage>
        );
    }
}

export default CollectionsMainPage;
