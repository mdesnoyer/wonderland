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

            // State of search paging: current page, page count, next, prev page url.
            search: {
                currPage: null,
                pageCount: null,
                next: null,
                prev: null
            },

            // These are stores of tag, thumb and video resources.
            // Map of id to tag.
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

        const thumbnails = _
            .chain(this.state.thumbnails[gender][age])
            .pick(collection.thumbnail_ids)
            .values()
            .orderBy('neon_score', 'desc')
            .value();
        const best = UTILS.bestThumbnail(thumbnails);
        const worst = UTILS.worstThumbnail(thumbnails);

        // TODO? Remove best and worst from thumbs

        const onDemographicChange = e => {
            // TODO
        };

        // List of right-hand side control components for
        // the content given type and session.
        const panels = [
            <InfoDemoLiftPanel
                title={collection.name}
                onDemographicChange={onDemographicChange}
            />,
            <FilterPanel />,
            <EmailPanel />,
            <SharePanel />,
            <DeletePanel />,
            <SavePanel />
        ];
        // TODO factor to ensure panels and controls are consistent.
        const controls = [
            <EmailControl handleClick={()=>{}} />,
            <ShareControl handleClick={()=>{}} />,
            <DeleteControl handleClick={()=>{}} />,
            <SaveControl handleClick={()=>{}} />
        ];

        switch(collection.tag_type) {
        case UTILS.TAG_TYPE_IMAGE_COL:

            return (
                <ImageCollection
                    key={collection.tag_id}
                    leftFeatureThumbnail={worst}
                    rightFeatureThumbnail={best}
                    smallThumbnails={thumbnails}
                    infoActionPanels={panels}
                    infoActionControls={controls}
                />
            );
        case UTILS.TAG_TYPE_VIDEO_COL:

            const _default = _.find(thumbnails, t => {
                return UTILS.THUMB_TYPE_DEFAULT === t.type;
            });

            return (
                <VideoCollection
                    key={collection.tag_id}
                    leftFeatureThumbnail={_default? _default: worst}
                    rightFeatureThumbnail={best}
                    smallThumbnails={thumbnails}
                    infoActionPanels={panels}
                    infoActionControls={controls}
                />
           );
        }
        // TODO
        return <div />;
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

            //set next page to the state
            state.search.next = searchRes.next_page;
            state.search.prev = searchRes.prev_page;

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
            tagsRes = combined[0];
            videosRes = combined[1];

            // Store the map of collections, videos.
            state.tags = tagsRes;
            state.videos = videosRes.videos;

            // Store the demographic thumbnails.
            // TODO? there may be collision here.
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
            const tags = UTILS.valuesFromMap(tagsRes);
            const thumbIds = tags.reduce((array, tag) => {
                // Video thumbnails are already stored.
                if(tag.tag_type !== UTILS.TAG_TYPE_VIDEO_COL) {
                    array = array.concat(tag.thumbnail_ids);
                }
                return array;
            }, []);
            // Create array of CSVs of max length.
            const thumbArgs = UTILS.csvFromArray(thumbIds, UTILS.MAX_CSV_VALUE_COUNT);

            // Batch only large requests since batch is slow.
            if (thumbArgs.length > 1) {
                thumbArgs.map(arg => {
                    self.batch('GET', 'thumbnails', {thumbnail_id: arg});
                });
                return self.sendBatch();
            } else {
                return self.GET('thumbnails', {data: {thumbnail_id: thumbArgs[0]}});
            }
        })
        .then(thumbsRes => {

            thumbsRes.thumbnails.map(t => {
                state.thumbnails[0][0][t.thumbnail_id] = t;
            });

            // Finally, update state.
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
