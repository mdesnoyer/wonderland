import React, { PropTypes } from 'react';

import _ from 'lodash';

import RENDITIONS from '../../modules/renditions';
import SESSION from '../../modules/session';
import TRACKING from '../../modules/tracking';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import { windowOpen, objectToGetParams } from '../../modules/sharing';

import BasePage from './BasePage';
import SearchBar from '../core/SearchBar';
import CollectionsContainer from '../knave/CollectionsContainer';
import PagingControls from '../core/PagingControls';
import UploadForm from '../knave/UploadForm';

import {
    tagStore,
    filteredTagStore,
    Store,
    cancelActions,
    LoadActions,
    SendActions,
    ServingStatusActions,
    Dispatcher,
    Search } from '../../stores/CollectionStores';

const CollectionsMainPage = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState() {
        return Object.assign(
            Store.getState(),
            {
                currentPage: 0,
                searchQuery: '',
                tooltipText: undefined,
                searchPending: false
            },
        );
    },

    componentWillMount() {
        if (!SESSION.active() || !SESSION.state.accountId) {
            return this.context.router.push(UTILS.DRY_NAV.SIGNIN.URL);
        }

        // Register our update function with the store dispatcher.
        Dispatcher.register(this.updateState);

        // Load initial results: first 2 quickly and a whole page or more.
        const callback = () => {
            // Route to onboarding if they've got no tags already.
            if (_.isEmpty(this.state.tags)) {
                return this.context.router.push(UTILS.DRY_NAV.ONBOARDING_UPLOAD.URL);
            }
            Search.load(UTILS.RESULTS_PAGE_SIZE);
        };
        Search.load(2, true, callback.bind(this));
        this.setIntervalId = setInterval(Search.reload.bind(null, UTILS.RESULTS_PAGE_SIZE), UTILS.POLL_INTERVAL_SECONDS * 1000);
    },

    componentWillUnmount() {
        if (this.setIntervalId) {
            clearInterval(this.setIntervalId);
        }
        Dispatcher.unregister(this.updateState);
        Store.resetStores();
        cancelActions();
    },

    updateState() {
        const state = Store.getState();
        state.searchPending = Search.pending > 0;
        this.setState(state);
    },

    changeCurrentPage(change) {
        const self = this;
        const currentPage = self.state.currentPage + change
        const searchPending = Search.pending > 0;
        self.setState({currentPage, searchPending}, this.loadMoreFromSearch);
    },

    // Ask the search provider to get more results.
    //
    // If useCurrentPage, only load if the page is near the end of the pages.
    //
    // If not, load more based on how many are in store.
    loadMoreFromSearch(useCurrentPage=true) {
        const self = this;
        const count = useCurrentPage ?
            (1 + self.state.currentPage) * UTILS.RESULTS_PAGE_SIZE :
            filteredTagStore.count();

        if(self.state.searchQuery) {
            Search.loadWithQuery(count, self.state.searchQuery);
        } else {
            Search.load(count);
        }
        const searchPending = Search.pending > 0;
        self.setState({ searchPending });
    },

    socialClickHandler(service, shareUrl) {
        switch(service) {
            case 'facebook':
                this._sendShare(
                    UTILS.SHARE_LINK_FACEBOOK,
                    shareUrl,
                    T.get('copy.share.title'),
                    T.get('copy.share.facebook'),
                    'facebook');
                break;
            case 'twitter':
                this._sendShare(
                    UTILS.SHARE_LINK_TWITTER,
                    shareUrl,
                    null,
                    T.get('copy.share.twitter'),
                    'twitter');
                break;
            case 'linkedin':
                this._sendShare(
                    UTILS.SHARE_LINK_LINKEDIN,
                    shareUrl,
                    T.get('copy.share.title'),
                    T.get('copy.share.linkedin'),
                    'linkedin');
                break;
        }
    },

    _sendShare(baseUrl, shareUrl, title, quote, service) {
        var url = baseUrl + objectToGetParams({
                u: shareUrl,
                title: title,
                quote: quote
            })
        ;
        windowOpen(url);
        TRACKING.sendEvent(this, arguments, service);
    },

    enableThumbnail(thumbnail) {
        ServingStatusActions.toggleThumbnailEnabled(thumbnail);
    },

    disableThumbnail(thumbnail) {
        ServingStatusActions.toggleThumbnailEnabled(thumbnail);
    },

    sendResultsEmail(email, tagId, gender, age, fourThumbnails, callback) {
        const self = this;
        if (!UTILS.isEmailAddress(email)) {
           callback({
               'status_code' : 400,
               'errorMessage' : T.get('error.invalidEmail')
           });
           return;
        }

        const [best, first, second, third] = fourThumbnails;
        // TODO add wait for share load.
        const shareUrl = self.state.tagShares[tagId].url;

        const tag = self.state.tags[tagId];
        const lift = self.state.lifts[gender][age][tagId][best.thumbnail_id];

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
                    'top_thumbnail': renditionTop,
                    'lift': UTILS.makePercentage(lift, 0, true),
                    'thumbnail_one': rendition1,
                    'thumbnail_two': rendition2,
                    'thumbnail_three': rendition3,
                    'collection_url': shareUrl
                }
            };
        } else if (tag.tag_type === UTILS.TAG_TYPE_IMAGE_COL) {
            let liftString = '';
            let buttonString = '';
            let seeMoreString = '';
            let neonScore = best.neon_score;
            if (tag.thumbnail_ids.length <= 1) {
                liftString = T.get('copy.email.oneResultLiftString');
                seeMoreString = T.get('copy.email.oneResultSeeMoreString');
                buttonString = T.get('copy.email.oneResultButtonString');
            }
            else {
                liftString = T.get('copy.email.multipleResultsLiftString',
                    {'@lift': UTILS.makePercentage(lift, 0, true)});
                buttonString = T.get('copy.email.multipleResultsButtonString');
                seeMoreString = T.get('copy.email.multipleResultsSeeMoreString');
            }
            data = {
                to_email_address: email,
                template_slug: UTILS.IMAGE_RESULTS_MANDRILL_SLUG,
                template_args: {
                    'top_thumbnail': renditionTop,
                    'lift_string': liftString,
                    'button_string': buttonString,
                    'see_more_string': seeMoreString,
                    'collection_url': shareUrl,
                    'neon_score': neonScore
                }
            };
        } else {
            callback({
                'status_code' : 400,
                'errorMessage' : 'unknown tag type unable to send email'
            });
            return;
        }
        TRACKING.sendEvent(self, arguments, tagId);
        SendActions.sendEmail(data, callback);
    },

    sendGifResultsEmail(email, tagId, gender, age, callback) {
        if (!UTILS.isEmailAddress(email)) {
           callback({
               'status_code' : 400,
               'errorMessage' : T.get('error.invalidEmail'),
           });
        }

        const self = this;
        const tag = self.state.tags[tagId];
        const video = self.state.videos[tag.video_id];
        const demo = UTILS.findDemographicObject(video.demographic_clip_ids, gender, age);

        // Pick the matching clips.
        const clips = _(self.state.clips[gender][age])
            .pick(demo.clip_ids)
            .values()
            .value();

        // Get the best clip.
        const sortedClips = _.orderBy(clips, 'neon_score', ['desc']);
        const best = sortedClips[0];

        // Find the gif with the width we need, or just any gif.
        const bestRendition = best.renditions.find(r => (
            r.width === UTILS.GIF_EMAIL_DIMENSION && _.endsWith(r.url, '.gif')
        )) || best.renditions.find(r => _.endsWith(r.url, '.gif'));
        const bestUrl = bestRendition.url;

        const collectionUrl = self.state.tagShares[tagId].url;
        const data = {
            to_email_address: email,
            template_slug: UTILS.GIF_RESULTS_MANDRILL_SLUG,
            template_args: {
                lift: best.neon_score,
                top_gif: bestUrl,
                collection_url: collectionUrl,
            },
        };
        TRACKING.sendEvent(self, arguments, tagId);
        SendActions.sendEmail(data, callback);
    },

    setTooltipText(tooltipText) {
        this.setState({tooltipText});
    },

    // Takes a string in [
    // learnMore, contact, signUp, account ] or null
    setSidebarContent(sidebarContent) {
        const self = this;
        self.setState({sidebarContent});
    },

    getShownIds() {
        // The size and offset into the list.
        const pageSize = UTILS.RESULTS_PAGE_SIZE;
        const offset = pageSize * this.state.currentPage;

        // Get the ordered array of selectable tag ids
        // and slice it to size.
        return _(this.state.selectedTags)
            .orderBy(['created'], ['desc'])
            .slice(offset, pageSize + offset)
            .map(t => {return t.tag_id;})
            .value();
    },

    // Get the name of a tag, else the title of
    // the tag's video, else the empty string.
    getTagName(tag) {
        if (tag.name == null) {
            return '';
        }
        if (tag.name) {
            return tag.name;
        }
        if(tag.tag_type = UTILS.TAG_TYPE_VIDEO_COL) {
            return this.state.videos[tag.video_id].title;
        }
        return '';
    },

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
        return -1 !== name.search(query.toLowerCase());
    },

    getTitle() {
        return UTILS.buildPageTitle(T.get('copy.myCollections.title'));
    },

    getPagingEnableNext() {
        const itemCount = (1 + this.state.currentPage) * UTILS.RESULTS_PAGE_SIZE;
        return Search.hasMoreThan(itemCount);
    },

    onSearchBarChange(e) {
        const self = this;

        // Use the query to filter display of results.
        const searchQuery = e.target.value.trim();

        // Update the stateful filteredtagstore.
        filteredTagStore.isCompletelyLoaded = false;
        if (!searchQuery) {
            filteredTagStore.reset();
        } else {
            // Apply a non-empty search to our data provider.
            filteredTagStore.setFilter(
                tag => (
                    // TODO factor this and the default filter.
                    tag.hidden !== true &&
                        (tag.thumbnail_ids.length > 0  || tag.tag_type !== UTILS.TAG_TYPE_IMAGE_COL) &&
                        self.filterOnName(searchQuery, tag)
                )
            );
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
                searchPending: Search.pending > 0,
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
                {leading: true, trailing: true}
            );
        }

        // Resolve state change then search.
        self.setState({
            searchQuery,
            currentPage: 0,
            selectedTags: filteredTagStore.getAll(),
        }, self.searchFunction);

    },

    onSearchBarSubmit(e) {
        // This is now just a functional stub.
        e.preventDefault();
    },

    loadAccount() {
        LoadActions.loadAccount(SESSION.state.accountId);
    },

    getResults() {
        this.loadAccount()
        return (
            <div>
                <CollectionsContainer
                    isMine={true}
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
                    socialClickHandler={this.socialClickHandler}
                    setSidebarContent={this.setSidebarContent}
                    sendResultsEmail={this.sendResultsEmail}
                    sendGifResultsEmail={this.sendGifResultsEmail}
                    setTooltipText={this.setTooltipText}
                    enableThumbnail={this.enableThumbnail}
                    disableThumbnail={this.disableThumbnail}
                    ownerAccountId={SESSION.state.accountId}
                />
                <PagingControls
                    currentPage={this.state.currentPage}
                    changeCurrentPage={this.changeCurrentPage}
                    enableNext={this.getPagingEnableNext()}
                    searchPending={this.state.searchPending}
                />
           </div>
        );
    },

    getLoading() {
        return (
            <div className="xxOverlay" >
                <div className="xxVideoloadingSpinner">{T.get('copy.loading')}</div>
            </div>
        );
    },

    isLoading() {
        return _.isEmpty(this.state.tags) && Search.pending > 0
    },

    render() {
        const body = this.isLoading() ?
            this.getLoading() :
            this.getResults();

        return (
            <BasePage
                {...this.props}
                ref="basepage"
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
});

export default CollectionsMainPage;
