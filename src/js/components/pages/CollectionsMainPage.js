'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import _ from 'lodash';

import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import TRACKING from '../../modules/tracking';
import RENDITIONS from '../../modules/renditions';
import { windowOpen, objectToGetParams } from '../../modules/sharing';

import BasePage from '../wonderland/pages/BasePage';
import Helmet from 'react-helmet';
import SiteHeader from '../wonderland/SiteHeader';
import CollectionsContainer from '../knave/CollectionsContainer';
import PagingControl from '../core/_PagingControl';
import SiteFooter from '../wonderland/SiteFooter';
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

import T from '../../modules/translation';

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
        Search.load((1 + currentPage) * UTILS.RESULTS_PAGE_SIZE);
    },

    // TODO define type here, with a generic id for images
    // or possibly just always pass tag_id
    deleteCollection: function(videoId) {
        const self = this;
        let params = {
            video_id: videoId,
            hidden: true
        };
        let promise = self.PUT('videos', {data: params});
        promise.then(function(res) {
            let videos = self.state.videos;
            let tags = self.state.tags;
            let tagId = videos[videoId].tag_id;

            delete videos[videoId];
            delete tags[tagId];
            self.setState({
                videos: videos,
                tags: tags
            });
        }).catch(function(err) {
            console.log(err);
        });
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

    getShownIds: function() {

        // The size and offset into the list.
        const pageSize = UTILS.RESULTS_PAGE_SIZE;
        const offset = pageSize * (this.state.currentPage);

        // Get the ordered array of all tag ids
        // and slice it to size.
        return _(this.state.tags)
            .orderBy(['created'], ['desc'])
            .slice(offset, pageSize + offset)
            .map(t => {return t.tag_id;})
            .value();
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
                    loadTagForDemographic={LoadActions.loadTagForDemographic}
                    loadFeaturesForTag={LoadActions.loadFeaturesForTag}
                    loadThumbnails={LoadActions.loadThumbnails}
                    deleteCollection={this.deleteCollection}
                    socialClickHandler={this.socialClickHandler}
                    getShareUrl={this.getShareUrl}
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
            >
            {this.getBody() || this.getLoading()};
            </BasePage>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
