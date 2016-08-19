// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import _ from 'lodash';

import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';

import SiteHeader from '../wonderland/SiteHeader';
import CollectionsContainer from '../knave/CollectionsContainer';
import SiteFooter from '../wonderland/SiteFooter';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CollectionsMainPage = React.createClass({

    mixins: [AjaxMixin],

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState: function() {


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

            // TODO? look at faster async workflow
            // (specifically, letting lift be deferred since
            // it isn't used for main render.)
            const thumbPromise = this.loadThumbnails(thumbIds);
            const liftPromise = this.loadLifts();
            return Promise.all([thumbPromise, liftPromise]);

        })
        .then(combined => {

            const thumbRes = combined[0] || [];
            const liftRes = combined[1] || {};

            // Merge loaded thumbnails to state.thumbnails.
            thumbRes.thumbnails.map(t => {
                // 0, 0 is null-gender and null-age for demo.
                state.thumbnails[0][0][t.thumbnail_id] = t;
            });
            _.toPairs(liftRes).map(pair => {
                const tagId = pair[0];
                const liftMap = pair[1];
                state.lifts[0][0][tagId] = liftMap;
            });
            self.setState(state);
        });
    },

    // Load thumbnails by ids
    // @TODO extract to source module
    loadThumbnails: function(thumbnailIds, gender=0, age=0) {

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
            return self.sendBatch();
        } else {
            params = {};
            Object.assign(params, baseParams, {thumbnail_id: thumbArgs[0]});
            return self.GET('thumbnails', {data: params});
        }
    },

    // Load or reload from data source the array of thumbnails
    // with synchronous call to setState.
    loadThumbnailsSync: function(thumbnailIds, gender=0, age=0) {
        const self = this;

        this.loadThumbnails(thumbnailIds, gender, age)
        .then(thumbsRes => {
            const thumbnails = this.state.thumbnails;
            // Merge new thumbnails to stored thumbnails.
            thumbsRes.map(t => {
                thumbnails[t.thumbnail_id] =  t;
            });
            self.setState({thumbnails});
        });
    },

    // Load lifts for thumbnails from data source.
    loadLifts: function(tagIds, gender=0, age=0) {

    },

    loadLiftsSync: function(tagIds, gender=0, age=0) {
        const self = this;
        this.loadLifts(tagIds, gender, age)
        .then(liftRes => {
            const lifts = this.state.lift;
            // Merge new lifts to stored lifts.
            _toPairs.liftRes.map(pairs => {
                const tagId = pairs[0];
                const liftMap = pairs[1];
            });
            self.setState({lifts});
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
                    loadThumbnails={this.loadThumbnails}
                />
                <SiteFooter />
            </main>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsMainPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
