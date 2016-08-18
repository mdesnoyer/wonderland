// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';

import ImageCollection from './ImageCollection';
import VideoCollection from './VideoCollection';
import TitleFilterLiftPanel from './TitleFilterLiftPanel';
import InfoActionContainer from './InfoActionContainer';
import {
    InfoDemoLiftPanel,
    InfoLiftPanel,
    FilterPanel,
    EmailPanel,
    EmailControl,
    SharePanel,
    ShareControl,
    DeletePanel,
    DeleteControl,
    SavePanel,
    SaveControl} from './InfoActionPanels';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const CollectionsContainer = React.createClass({

    mixins: [AjaxMixin],

    componentWillMount() {
        this.search();
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
        };
    },

    // Return array of gender,age enum array based
    // on state of collection.
    getDemoOptionArray: function(tagId) {

        const tag = this.state.tags[tagId];
        switch(tag.tag_type) {
        case UTILS.TAG_TYPE_IMAGE_COL:
            // All factor posibilities are available.
            // TODO? do statically as class behavior.
            return UTILS.productOfArrays(
                _.values(UTILS.FILTER_GENDER_COL_ENUM),
                _.values(UTILS.FILTER_AGE_COL_ENUM)
            );
        case UTILS.TAG_TYPE_VIDEO_COL:
            const video = this.state.videos[tag.video_id];
            return video.demographic_thumbnails.map(demo => {
                return [
                    UTILS.FILTER_GENDER_COL_ENUM[demo.gender],
                    UTILS.FILTER_AGE_COL_ENUM[demo.age]
                ];
            });
        }
        return [[0,0]];
    },

    // Given a tag id, construct a  valid Collection
    // component instance and return it.
    //
    // Else return an error component.
    buildCollectionComponent: function(tagId) {

        const collection = this.state.tags[tagId];

        // If a demographic was selected, use it. Else nulls.
        let gender,
            age;
        if (this.state.selectedDemographic[tagId]) {
            [gender, age] = this.state.selectedDemographic[tagId];
        } else {
            [gender, age] = [0, 0];
        }


        const onDemoChange = (tagId, demoKey) => {

            // TODO validate demokey shape.
            this.state.selectedDemographic[tagId] = demoKey;

            // Ask what tag's thumbnails for the demo are stored.
            const missingThumbIds = [];
            const [gender, age] = demoKey;

            this.state.tags[tagId].thumbnail_ids.map(tid => {
                if (undefined === this.state.thumbnails[gender][age][tid]) {
                    missingThumbIds.push(tid);
                }
            });

            const stateDiff = {
                selectedDemographic: this.state.selectedDemographic
            };
            if (missingThumbIds.length > 0) {
                // Load thumbnails for image-type collection.
                return this.loadThumbnails(missingThumbIds, gender, age, stateDiff);
            }
            // Else, just change the selected demographic for the tag.
            this.setState(stateDiff);
        };

        switch(collection.tag_type) {
            case UTILS.TAG_TYPE_IMAGE_COL:
                return this.buildImageCollectionComponent(tagId, collection, onDemoChange, gender, age);
            case UTILS.TAG_TYPE_VIDEO_COL:
                return this.buildVideoCollectionComponent(tagId, collection, onDemoChange, gender, age);
        }
        // TODO? try-catch: if components fail prop validation, catch
        // and return an error component.
        return <div />;
    },

    buildImageCollectionComponent: function(tagId, collection, onDemoChange, gender, age) {

        const allThumbnailMap = _.pick(
            this.state.thumbnails[gender][age],
            collection.thumbnail_ids)
        const right = UTILS.bestThumbnail(_.values(allThumbnailMap));
        const left = UTILS.worstThumbnail(_.values(allThumbnailMap));

        // Build the list of thumbnails to display below.
        const smallThumbnails = _
            .chain(allThumbnailMap)
            // Remove the feature thumbnails from the small list.
            .omit([right.thumbnail_id, left.thumbnail_id])
            .values()
            // Order by score, best to worst, then created time for stability.
            .orderBy(['neon_score', 'created'], ['desc', 'asc'])
            .value();

        // List of right-hand side control components for
        // the content given type and session.
        const panels = [
            <InfoDemoLiftPanel
                tagId={collection.tag_id}
                title={collection.name}
                onDemographicChange={onDemoChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={[gender, age]}
            />,
            <EmailPanel />,
            <SharePanel />,
            <DeletePanel />,
        ];
        // TODO factor to ensure panels and controls are consistent.
        const controls = [
            <ShareControl handleClick={()=>{}} />,
            <EmailControl handleClick={()=>{}} />,
            <DeleteControl handleClick={()=>{}} />,
        ];

        return (
            <ImageCollection
                key={collection.tag_id}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                smallThumbnails={smallThumbnails}
                infoActionPanels={panels}
                infoActionControls={controls}
            />
        );
    },

    // @TODO factor common code
    buildVideoCollectionComponent(tagId, collection, onDemoChange, gender, age) {

        const video = this.state.videos[collection.video_id];
        let genderLabel = _.invert(UTILS.FILTER_GENDER_COL_ENUM)[gender];
        if(genderLabel == 'null') {
            genderLabel = null;
        }
        let ageLabel = _.invert(UTILS.FILTER_AGE_COL_ENUM)[age];
        if(ageLabel == 'null') {
            ageLabel = null;
        }
        const videoDemo = _.find(
            video.demographic_thumbnails,
            t => {
                return (t.gender == genderLabel && t.age == ageLabel);
            }
        );

        const allThumbnailMap = _.pick(
            this.state.thumbnails[gender][age],
            videoDemo.thumbnails.map(t => {
                return t.thumbnail_id;
            }));

        // For the right, use the best scoring.
        const right = UTILS.bestThumbnail(_.values(allThumbnailMap));
        // For the left, find a default thumbnail or use the worst.
        const _default = _.find(_.values(allThumbnailMap), t => {
            return UTILS.THUMB_TYPE_DEFAULT === t.type;
        });
        const left = _default? _default: UTILS.worstThumbnail(_.values(allThumbnailMap));

        const smallThumbnails = _
            .chain(allThumbnailMap)
            // Remove the feature thumbnails from the small list.
            .omit([right.thumbnail_id, left.thumbnail_id])
            .values()
            // Order by score, best to worst, then frame number for stability.
            .orderBy(['neon_score', 'frameno'], ['desc', 'asc'])
            .value();

        // Do the same for the bad thumbnail list.
        const allBadThumbnailMap = _.pick(
            this.state.thumbnails[gender][age],
            videoDemo.bad_thumbnails.map(t => {
                return t.thumbnail_id;
            })
        );
        const smallBadThumbnails = _
            .chain(allBadThumbnailMap)
            .values()
            .orderBy(['neon_score', 'frameno'], ['desc', 'asc'])
            .value();

        const panels = [
            <InfoDemoLiftPanel
                tagId={collection.tag_id}
                title={video.title}
                onDemographicChange={onDemoChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={[gender, age]}
            />,
            <FilterPanel />,
            <SharePanel />,
            <EmailPanel />,
            <DeletePanel />,
        ];
        // TODO factor to ensure panels and controls are consistent.
        const controls = [
            <ShareControl handleClick={()=>{}} />,
            <EmailControl handleClick={()=>{}} />,
            <DeleteControl handleClick={()=>{}} />,
        ];


        return (
            <VideoCollection
                key={collection.tag_id}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                smallThumbnails={smallThumbnails}
                smallBadThumbnails={smallBadThumbnails}
                infoActionPanels={panels}
                infoActionControls={controls}
            />
       );
    },

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
            videosRes = combined[1] || [];

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


    render: function() {
        const collections = _.keys(this.state.tags).map(tagId => {
            return this.buildCollectionComponent(tagId);
        });
        return (<ul>{collections}</ul>);
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
