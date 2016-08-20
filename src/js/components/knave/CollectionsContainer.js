// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';

import ImageCollection from './ImageCollection';
import VideoCollection from './VideoCollection';
import ThumbnailOverlay from '../knave/ThumbnailOverlay';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const CollectionsContainer = React.createClass({

    propTypes: {

        // Ask the store to load resources for a tag's thumbnails
        // for a given demographic.
        loadTagForDemographic: PropTypes.func.isRequired,

        // The number of collections to display.
        numberToShow: PropTypes.number.isRequired,

        // TODO shape this
        // Map of store identifying key to the store,
        // which is a map of object id to object.
        stores: PropTypes.object.isRequired,

        // Defaults to Function to delete/hide a collection from
        // both the backend and frontend display
        deleteCollection: PropTypes.func.isRequired,

        // ClickHandler for social sharing buttons
        socialClickHandler: PropTypes.func.isRequired,

        // Allows a component to get a sharing url
        getShareUrl: PropTypes.func.isRequired,

        // Allows a collection to send results email
        sendResultsEmail: PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {

            // List of tag ids to render.
            shownIds: [],

            // Map of tag id to integer index of gender, then age.
            // Uses FILTER_GENDER_COL_ENUM, FILTER_AGE_COL_ENUM.
            // By default, the demographic is [0,0] meaning gender=none, age=none.
            selectedDemographic: {},

            overlayTagId: null,
            overlayThumbnailId: null
        };
    },

    // Tie into the parent's updating of its stores.
    componentWillReceiveProps: function(nextProps) {
        // TODO work on paging, sorting behavior.
        const shownIds = _.values(nextProps.stores.tags)
            .slice(0, nextProps.numberToShow)
            .map(t => {
                return t.tag_id;
            });
        this.setState({shownIds: shownIds});
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

    // Given a tag id, construct a  valid Collection
    // component instance and return it.
    //
    // Else return an error component.
    buildCollectionComponent: function(tagId) {

        const collection = this.props.stores.tags[tagId];

        // If a demographic was selected, use it. Else nulls.
        let gender,
            age;
        if (this.state.selectedDemographic[tagId]) {
            [gender, age] = this.state.selectedDemographic[tagId];
        } else {
            [gender, age] = [0, 0];
        }

        // On demographic selector change, fill in stores.
        const onDemoChange = (tagId, demoKey) => {

            const selectedDemographic = this.state.selectedDemographic;
            let gender = demoKey[0];
            let age = demoKey[1];
            selectedDemographic[tagId] = [gender, age];

            // Ask stores to load missing values.
            // And change our state when done.
            const callback = () => {
                this.setState({selectedDemographic});
            };
            this.props.loadTagForDemographic(tagId, gender, age, callback);
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
            this.props.stores.thumbnails[gender][age],
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

        // Show the lift for the base (best) thumbnail
        // vs the given thumbnail.
        const showLiftInInfoPanel = vsThumbnailId => {
            //TODO
        };
        // The lift map for the selected demographic.
        const liftMap = this.props.stores.lifts[gender][age];

        return (
            <ImageCollection
                key={collection.tag_id}
                title={collection.name}
                tagId={collection.tag_id}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                smallThumbnails={smallThumbnails}
                onThumbnailClick={this.onThumbnailClick.bind(null, collection.tag_id)}
                onDemographicChange={onDemoChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={[gender, age]}
                deleteCollection={this.props.deleteCollection}
                socialClickHandler={this.props.socialClickHandler}
                getShareUrl={this.props.getShareUrl}
                sendResultsEmail={this.props.sendResultsEmail}
            />
        );
    },

    // @TODO factor common code
    buildVideoCollectionComponent(tagId, collection, onDemoChange, gender, age) {

        const video = this.props.stores.videos[collection.video_id];
        if (!video) {
            return (<div></div>);
        }
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

        const smallThumbnails = _
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
        const smallBadThumbnails = _
            .chain(allBadThumbnailMap)
            .values()
            .orderBy(['neon_score', 'created'], ['desc', 'asc'])
            .value();

        return (
            <VideoCollection
                key={collection.tag_id}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                smallThumbnails={smallThumbnails}
                smallBadThumbnails={smallBadThumbnails}
                onThumbnailClick={this.onThumbnailClick.bind(null, collection.tag_id)}
                title={video.title}
                videoId={video.video_id}
                tagId={collection.tag_id}
                onDemographicChange={onDemoChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={[gender, age]}
                deleteCollection={this.props.deleteCollection}
                socialClickHandler={this.props.socialClickHandler}
                getShareUrl={this.props.getShareUrl}
                sendResultsEmail={this.props.sendResultsEmail}
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

    // TODO? move zoom component up to page container
    // TODO? factor to module
    buildOverlayComponent: function() {
        if (!this.state.overlayTagId) {
            return null;
        }

        // Get score sorted thumbnails for collection.
        const tag = this.props.stores.tags[this.state.overlayTagId];
        let gender = 0;
        let age = 0;
        if (undefined !== this.state.selectedDemographic[this.state.overlayTagId]) {
            [gender, age] = this.state.selectedDemographic[this.state.overlayTagId];
        }
        const thumbnailMap = this.getThumbnailMap(this.state.overlayTagId);
        const sortedThumbnails = _
            .chain(thumbnailMap)
            .values()
            .orderBy(['neon_score', 'created'], ['desc', 'asc'])
            .value();

        // Find the current thumbnail index or default to first.
        const thumbnailIndex = _.findIndex(sortedThumbnails, t => {
                return t.thumbnail_id == this.state.overlayThumbnailId;
            }) || 0;

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
            [this.state.overlayTagId]
            [this.state.overlayThumbnailId] || 0;

        return (
            <ThumbnailOverlay
                thumbnails={sortedThumbnails}
                selectedItem={thumbnailIndex}
                displayThumbLift={lift}
                // Bind next/prev functions to bind the new thumb id
                handleClickNext={this.onOverlayClickNextPrev.bind(null, nextThumbnailId)}
                handleClickPrevious={this.onOverlayClickNextPrev.bind(null, prevThumbnailId)}
                closeThumbnailOverlay={this.onOverlayClose}
                openLearnMore={this.props.openLearnMore}
            />
        );

    },
    render: function() {
        const collections = this.state.shownIds.map(tagId => {
            return this.buildCollectionComponent(tagId);
        });
        return (
            <div className="xxCollectionImages">
                {this.buildOverlayComponent()}
                <ul>{collections}</ul>
            </div>
        );
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
