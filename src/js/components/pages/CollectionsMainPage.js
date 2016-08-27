import React, { PropTypes } from 'react';

import _ from 'lodash';

import RENDITIONS from '../../modules/renditions';
import SESSION from '../../modules/session';
import TRACKING from '../../modules/tracking';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import { windowOpen, objectToGetParams } from '../../modules/sharing';

import BasePage from './BasePage';
import SearchForm from '../core/SearchForm';
import CollectionsContainer from '../knave/CollectionsContainer';
import PagingControl from '../core/_PagingControl';
import UploadForm from '../knave/UploadForm';

import {
    TagStore,
    FilteredTagStore,
    VideoStore,
    ThumbnailStore,
    LiftStore,
    FeatureStore,
    ThumbnailFeatureStore,
    TagShareStore,
    LoadActions,
    ServingStatusActions,
    Dispatcher,
    Search } from '../../stores/CollectionStores';

const getStateFromStores = () => {

    return {
        // These are stores of tag, video, thumbnail resources.
        //
        // Map of tag id to tag.
        tags: TagStore.getAll(),
        // A submap of tags, of those results that are showable
        selectedTags: FilteredTagStore.getAll(),

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
        thumbnailFeatures: ThumbnailFeatureStore.getAll(),

        // Map of tag id to {token: <share token>, url: <share url>}
        tagShares: TagShareStore.getAll()
    };
};

const CollectionsMainPage = React.createClass({

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState: function() {
        return Object.assign(
            getStateFromStores(),
            {
                currentPage: 0,
                searchQuery: '',
                tooltipText: undefined
            }
        );
    },

    componentWillMount: function() {
        if (!SESSION.active()) {
            return this.context.router.push(UTILS.DRY_NAV.SIGNIN.URL);
        }

        // Register our update function with the store dispatcher.
        Dispatcher.register(this.updateState);

        // Load initial results: first 2 items, then more.
        const callback = Search.load.bind(null, UTILS.RESULTS_PAGE_SIZE);
        Search.load(2, true, callback);
    },

    updateState: function() {
        this.setState(getStateFromStores());
    },

    changeCurrentPage(change) {
        const self = this;
        const currentPage = self.state.currentPage + change
        self.setState({currentPage}, this.loadMoreFromSearch);

    },

    // Ask the search provider to get more results.
    //
    // If useCurrentPage, only load if the page is near the end of the pages.
    //
    // If not, load more based on how many are in store.
    loadMoreFromSearch(useCurrentPage=true) {
        const self = this;
        const count = useCurrentPage ?
            self.state.currentPage * UTILS.RESULTS_PAGE_SIZE :
            TagStore.count();

        if(self.state.searchQuery) {
            Search.loadWithQuery(count, self.state.searchQuery);
        } else {
            Search.load(count);
        }
    },

    socialClickHandler: function(service, shareUrl) {
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

    _sendShare: function(baseUrl, shareUrl, title, quote, service) {
        var url = baseUrl + objectToGetParams({
                u: shareUrl,
                title: title,
                quote: quote
            })
        ;
        windowOpen(url);
        TRACKING.sendEvent(this, arguments, service);
    },

    enableThumbnail: function(thumbnail) {
        ServingStatusActions.toggleThumbnailEnabled(thumbnail);
    },

    disableThumbnail: function(thumbnail) {
        ServingStatusActions.toggleThumbnailEnabled(thumbnail);
    },

    sendResultsEmail: function(gender, age, tagId, fourThumbnails, email, callback) {
        const self = this;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
           callback({
               'status_code' : 400,
               'errorMessage' : T.get('error.invalidEmail')
           });
           return;
        }

        const best = fourThumbnails[0];
        const first = fourThumbnails[1];
        const second = fourThumbnails[2];
        const third = fourThumbnails[3];

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
                subject: UTILS.RESULTS_EMAIL_SUBJECT,
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
        }
        else if (tag.tag_type === UTILS.TAG_TYPE_IMAGE_COL) {
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
                subject: UTILS.RESULTS_EMAIL_SUBJECT,
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
        }
        else {
            callback({
                'status_code' : 400,
                'errorMessage' : 'unknown tag type unable to send email'
            });
            return;
        }
        self.POST('email', {data})
        .then(function(res) {
            TRACKING.sendEvent(self, arguments, tagId);
            callback({'status_code' : 200});
        })
        .catch(function(err) {
            callback({
                'status_code' : 400,
                'errorMessage' : 'unknown error sending email'
            });
        });
    },

    setTooltipText: function(tooltipText) {
        this.setState({tooltipText});
    },

    // Takes a string in [
    // learnMore, contact, signUp, account ] or null
    setSidebarContent: function(sidebarContent) {
        const self = this;
        self.setState({sidebarContent});
    },

    getShownIds: function() {
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
        if (tag.name) {
            return tag.name;
        }
        if(tag.tag_type = UTILS.TAG_TYPE_VIDEO_COL) {
            return this.state.videos[tag.video_id].title;
        }
        return '';
    },

    // Given a tag, return true if its name or its video title
    // contains search query.
    filterOnName: function(query, tag) {
        if (!query) {
            return true;
        }
        const name = this.getTagName(tag).toLowerCase();
        if (!name) {
            return false;
        }
        return -1 !== name.search(query.toLowerCase());
    },

    getTitle: function() {
        return UTILS.buildPageTitle(T.get('copy.myCollections.title'));
    },

    getPagingEnableNext: function() {
        const itemCount = (1 + this.state.currentPage) * UTILS.RESULTS_PAGE_SIZE;
        return Search.hasMoreThan(itemCount);
    },

    onSearchFormChange: function(e) {
        const self = this;

        // Use the query to filter display of results.
        const searchQuery = e.target.value.trim();
        if (!searchQuery) {
            FilteredTagStore.resetFilter();
        } else {
            // Apply a non-empty search to our data provider.
            FilteredTagStore.setFilter(
                tag => {
                    return tag.hidden !== true &&
                           self.filterOnName(searchQuery, tag)
                }
            );
        }

        // If query is nothing, then don't use backend.
        if (!searchQuery) {
            // If query is running, cancel.
            if (self.searchFunction) {
                self.searchFunction.cancel();
                self.searchFunction = null;
            }
            self.setState({
                searchQuery,
                currentPage: 0,
                selectedTags: FilteredTagStore.getAll(),
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
                200,
                // Invoke immediately.
                {leading: true, trailing: false}
            );
        }

        // Resolve state change then search.
        self.setState({
            searchQuery,
            currentPage: 0,
            selectedTags: FilteredTagStore.getAll(),
        }, self.searchFunction);

    },

    onSearchFormSubmit: function(e) {
        // This is now just a functional stub.
        e.preventDefault();
    },

    getResults: function() {
        return (
            <div>
                <CollectionsContainer
                    shownIds={this.getShownIds()}
                    stores={{
                        tags: this.state.tags,
                        videos: this.state.videos,
                        thumbnails: this.state.thumbnails,
                        lifts: this.state.lifts,
                        thumbnailFeatures: this.state.thumbnailFeatures,
                        features: this.state.features,
                        tagShares: this.state.tagShares
                    }}
                    loadTagForDemographic={LoadActions.loadTagForDemographic}
                    loadFeaturesForTag={LoadActions.loadFeaturesForTag}
                    loadThumbnails={LoadActions.loadThumbnails}
                    socialClickHandler={this.socialClickHandler}
                    setSidebarContent={this.setSidebarContent}
                    sendResultsEmail={this.sendResultsEmail}
                    setTooltipText={this.setTooltipText}
                    enableThumbnail={this.enableThumbnail}
                    disableThumbnail={this.disableThumbnail}
                />
                <PagingControl
                    currentPage={this.state.currentPage}
                    changeCurrentPage={this.changeCurrentPage}
                    enableNext={this.getPagingEnableNext()}
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

    render: function() {
        let body = this.getLoading();
        if (FilteredTagStore.count() > 0 || Search.pending <= 0) {
            body = this.getResults();
        }

        const isQuerySearchLoading = Search.pending > 0 && !!this.state.searchQuery;

        return (
            <BasePage
                {...this.props}
                ref="basepage"
                title={T.get('copy.myCollections.title')}
                setSidebarContent={this.setSidebarContent}
                sidebarContent={this.state.sidebarContent}
                tooltipText={this.state.tooltipText}
                query={this.state.searchQuery}
                onSearchFormChange={this.onSearchFormChange}
                onSearchFormSubmit={this.onSearchFormSubmit}
                isLoading={isQuerySearchLoading}
            >
                {body}
                <UploadForm />
            </BasePage>
        );
    }
});

export default CollectionsMainPage;
