// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
import CollectionsFactory from '../lookingglass/CollectionsFactory'; 

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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var LookingGlassPage = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return Object.assign(
            Store.getState(),
            {
                currentPage: 0,
                searchQuery: '',
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
        Search.load(12, true, callback.bind(this));
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

    loadAccount() {
        LoadActions.loadAccount(SESSION.state.accountId);
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

    getResults() {
        this.loadAccount()
        return (
            <CollectionsFactory 
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
            />
        );
    },

    getLoading() {
        return (
            <p>loading</p>
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
            <main>
                {body}
            </main>
        )

    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default LookingGlassPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
