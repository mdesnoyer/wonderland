// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import _ from 'lodash';

import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';

import SiteHeader from '../wonderland/SiteHeader';
import CollectionsContainer from '../knave/CollectionsContainer';
import SiteFooter from '../wonderland/SiteFooter';
import UploadForm from '../knave/UploadForm';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CollectionsMainPage = React.createClass({

    mixins: [AjaxMixin],

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState: function() {

        return {

            // These are stores of tag, thumb and video resources.
            // Map of id to tag.
            // @TODO factor to store.
            tags: {},

            // Map of tag id to integer index of gender, then age.
            // Uses FILTER_GENDER_COL_ENUM, FILTER_AGE_COL_ENUM.
            // By default, the demographic is gender=none, age=none.
            selectedDemographic: {},

            // Map of gender, age, thumbnail id to thumbnail.
            // @TODO consider how to initialize this structure.
            thumbnails: {
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
            },

            // Map of id to video.
            videos: {},

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
                    limit: UTILS.RESULTS_PAGE_SIZE}};

        const state = self.getInitialState();
        const pageQueryParam = '?limit=' + this.props.numberToDisplay;

        // Search for tag ids, get tags and videos, then get thumbnails for those.
        self.GET('tags/search', options)
        .then(searchRes => {

            // Search for all the tags.
            const _tagData = {
                tag_id: searchRes.items.reduce((tag_ids, tag) => {
                    tag_ids.push(tag.tag_id);
                    return tag_ids;
                }, []).join(',')
            };
            const tagsPromise = self.GET('tags', {data: _tagData});

            // Additionally search on videos in the result.
            const _videoData = {
                video_id: searchRes.items.reduce((video_ids, tag) => {
                    if(tag.video_id) {
                        video_ids.push(tag.video_id);
                    }
                    return video_ids;
                }, []).join(','),

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
            const thumbIds = tags.reduce((array, tag) => {
                // Video thumbnails are already stored.
                if(tag.tag_type !== UTILS.TAG_TYPE_VIDEO_COL) {
                    array = array.concat(tag.thumbnail_ids);
                }
                return array;
            }, []);

            return this.loadThumbnails(thumbIds, 0, 0, state);
        })
    },

    loadThumbnails: function(thumbnailIds, gender=0, age=0, state={}) {
        const self = this;

        // Empty array of ids is no op; just set passed-in state.
        if(thumbnailIds.length == 0) {
            return self.setState(state);
        }

        // Create array of CSVs of max length.
        const thumbArgs = UTILS.csvFromArray(thumbnailIds, UTILS.MAX_CSV_VALUE_COUNT);
        const baseParams = {};

        // If demo parameters are valued and not "null", then include them.
        if (gender !== 0) {
            baseParams.gender = _.invert(UTILS.FILTER_GENDER_COL_ENUM)[gender];
        }
        if (age !== 0) {
            baseParams.age = _.invert(UTILS.FILTER_AGE_COL_ENUM)[age];
        }

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
            promise = self.sendBatch();
        } else {
            params = {};
            Object.assign(params, baseParams, {thumbnail_id: thumbArgs[0]});
            promise = self.GET('thumbnails', {data: params});
        }

        promise.then(thumbsRes => {
            // Merge loaded thumbnails to state.thumbnails.
            const thumbnails = state.thumbnails? state.thumbnails: self.state.thumbnails;
            thumbsRes.thumbnails.map(t => {
                thumbnails[gender][age][t.thumbnail_id] = t;
            });

            Object.assign(state, {thumbnails: thumbnails});
            self.setState(state);
        })
    },

    updateThumbnails: function() {
        var self = this;
        this.search();
    },

    getVideoStatus: function(videoId) {
        var self = this;

        self.GET('videos', {data: {video_id: videoId, fields: UTILS.VIDEO_FIELDS}})
            .then(function(res) {
                res.videos[0].state === 'processed' || res.videos[0].state === 'failed' ? self.updateThumbnails() : setTimeout(function() {self.getVideoStatus(videoId);}, 30000);
            })
            .catch(function(err) {
                console.log(err)
            });
    },

    deleteVideo: function(videoId) {
        var self = this;
        self.PUT('videos', {data:{video_id: videoId, hidden: true}})
            .then(function(res) {
                self.updateThumbnails();
            })
            .catch(function(err) {
                console.log(err);
            });
    },

    render: function() {
        return (
            <main className='xxPage'>
                <SiteHeader />
                <CollectionsContainer
                    numberToShow={UTILS.RESULTS_PAGE_SIZE}
                    stores={{
                        tags: this.state.tags,
                        thumbnails: this.state.thumbnails,
                        videos: this.state.videos
                    }}
                    loadThumbnails={this.loadThumbnails}
                    updateThumbnails={this.updateThumbnails}
                    getVideoStatus={this.getVideoStatus}
                    deleteVideo={this.deleteVideo}
                />
                <UploadForm updateThumbnails={this.updateThumbnails}/>
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
