// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import _ from 'lodash';

import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';
import TRACKING from '../../modules/tracking';
import RENDITIONS from '../../modules/renditions';
import { windowOpen, objectToGetParams } from '../../modules/sharing';
import SiteHeader from '../wonderland/SiteHeader';
import CollectionsContainer from '../knave/CollectionsContainer';
import SiteFooter from '../wonderland/SiteFooter';

import T from '../../modules/translation';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CollectionsMainPage = React.createClass({

    mixins: [AjaxMixin],

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState: function() {

        return {

            // These are stores of tag, video, thumbnail resources.
            //
            // Map of tag id to tag.
            // @TODO factor to store.
            tags: {},

            // Map of video id to video.
            videos: {},

            // Map of gender, age, thumbnail id to thumbnail.
            thumbnails: genderAgeBaseMap(),

            // Map of gender, age, tag id to map of thumb id to lift float
            //
            // Note: This assumes the tag has only one base thumbnail
            // for comparisons: for a video with a default thumbnail,
            // it is the default thumbnail. In all other cases, it's
            // the worst thumbnail.
            lifts: genderAgeBaseMap(),

            // State of search paging: current page, page count,
            // next, prev page url.
            search: {
                currPage: null,
                pageCount: null,
                next: null,
                prev: null
            }
        };

    },

    componentWillMount: function() {
        if (!SESSION.active()) {
            return this.context.router.push(UTILS.DRY_NAV.SIGNIN.URL)
        }
        this.search();
    },

    // TODO extract to search module
    search: function() {
        const self = this,
            options = {
                data: {
                    limit: UTILS.RESULTS_PAGE_SIZE,
                }
            };

        const state = self.getInitialState();
        const pageQueryParam = '?limit=' + this.props.numberToDisplay;

        // On search loads, we assume default demographics:
        const gender = 0;
        const age = 0;

        // Search for tag ids, get tags and videos, then get thumbnails for those.
        self.GET('tags/search', options)
        .then(searchRes => {

            // Search for all the tags.
            const tagData = {
                tag_id: _.uniq(searchRes.items.reduce((tagIds, tag) => {
                    tagIds.push(tag.tag_id);
                    return tagIds;
                }, [])).join(',')
            };
            const tagsPromise = self.GET('tags', {data: tagData});

            // Additionally search on videos in the result.
            const _videoData = {
                video_id: _.uniq(searchRes.items.reduce((video_ids, tag) => {
                    if(tag.video_id) {
                        video_ids.push(tag.video_id);
                    }
                    return video_ids;
                }, [])).join(','),

                fields: UTILS.VIDEO_FIELDS.join(',')
            };
            const videosPromise = _videoData.video_id?
                self.GET('videos', {data: _videoData}):
                null;

            return Promise.all([tagsPromise, videosPromise]);
        })
        .then(combined => {

            // Unpack promises.
            let tagsRes,
                videosRes;
            tagsRes = combined[0] || {};
            videosRes = combined[1] || {videos: []};

            // Store the map of collections, videos.
            state.tags = tagsRes;
            videosRes.videos.map(video => {
                state.videos[video.video_id] = video;
            });;

            // Store the demographic thumbnails.
            _.values(state.videos).map(video => {
                video.demographic_thumbnails.map(dem => {
                    let gender = UTILS.FILTER_GENDER_COL_ENUM[dem.gender];
                    let age = UTILS.FILTER_AGE_COL_ENUM[dem.age];
                    if (age === undefined || gender === undefined) {
                        console.warn('Unknown demo ', dem.age, dem.gender);
                        return;
                    }
                    // Set each of the thumbnails and bad thumbnails to store.
                    dem.thumbnails.map(t => {
                        state.thumbnails[gender][age][t.thumbnail_id] = t;
                    });
                    dem.bad_thumbnails.map(t => {
                        state.thumbnails[gender][age][t.thumbnail_id] = t;
                    });
                });
            });

            // Get and concatenate all thumbnail ids.
            const tags = _.values(tagsRes);
            const thumbIds = _.uniq(tags.reduce((array, tag) => {
                // Video thumbnails are already stored.
                if(tag.tag_type !== UTILS.TAG_TYPE_VIDEO_COL) {
                    array = array.concat(tag.thumbnail_ids);
                }
                return array;
            }, []));

            // TODO? look at faster async workflow
            // (specifically, letting lift be deferred since
            // it isn't used for main render.)
            return self.loadThumbnails(thumbIds, gender, age);

        })
        .then(thumbRes => {
            thumbRes.thumbnails.map(t => {
                state.thumbnails[gender][age][t.thumbnail_id] = t;
            });

             return self.loadLifts(_.keys(state.tags), gender, age, state);
        })
        .then(liftRes => {
            _.toPairs(liftRes).map(pair => {
                const tagId = pair[0];
                const liftMap = pair[1];
                state.lifts[gender][age][tagId] = liftMap;
            });
            self.setState(state);
        });
    },

    // Load thumbnails by ids
    // @TODO extract to source module
    loadThumbnails: function(thumbnailIds, gender=0, age=0) {

        const self = this;

        // Empty array of ids is no-op.
        if(thumbnailIds.length == 0) {
            return Promise.resolve({thumbnails: []});
        }

        // Create array of CSVs of max length.
        const thumbArgs = UTILS.csvFromArray(thumbnailIds);
        const baseParams = self.getBaseParamsForDemoRequest(gender, age);

        let promise,
            params;
        // Batch only large requests since batch is slower.
        if (thumbArgs.length > 1) {
            thumbArgs.map(arg => {
                // Build this batch's params by copying base params and adding the tid arg.
                params = {};
                Object.assign(params, baseParams, {thumbnail_id: arg});
                self.batch('GET', 'thumbnails', params);
            });
            return self.sendBatch();
        } else {
            params = {};
            Object.assign(params, baseParams, {thumbnail_id: thumbArgs[0]});
            return self.GET('thumbnails', {data: params});
        }
    },

    // Load data for given demographic if new.
    // (Written for child callback.)
    loadTagForDemographic: function(tagId, gender, age, callback) {

        const self = this;

        // Ask what tag's thumbnails for the demo are stored.
        const missingThumbIds = [];
        const tag = self.state.tags[tagId];
        if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
            // These are already loaded!
        } else {
            tag.thumbnail_ids.map(tid => {
                if (undefined === self.state.thumbnails[gender][age][tid]) {
                    missingThumbIds.push(tid);
                }
            });
        }

        const baseThumbnails = self.state.thumbnails;
        self.loadThumbnails(missingThumbIds, gender, age)
        .then(thumbRes => {
            thumbRes.thumbnails.map(t => {
                baseThumbnails[gender][age][t.thumbnail_id] = t;
            });

            return self.loadLifts([tagId], gender, age);
        })
        .then(liftRes => {
            const baseLifts = self.state.lifts;
            _.toPairs(liftRes).map(pair => {
                const tagId = pair[0];
                const liftMap = pair[1];
                baseLifts[gender][age][tagId] = liftMap;
            })
            self.setState({
                thumbnails: baseThumbnails,
                lifts: baseLifts
            });
            callback();
        })
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
    // Given the enum of gender, age, return new Object
    // with their two api request key and value.
    getBaseParamsForDemoRequest: function(gender, age) {

        const baseParams = {};
        // If demo parameters are valued and not "null", then include them.
        if (gender !== 0) {
            baseParams.gender = _.invert(UTILS.FILTER_GENDER_COL_ENUM)[gender];
        }
        if (age !== 0) {
            baseParams.age = _.invert(UTILS.FILTER_AGE_COL_ENUM)[age];
        }
        return baseParams;
    },

    // Load lifts for thumbnails from data source.
    loadLifts: function(tagIds, gender=0, age=0, state={}) {

        const self = this;

        // Use the parameter state if it's non-empty,
        // (allowing component first load to defer its setState).
        // otherwise use the component state.

        state = _.isEmpty(state)? self.state: state;

        const missingTagIds = tagIds.reduce((missingTagIds, tagId) => {
            if (state.lifts[gender][age][tagId] === undefined) {
                missingTagIds.push(tagId);
            }
            return missingTagIds;
        }, []);
        if (0 == missingTagIds.length) {
            return Promise.resolve([]);
        }
        const baseParams = self.getBaseParamsForDemoRequest(gender, age);

        // Keep a map of the base thumb to the tag for handling the response.
        const baseTagMap = {};

        missingTagIds.map(tagId => {

            // Get the worst thumbnail.
            const tag = state.tags[tagId];
            const thumbnails = _.pick(state.thumbnails[gender][age], tag.thumbnail_ids);
            const worst = UTILS.worstThumbnail(_.values(thumbnails));

            // If the type is video, its default thumbnail
            // is used instead of the worst.
            let _default;
            if(tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
                const video = state.videos[tag.video_id];
                const demo = UTILS.findDemographicThumbnailObject(video.demographic_thumbnails, gender, age);
                _default = UTILS.findDefaultThumbnail(demo);
            }

            const baseThumb = _default? _default: worst;
            const base_id = baseThumb.thumbnail_id;
            baseTagMap[base_id] = tagId;

            // Copy params array and assign the thumbnail ids.
            const vsThumbnailIds = _.keys(_.omit(thumbnails, [base_id]));

            // Batch each MAX_CSV_VALUE_COUNT (100) thumbnail ids.
            const csvArray = UTILS.csvFromArray(vsThumbnailIds);
            csvArray.map(thumbnail_ids => {
                const params = {};
                Object.assign(params, baseParams, {base_id, thumbnail_ids});
                self.batch('GET', 'stats/estimated_lift', params);
            });
        });
        return self.sendBatch({
            // Unpack batch response.
            successHandler: batches => {
                return batches.results.reduce((tagLiftMap, batch) => {
                    const baseId = batch.response.baseline_thumbnail_id;
                    // Use reverse lookup to get the tag id from the base thumb id.
                    const tagId = baseTagMap[baseId];
                    tagLiftMap[tagId] = batch.response.lift.reduce((map, item) => {
                        map[item.thumbnail_id] = item.lift;
                        return map;
                    }, {});
                    return tagLiftMap;
                }, {});
            }
        });
    },

    // TODO add post forms.
    // TODO add helmet.
    render: function() {
        return (
            <main className='xxPage'>
                <SiteHeader />
                <CollectionsContainer
                    numberToShow={UTILS.RESULTS_PAGE_SIZE}
                    stores={{
                        tags: this.state.tags,
                        videos: this.state.videos,
                        thumbnails: this.state.thumbnails,
                        lifts: this.state.lifts
                    }}
                    loadTagForDemographic={this.loadTagForDemographic}
                    loadThumbnails={this.loadThumbnails}
                    deleteCollection={this.deleteCollection}
                    socialClickHandler={this.socialClickHandler}
                    getShareUrl={this.getShareUrl} 
                    sendResultsEmail={this.sendResultsEmail}  
                />
                <SiteFooter />
            </main>
        );
    }
});

// Gives a new, empty demographic map
// @TODO initialize this structure from constants/config.
const genderAgeBaseMap = () => {
    return {
        0: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {}
        },
        1: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {}
        },
        2: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {}
        }
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
