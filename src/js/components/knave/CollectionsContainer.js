'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';

import VideoProcessing from './VideoProcessing';
import ImageCollection from './ImageCollection';
import VideoCollection from './VideoCollection';
import ThumbnailOverlay from '../knave/ThumbnailOverlay';

import { DeleteActions } from '../../stores/CollectionStores';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const CollectionsContainer = React.createClass({

    propTypes: {

        // Ask the store to load resources for a tag's thumbnails
        // for a given demographic.
        loadTagForDemographic: PropTypes.func.isRequired,

        // Ask the store to load thumbnailFeatures and features
        // for a given tag and demographic.
        loadFeaturesForTag: PropTypes.func.isRequired,

        // Sorted list of collection ids to show
        shownIds: PropTypes.array.isRequired,

        // Map of store identifying key to the store,
        // which is a map of object id to object.
        stores: PropTypes.object.isRequired,
        getVideoStatus: PropTypes.func.isRequired,

        // Defaults to Function to delete/hide a collection from
        // both the backend and frontend display
        deleteCollection: PropTypes.func,

        // ClickHandler for social sharing buttons
        socialClickHandler: PropTypes.func,

        // Allows a component to get a sharing url
        getShareUrl: PropTypes.func,

        // Allows a collection to send results email
        sendResultsEmail: PropTypes.func,

        // Minimal UI for share.
        infoPanelOnly: PropTypes.bool,

        // Pops the side bar module given a recognized string
        setSidebarContent: PropTypes.func.isRequired

        // TODO add learnmore func.
    },

    getInitialState: function() {
        return {

            // Map of tag id to integer index of gender, then age.
            // Uses FILTER_GENDER_COL_ENUM, FILTER_AGE_COL_ENUM.
            // By default, the demographic is [0,0] meaning gender=none, age=none.
            selectedDemographic: {},

            // Setting a tag will render the modal overlay thumbnail zoom.
            overlayTagId: null,
            overlayThumbnailId: null
        };
    },

    // Return array of gender,age enum array based
    // on state of collection.
    getDemoOptionArray: function(tagId) {
        const tag = this.props.stores.tags[tagId];
        switch(tag.tag_type) {
        case UTILS.TAG_TYPE_IMAGE_COL:
            // All factor posibilities are available.
            // TODO? do statically as class behavior.
            return UTILS.productOfArrays(
                _.values(UTILS.FILTER_GENDER_COL_ENUM),
                _.values(UTILS.FILTER_AGE_COL_ENUM)
            );
        case UTILS.TAG_TYPE_VIDEO_COL:
            const video = this.props.stores.videos[tag.video_id];
            return video.demographic_thumbnails.map(demo => {
                return [
                    UTILS.FILTER_GENDER_COL_ENUM[demo.gender],
                    UTILS.FILTER_AGE_COL_ENUM[demo.age]
                ];
            });
        }
        return [[0,0]];
    },

    getSelectedDemographic: function(tagId) {
        if (this.state.selectedDemographic[tagId]) {
            return this.state.selectedDemographic[tagId];
        }
        return [0, 0];
    },

    // Given a tag id, construct a  valid Collection
    // component instance and return it.
    //
    // Else return an error component.
    buildCollectionComponent: function(tagId) {

        const collection = this.props.stores.tags[tagId];

        switch(collection.tag_type) {
            case UTILS.TAG_TYPE_IMAGE_COL:
                return this.buildImageCollectionComponent(tagId);
            case UTILS.TAG_TYPE_VIDEO_COL:
                return this.buildVideoCollectionComponent(tagId);
        }
        // TODO? try-catch: if components fail prop validation, catch
        // and return an error component.
        return <div />;
    },

    // On demographic selector change, fill in stores.
    onDemoChange: function(tagId, demoKey) {
        const selectedDemographic = this.state.selectedDemographic;
        const gender = demoKey[0];
        const age = demoKey[1];
        selectedDemographic[tagId] = [gender, age];

        // Ask stores to load missing values.
        // And change our state when done.
        const callback = () => {
            this.setState({selectedDemographic});
        };
        this.props.loadTagForDemographic(tagId, gender, age, callback);
    },

    // Given tag id and demo, gives array of
    //   left feature thumbnail
    //   right feature thumbnail
    //   rest of thumbnails
    //   [and more thumbnails]
    getLeftRightRest: function(tagId, gender, age) {

        const getLeftRightRestVideo = () => {

            const tag = this.props.stores.tags[tagId];
            const video = this.props.stores.videos[tag.video_id];

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
                this.props.stores.thumbnails[gender][age],
                videoDemo.thumbnails.map(t => {
                    return t.thumbnail_id;
                }));

            // For the right, use the best scoring.
            const right = UTILS.bestThumbnail(_.values(allThumbnailMap));
            // For the left, find a default thumbnail or use the worst.
            const _default = UTILS.findDefaultThumbnail(
                {thumbnails: _.values(allThumbnailMap)}
            );
            const left = _default? _default: UTILS.worstThumbnail(_.values(allThumbnailMap));

            const rest = _
                .chain(allThumbnailMap)
                // Remove the feature thumbnails from the small list.
                .omit([right.thumbnail_id, left.thumbnail_id])
                .values()
                // Order by score, best to worst, then created time for stability.
                .orderBy(['neon_score', 'created'], ['desc', 'asc'])
                .value();

            // Do the same for the bad thumbnail list.
            const allBadThumbnailMap = _.pick(
                this.props.stores.thumbnails[gender][age],
                videoDemo.bad_thumbnails.map(t => {
                    return t.thumbnail_id;
                })
            );
            const more = _
                .chain(allBadThumbnailMap)
                .values()
                .orderBy(['neon_score', 'created'], ['desc', 'asc'])
                .value();
            return [left, right, rest, more];
        };

        const getLeftRightRestImage = () => {
            const tag = this.props.stores.tags[tagId];
            const allThumbnailMap = _.pick(
                this.props.stores.thumbnails[gender][age],
                tag.thumbnail_ids)
            const right = UTILS.bestThumbnail(_.values(allThumbnailMap));
            const left = UTILS.worstThumbnail(_.values(allThumbnailMap));

            // Build the list of thumbnails to display below.
            const rest = _
                .chain(allThumbnailMap)
                // Remove the feature thumbnails from the small list.
                .omit([right.thumbnail_id, left.thumbnail_id])
                .values()
                // Order by score, best to worst, then created time for stability.
                .orderBy(['neon_score', 'created'], ['desc', 'asc'])
                .value();
            return [left, right, rest, []];
        };

        const tag = this.props.stores.tags[tagId];
        switch(tag.tag_type) {
            case UTILS.TAG_TYPE_VIDEO_COL:
                return getLeftRightRestVideo();
            case UTILS.TAG_TYPE_IMAGE_COL:
            default:
                return getLeftRightRestImage();
        }

    },


    buildImageCollectionComponent: function(tagId) {

        const collection = this.props.stores.tags[tagId];

        const demo = this.getSelectedDemographic(tagId);
        const gender = demo[0];
        const age = demo[1];

        const thumbArrays = this.getLeftRightRest(tagId, gender, age);
        const left = thumbArrays[0];
        const right = thumbArrays[1];
        const smallThumbnails = thumbArrays[2];

        const thumbLiftMap = this.props.stores.lifts[gender][age][tagId] || {};

        return (
            <ImageCollection
                key={tagId}
                title={collection.name}
                tagId={tagId}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                smallThumbnails={smallThumbnails}
                onThumbnailClick={this.onThumbnailClick.bind(null, tagId)}
                onDemographicChange={this.onDemoChange.bind(null, tagId)}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={[gender, age]}
                infoPanelOnly={this.props.infoPanelOnly}
                deleteCollection={DeleteActions.deleteCollectionByTagId.bind(null, tagId)}
                socialClickHandler={this.props.socialClickHandler}
                getShareUrl={this.props.getShareUrl}
                sendResultsEmail={this.props.sendResultsEmail}
                thumbLiftMap={thumbLiftMap}
            />
        );
    },

    buildVideoCollectionComponent(tagId, onDemoChange, onThumbnailMouseEnter) {

        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];

        if (['processing', 'failed'].includes(video.state)) {
            return this.buildVideoProcessingComponent(tagId);
        }

        const demo = this.getSelectedDemographic(tagId);
        const gender = demo[0];
        const age = demo[1];

        const thumbArrays = this.getLeftRightRest(tagId, gender, age);
        const left = thumbArrays[0];
        const right = thumbArrays[1];
        const smallThumbnails = thumbArrays[2];
        const badThumbnails = thumbArrays[3];

        const thumbLiftMap = this.props.stores.lifts[gender][age][tagId] || {};

        return (
            <VideoCollection
                key={tagId}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                smallThumbnails={smallThumbnails}
                smallBadThumbnails={badThumbnails}
                onThumbnailClick={this.onThumbnailClick.bind(null, tagId)}
                title={video.title}
                videoId={video.video_id}
                tagId={tagId}
                onDemographicChange={this.onDemoChange.bind(null, tagId)}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={[gender, age]}
                infoPanelOnly={this.props.infoPanelOnly}
                deleteCollection={DeleteActions.deleteCollectionByTagId.bind(null, tagId)}
                socialClickHandler={this.props.socialClickHandler}
                getShareUrl={this.props.getShareUrl}
                sendResultsEmail={this.props.sendResultsEmail}
                thumbLiftMap={thumbLiftMap}
            />
       );
    },

    buildVideoProcessingComponent(tagId) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];
        return (
            <VideoProcessing
                key={tagId}
                title={video.title}
                videoState={video.state}
                estimatedTimeRemaining={video.estimated_time_remaining}
                duration={video.duration}
                videoId={video.video_id}
                getVideoStatus={this.props.getVideoStatus}
            />
        );
    },

    // Gets the Thumbnail resource for the
    // current demographic for a collection for a thumbnail id.
    getThumbnail: function(tagId, thumbnailId) {
        return this.getThumbnailMap(tagId)[thumbnailId];
    },
    // Get all the Thumbnail resources for the
    // current demographic for a collection as map of id to thumbnail.
    //
    // (If a video, this is the union of good and bad thumbs.)
    getThumbnailMap: function(tagId) {
        let gender = 0;
        let age = 0;
        if (this.state.selectedDemographic[tagId] !== undefined) {
            [gender, age] = this.state.selectedDemographic[tagId];
        }
        const tag = this.props.stores.tags[tagId];
        let associatedThumbnailIds;
        if(tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
            const video = this.props.stores.videos[tag.video_id];
            const demo = UTILS.findDemographicThumbnailObject(
                video.demographic_thumbnails,
                gender,
                age);
            associatedThumbnailIds = _.union(
                demo.thumbnails.map(t => { return t.thumbnail_id }),
                demo.bad_thumbnails.map(t => { return t.thumbnail_id })
            );
        } else {
            associatedThumbnailIds = tag.thumbnail_ids;
        }
        return _.pick(
            this.props.stores.thumbnails[gender][age],
            associatedThumbnailIds);
    },

    onThumbnailClick: function(overlayTagId, overlayThumbnailId) {
        const self = this;
        self.setState({overlayTagId, overlayThumbnailId});
        TRACKING.sendEvent(self, arguments, !!self.state.overlayTagId);
    },

    onOverlayClickNextPrev: function(newThumbnailId, e) {
        e.preventDefault();
        const self = this;
        const thumbnail = self.getThumbnail(self.state.overlayTagId, self.state.overlayThumbnailId);
        TRACKING.sendEvent(self, arguments, thumbnail);
        self.setState({
            overlayThumbnailId: newThumbnailId
        });
    },

    onOverlayClose: function(e) {
        e.preventDefault();
        const self = this;
        self.setState({
            overlayTagId: null,
            overlayThumbnailId: null
        });

    },

    buildOverlayComponent: function() {

        const tagId = this.state.overlayTagId;

        if (!tagId) {
            return null;
        }

        // Get score sorted thumbnails for collection.
        const demo = this.getSelectedDemographic(tagId);
        const gender = demo[0];
        const age = demo[1];

        // Begin loading features
        this.props.loadFeaturesForTag(tagId, gender, age);

        const thumbnailMap = this.getThumbnailMap(tagId);

        // Get the same order of list that the collections uses.
        const sortedThumbnails = _.flatten(this.getLeftRightRest(tagId, gender, age));

        // Deal with when the best and worst is the same.
        if(sortedThumbnails[0] == sortedThumbnails[1]) {
            sortedThumbnails.shift();
        }

        // Find the current thumbnail index or default to first.
        const thumbnailIndex = _.findIndex(sortedThumbnails, t => {
            return t.thumbnail_id == this.state.overlayThumbnailId;
        }) || 0;
        const thumbnailId = sortedThumbnails[thumbnailIndex].thumbnail_id;

        // Find the next and previous thumbnail ids for navigation.
        // Use modulo to ensure index is in [0, <length of thumbnails>).
        const thumbnailCount = sortedThumbnails.length;

        const nextThumbnailIndex = ( 1 + thumbnailIndex) % thumbnailCount;
        const prevThumbnailIndex = (-1 + thumbnailIndex + thumbnailCount) % thumbnailCount;

        const nextThumbnailId = sortedThumbnails[nextThumbnailIndex].thumbnail_id;
        const prevThumbnailId = sortedThumbnails[prevThumbnailIndex].thumbnail_id;
        // Find lift for the displayed thumb.
        const lift = this.props.stores.lifts
            [gender]
            [age]
            [tagId]
            [thumbnailId] || 0;

        // Build a map of thumbnail id to array of feature names.
        const thumbnailFeatures = _(this.props.stores.thumbnailFeatures
                [gender]
                [age])
            .pick(_.keys(thumbnailMap))
            .value();

        const thumbnailFeatureNameMap = {};
        _.map(thumbnailFeatures, (featureIds, thumbnailId) => {
            thumbnailFeatureNameMap[thumbnailId] = featureIds.map(id => {
                return this.props.stores.features[id];
            });
        })

        return (
            <ThumbnailOverlay
                thumbnails={sortedThumbnails}
                selectedItem={thumbnailIndex}
                displayThumbLift={lift}
                // Bind next/prev functions to store the next/prev thumb id
                handleClickNext={this.onOverlayClickNextPrev.bind(null, nextThumbnailId)}
                handleClickPrevious={this.onOverlayClickNextPrev.bind(null, prevThumbnailId)}
                closeThumbnailOverlay={this.onOverlayClose}
                openLearnMore={this.props.setSidebarContent.bind(null, 'learnMore')}
                thumbnailFeatureNameMap={thumbnailFeatureNameMap}
            />
        );

    },
    render: function() {
        const collections = this.props.shownIds.map(tagId => {
            return this.buildCollectionComponent(tagId);
        });
        return (
            <div>
                {this.buildOverlayComponent()}
                <ul>{collections}</ul>
            </div>
        );
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
