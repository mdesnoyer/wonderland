'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import _ from 'lodash';

import AjaxMixin from '../../mixins/Ajax';
import RENDITIONS from '../../modules/renditions';
import SESSION from '../../modules/session';
import TRACKING from '../../modules/tracking';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import { windowOpen, objectToGetParams } from '../../modules/sharing';

import BasePage from './BasePage';
import CollectionsContainer from '../knave/CollectionsContainer';
import PagingControl from '../core/_PagingControl';
import UploadForm from '../knave/UploadForm';

import {
    TagStore,
    VideoStore,
    ThumbnailStore,
    LiftStore,
    FeatureStore,
    ThumbnailFeatureStore,
    LoadActions,
    Dispatcher,
    Search } from '../../stores/CollectionStores.js';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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

const CollectionsMainPage = React.createClass({

    mixins: [AjaxMixin],

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState: function() {
        return Object.assign(
            getStateFromStores(),
            {currentPage: 0}
        );
    },

    componentWillMount: function() {
        if (!SESSION.active()) {
            return this.context.router.push(UTILS.DRY_NAV.SIGNIN.URL);
        }

        // Register our update function with the store dispatcher.
        Dispatcher.register(this.updateState);
        Search.load(UTILS.RESULTS_PAGE_SIZE);
    },

    updateState: function() {
        this.setState(getStateFromStores());
    },

    changeCurrentPage(change) {
        const self = this;
        const currentPage = self.state.currentPage + change
        self.setState({currentPage});
        // Queue another page to load.
        // Use 2 here: 1 for the 0-indexing of page, 1 for queuing next.
        Search.load((2 + currentPage) * UTILS.RESULTS_PAGE_SIZE);
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
        // TODO this is throwing a TypeError
        TRACKING.sendEvent(this, arguments, service);
    },

    // TODO remove callback, and just return the
    // promise, let the child comp handle the promise
    getShareUrl: function(id, type, callback) {
        const self = this;
        var apiUrl = null,
            uiUrl = null,
            options = {}
        ;
        // TODO type = images
        if (type == 'video') {
            options = {
                data: {
                    video_id: id
                }
            };
            apiUrl = 'videos/share'
            uiUrl = '/share/video/'
        }
        let promise = self.GET(apiUrl, options)
        promise.then(function(res) {
            var longUrl = window.location.origin +
                 uiUrl + id + '/account/' +
                 SESSION.state.accountId + '/token/' +
                 res.share_token + '/';
            UTILS.shortenUrl(longUrl, callback)
        }).catch(function(err) {
            console.log(err);
        });
    },

    sendResultsEmail: function(id, type, email, shareUrl, callback) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
           callback({
               'status_code' : 400,
               'errorMessage' : T.get('error.invalidEmail')
           });
           return;
        }
        // TODO type = images
        if (type == 'video') {
            // TODO selected demographic could be taken into account here
            // for now just default to top level thumbnails
            let ts = this.state.videos[id].demographic_thumbnails[0].thumbnails;
            ts = UTILS.fixThumbnails(ts, true);
            var options = {
                data: {
                    subject: UTILS.RESULTS_EMAIL_SUBJECT,
                    to_email_address: email,
                    template_slug: UTILS.RESULTS_MANDRILL_SLUG,
                    template_args: {
                        'top_thumbnail': RENDITIONS.findRendition(ts[0], 425, 240),
                        'lift': UTILS.makePercentage(ts[0].lift, 0, true),
                        'thumbnail_one': RENDITIONS.findRendition(ts[1], 140, 79),
                        'thumbnail_two': RENDITIONS.findRendition(ts[2], 140, 79),
                        'thumbnail_three': RENDITIONS.findRendition(ts[3], 140, 79),
                        'collection_url': shareUrl
                    }
                }
            };
            let promise = this.POST('email', options);
            promise.then(function(res) {
                TRACKING.sendEvent(this, arguments, id);
                callback({'status_code' : 200});
            }).catch(function(err) {
                callback({
                    'status_code' : 400,
                    'errorMessage' : 'unknown error sending email'
                });
            });
        }
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
        const offset = pageSize * (this.state.currentPage);

        // Get the ordered array of all tag ids
        // and slice it to size.
        return _(this.state.tags)
            .orderBy(['created'], ['desc'])
            // Filter hidden and empty tags.
            .filter(t => {return t.hidden !== true && t.thumbnail_ids.length > 0})
            .slice(offset, pageSize + offset)
            .map(t => {return t.tag_id;})
            .value();
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

    getTitle: function() {
        return UTILS.buildPageTitle(T.get('copy.myCollections.title'));
    },

    getPagingEnableNext: function() {
        const itemCount = (1 + this.state.currentPage) * UTILS.RESULTS_PAGE_SIZE;
        return Search.hasMoreThan(itemCount);
    },

    getBody: function() {
        if (!TagStore.countShowable()) {
            return;
        }
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
                        features: this.state.features
                    }}
                    getVideoStatus={this.getVideoStatus}
                    loadTagForDemographic={LoadActions.loadTagForDemographic}
                    loadFeaturesForTag={LoadActions.loadFeaturesForTag}
                    loadThumbnails={LoadActions.loadThumbnails}
                    socialClickHandler={this.socialClickHandler}
                    getShareUrl={this.getShareUrl}
                    setSidebarContent={this.setSidebarContent}
                    sendResultsEmail={this.sendResultsEmail}
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
        return (
            <BasePage
                title={T.get('copy.myCollections.title')}
                setSidebarContent={this.setSidebarContent}
                sidebarContent={this.state.sidebarContent}
            >
                {this.getBody() || this.getLoading()}
                <UploadForm />
            </BasePage>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
