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

            // Map of id to thumbnail.
            thumbnails: {},

            // Map of id to video.
            videos: {},
        };
    },

    // Given a collection and an optional object, construct a
    // valid Collection component instance and return it
    //
    // else return an error component.
    buildCollectionComponent: function(tag_id) {

        const collection = this.state.tags[tag_id];
        const thumbnails = _
            .chain(this.state.thumbnails)
            .pick(collection.thumbnail_ids)
            .values()
            .orderBy('neon_score', 'desc')
            .value();
        const best = UTILS.bestThumbnail(thumbnails);
        const worst = UTILS.worstThumbnail(thumbnails);
        // TODO? Remove best and worst from thumbs

        const demoSelector = (
            // TODO Look at demographic thumbs, build
            // list and have callback to rerender with new thumbs.
            <div />
        );

        // List of right-hand side control components for
        // the content given type and session.
        const panels = [
            <InfoDemoLiftPanel
                title={collection.name}
                demoSelector={demoSelector}
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

            // TODO thumbnail list behaves.

            return (
                <ImageCollection
                    key={collection.tag_id}
                    leftFeatureThumbnail={worst}
                    rightFeatureThumbnail={best}
                    smallThumbnails={thumbnails}
                    infoActionPanels={panels}
                    infoActionControls={controls}
                    demoSelector={demoSelector}
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
                    demoSelector={demoSelector}
                />
           );
        }
        /*
        return (
            <ErrorCollection
                message={T.get('error.generic')}
            />
        );
        /**/
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
            state.videos = videosRes;

            // Get and concatenate all thumbnail ids.
            const tags = UTILS.valuesFromMap(tagsRes);
            const thumbIds = tags.reduce((array, tag) => {
                array = array.concat(tag.thumbnail_ids);
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
                state.thumbnails[t.thumbnail_id] = t;
            });

            // Finally, update state.
            self.setState(state);
        })
    },

    render: function() {
        const collections = _.keys(this.state.tags).map(tag => {
            return this.buildCollectionComponent(tag);
        });
        return (<ul>{collections}</ul>);
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
