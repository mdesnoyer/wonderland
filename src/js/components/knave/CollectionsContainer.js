import React, { PropTypes } from 'react';
import _ from 'lodash';

import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';
import VideoProcessing from './VideoProcessing';
import ImageCollection from './ImageCollection';
import VideoCollection from './VideoCollection';
import ThumbnailOverlay from '../knave/ThumbnailOverlay';
import { SendActions } from '../../stores/CollectionStores';

const propTypes = {
    // Map of store identifying key to the store,
    // which is a map of object id to object.
    stores: PropTypes.object.isRequired,
    // Sorted list of collection ids to show
    shownIds: PropTypes.array.isRequired,
    // Ask the store to load resources for a tag's thumbnails
    // for a given demographic.
    loadTagForDemographic: PropTypes.func.isRequired,
    // Ask the store to load thumbnailFeatures and features
    // for a given tag and demographic.
    loadFeaturesForTag: PropTypes.func.isRequired,
    // Pops the side bar module given a recognized string
    setSidebarContent: PropTypes.func.isRequired,
    // the accountid that owns these containers
    // @TODO verify this is needed.
    ownerAccountId: PropTypes.string.isRequired,
    // Flag for viewing a shared collection
    isMine: PropTypes.bool.isRequired,
    // Enables custom tooltip
    setTooltipText: PropTypes.func.isRequired,
    // Defaults to Function to delete/hide a collection from
    // both the backend and frontend display
    deleteCollection: PropTypes.func,
    // ClickHandler for social sharing buttons
    socialClickHandler: PropTypes.func,
    // Allows a collection to send results email
    sendResultsEmail: PropTypes.func,
    // Functions to enable disable serving of thumbnail
    enableThumbnail: PropTypes.func,
    disableThumbnail: PropTypes.func,
    // Minimal UI for share.
    infoPanelOnly: PropTypes.bool,
};

const defaultProps = {
    deleteCollection: Function.protoype,
    socialClickHandler: Function.prototype,
    sendResultsEmail: Function.prototype,
    enableThumbnail: Function.prototype,
    disableThumbnail: Function.protoype,
    infoPanelOnly: false,
};

class CollectionsContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // Map of tag id to integer index of gender, then age.
            // Uses FILTER_GENDER_COL_ENUM, FILTER_AGE_COL_ENUM.
            // By default, the demographic is [0,0] meaning gender=none, age=none.
            selectedDemographic: {},
            // If a demographic was selected but it isn't available yet, and a
            // request has been made to load it, then this will set it
            // if it becomes loaded.
            nextSelectedDemographic: {},
            // Setting a tag will render the modal overlay thumbnail zoom.
            overlayTagId: null,
            overlayThumbnailId: null,
        };

        this.onDemographicChange = this.onDemographicChange.bind(this);
        this.onSendResultsEmail = this.onSendResultsEmail.bind(this);
        this.onDeleteCollection = this.onDeleteCollection.bind(this);
        this.onThumbnailClick = this.onThumbnailClick.bind(this);
        this.onOverlayThumbnailNext = this.onOverlayThumbnailNext.bind(this);
        this.onOverlayThumbnailPrev = this.onOverlayThumbnailPrev.bind(this);
        this.onOverlayClose = this.onOverlayClose.bind(this);
        // This is synthesized from the props-provided function.
        this.onOpenLearnMore = props.setSidebarContent.bind(null, 'learnMore');
    }

    // This enables queueing of the demographic selector.
    componentWillReceiveProps(nextProps) {
        // If the next props have a queued selected
        // demographic (in indexes 2-3), then move the queued selected
        // to the selected one.
        const selectedDemographic = this.state.selectedDemographic;
        _.map(selectedDemographic, (selDemo, tagId) => {
            if (selDemo.length === 4) {
                const nextGender = selDemo[2];
                const nextAge = selDemo[3];
                const tag = nextProps.stores.tags[tagId];
                const video = nextProps.stores.videos[tag.video_id];
                const demos = video.demographic_clip_ids.length ?
                    video.demographic_clip_ids :
                    video.demographic_thumbnails;

                const foundDemo = UTILS.findDemographicThumbnailObject(demos, nextGender, nextAge);
                if (foundDemo) {
                    selectedDemographic[tagId] = [nextGender, nextAge];
                }
            }
        });
        this.setState({ selectedDemographic });
    }

    // Given a tag id, build a valid Collection
    // component instance and return it.
    //
    // Else return an error component.

    // On demographic selector change, fill in stores.
    onDemographicChange(tagId, gender, age) {
        const selectedDemographic = this.state.selectedDemographic;

        let newDemographic = [gender, age];

        // If this is a video and the demographic isn't in the
        // video store, then put the gender and age in the "next"
        // bucket indexes at 2, 3. In the videocollection willReceiveProps,
        // we check if the next demos are ready and switch to them.
        const tag = this.props.stores.tags[tagId];
        if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
            const video = this.props.stores.videos[tag.video_id];
            const demos = video.demographic_clip_ids.length ?
                video.demographic_clip_ids :
                video.video.demographic_thumbnails;
            if (!UTILS.findDemographicThumbnailObject(demos, gender, age)) {
                const prevDemo = this.getSelectedDemographic(tagId);
                newDemographic = prevDemo.slice(0, 2);
                newDemographic.push(gender, age);
            }
        }

        selectedDemographic[tagId] = newDemographic;

        // Ask stores to load missing values.
        // And change our state when done.
        const callback = () => {
            this.setState({ selectedDemographic });
        };
        this.props.loadTagForDemographic(tagId, gender, age, callback);
    }

    onSendResultsEmail(tagId) {
        const [gender, age] = this.getSelectedDemographic(tagId);
        // Skip the left, or worse thumb.
        const [, right, rest] = this.getLeftRightRest(tagId, gender, age);
        const thumbnails = _.flatten([right, rest]);
        const fourThumbnails = thumbnails.slice(0, 4);
        while (fourThumbnails.length < 4) {
            // Filling in with something guaranteed.
            fourThumbnails.push(thumbnails[0]);
        }
        this.props.sendResultsEmail(gender, age, tagId, fourThumbnails);
    }

    onDeleteCollection(tagId) {
        SendActions.deleteCollection(tagId);
    }

    onThumbnailClick(overlayTagId, overlayThumbnailId, ...rest) {
        this.setState({ overlayTagId, overlayThumbnailId });
        TRACKING.sendEvent(this, rest, !!this.state.overlayTagId);
    }

    onOverlayThumbnailNext() {
        const overlayThumbnailId = this.getOverlayThumbnailId(+1);
        this.setState({ overlayThumbnailId });
    }

    onOverlayThumbnailPrev() {
        const overlayThumbnailId = this.getOverlayThumbnailId(-1);
        this.setState({ overlayThumbnailId });
    }

    onOverlayClose(e) {
        e.preventDefault();
        this.setState({
            overlayTagId: null,
            overlayThumbnailId: null,
        });
    }

    getLeftRightRestVideo(tagId, gender, age) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];

        let genderLabel = _.invert(UTILS.FILTER_GENDER_COL_ENUM)[gender];
        if (genderLabel === 'null') {
            genderLabel = null;
        }
        let ageLabel = _.invert(UTILS.FILTER_AGE_COL_ENUM)[age];
        if (ageLabel === 'null') {
            ageLabel = null;
        }
        const videoDemo = _.find(
            video.demographic_thumbnails,
            t => t.gender === genderLabel && t.age === ageLabel);
        if (videoDemo === undefined) {
            return [];
        }
        let allThumbnailMap = [];
        if (videoDemo.thumbnails) {
            allThumbnailMap = _.pick(
                this.props.stores.thumbnails[gender][age],
                videoDemo.thumbnails.map(t => t.thumbnail_id));
        }
        if (_.isEmpty(allThumbnailMap)) {
            // Get the thumbnails on the tag for clips.
            tag.thumbnail_ids.forEach(thumbnailId => {
                allThumbnailMap[thumbnailId] =
                    this.props.stores.thumbnails[gender][age][thumbnailId];
            });
        }

        if (_.isEmpty(allThumbnailMap)) {
            return [];
        }

        // For the right, use the best scoring.
        const right = UTILS.bestThumbnail(_.values(allThumbnailMap));
        // For the left, find a default thumbnail or use the worst.
        const defaultThumb = UTILS.findDefaultThumbnail(
            { thumbnails: _.values(allThumbnailMap) });
        const left = defaultThumb || UTILS.worstThumbnail(_.values(allThumbnailMap));
        const rest = _
            .chain(allThumbnailMap)
            // Remove the feature thumbnails from the small list.
            .omit([right.thumbnail_id, left.thumbnail_id])
            .values()
            // Order by score, best to worst, then created time for stability.
            .orderBy(['neon_score', 'created'], ['desc', 'asc'])
            .value();

        // Do the same for the bad thumbnail list.
        let allBadThumbnailMap = [];
        if (videoDemo.bad_thumbnails) {
            allBadThumbnailMap = _.pick(
                this.props.stores.thumbnails[gender][age],
                videoDemo.bad_thumbnails.map(t => t.thumbnail_id));
        }
        const more = _
            .chain(allBadThumbnailMap)
            .values()
            .orderBy(['neon_score', 'created'], ['desc', 'asc'])
            .value();
        return [left, right, rest, more];
    }

    getLeftRightRestImage(tagId, gender, age) {
        const tag = this.props.stores.tags[tagId];
        const allThumbnailMap = _.pick(
            this.props.stores.thumbnails[gender][age],
            tag.thumbnail_ids);
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
    }

    // Given tag id and demo, gives array of
    //   left feature thumbnail
    //   right feature thumbnail
    //   rest of thumbnails
    //   [and more thumbnails]
    getLeftRightRest(tagId, gender, age) {
        const tag = this.props.stores.tags[tagId];
        if (tag.tag_type === UTILS.TAG_TYPE_IMAGE_COL) {
            return this.getLeftRightRestImage(tagId, gender, age);
        }
        return this.getLeftRightRestVideo(tagId, gender, age);
    }

    // Return array of gender,age enum array based
    // on state of collection.
    getDemoOptionArray(tagId) {
        const tag = this.props.stores.tags[tagId];
        switch (tag.tag_type) {
        case UTILS.TAG_TYPE_IMAGE_COL:
            // All factor posibilities are available.
            // TODO? do statically as class behavior.
            return UTILS.productOfArrays(
                _.values(UTILS.FILTER_GENDER_COL_ENUM),
                _.values(UTILS.FILTER_AGE_COL_ENUM)
            );
        case UTILS.TAG_TYPE_VIDEO_COL:
            {
                const video = this.props.stores.videos[tag.video_id];
                const demos = video.demographic_clip_ids.length ?
                    video.demographic_clip_ids :
                    video.demographic_thumbnails;
                return demos.map(demo => (
                    [
                        UTILS.FILTER_GENDER_COL_ENUM[demo.gender],
                        UTILS.FILTER_AGE_COL_ENUM[demo.age],
                    ]
                )).sort();
            }
        default:
            return [[0, 0]];
        }
    }

    getSelectedDemographic(tagId) {
        if (this.state.selectedDemographic[tagId]) {
            return this.state.selectedDemographic[tagId];
        }
        return [0, 0];
    }

    // Gets the Thumbnail resource for the
    // current demographic for a collection for a thumbnail id.
    getThumbnail(tagId, thumbnailId) {
        return this.getThumbnailMap(tagId)[thumbnailId];
    }

    // Get all the Thumbnail resources for the
    // current demographic for a collection as map of id to thumbnail.
    //
    // (If a video, this is the union of good and bad thumbs.)
    getThumbnailMap(tagId) {
        let gender = 0;
        let age = 0;
        if (this.state.selectedDemographic[tagId] !== undefined) {
            [gender, age] = this.state.selectedDemographic[tagId];
        }
        const tag = this.props.stores.tags[tagId];
        let associatedThumbnailIds;
        if (tag.tag_type === UTILS.TAG_TYPE_VIDEO_COL) {
            const video = this.props.stores.videos[tag.video_id];
            const demo = UTILS.findDemographicThumbnailObject(
                video.demographic_thumbnails,
                gender,
                age);
            associatedThumbnailIds = _.union(
                demo.thumbnails.map(t => t.thumbnail_id),
                demo.bad_thumbnails.map(t => t.thumbnail_id));
        } else {
            associatedThumbnailIds = tag.thumbnail_ids;
        }
        return _.pick(
            this.props.stores.thumbnails[gender][age],
            associatedThumbnailIds);
    }

    // Get the current thumbnail index or 0 if no id is set.
    getOverlayThumbnailIndex() {
        const thumbnails = this.getSortedThumbnails();
        if (!this.state.overlayThumbnailId) {
            return 0;
        }
        return _.findIndex(thumbnails, t => (
            t.thumbnail_id === this.state.overlayThumbnailId));
    }

    getOverlayThumbnailId(change) {
        const thumbnails = this.getSortedThumbnails();
        const oldIndex = this.getOverlayThumbnailIndex();
        const newIndex = (oldIndex + change) % thumbnails.length;
        return thumbnails[newIndex].thumbnail_id;
    }

    getSortedThumbnails() {
        const tagId = this.state.overlayTagId;
        const [gender, age] = this.getSelectedDemographic(tagId);
        const thumbnails = _(this.getLeftRightRest(tagId, gender, age))
            .flatten()
            .sortedUniqBy('thumbnail_id')
            .value();
        // Deal with when the best and worst is the same.
        if (thumbnails[0] === thumbnails[1]) {
            thumbnails.shift();
        }
        return thumbnails;
    }

    renderOverlayComponent() {
        // If no tag, the overlay hasn't been opened.
        const tagId = this.state.overlayTagId;
        if (!tagId) {
            return null;
        }
        const tag = this.props.stores.tags[tagId];

        // Get score sorted thumbnails for collection.
        const [gender, age] = this.getSelectedDemographic(tagId);

        // Begin async loading features.
        this.props.loadFeaturesForTag(tagId, gender, age);

        // Get the same sort of thumbnails that the collections uses.
        const sortedThumbnails = this.getSortedThumbnails();
        const thumbnailIndex = this.getOverlayThumbnailIndex();

        // Find lift for the shown thumbnail.
        const lift = this.props.stores.lifts[gender][age][tagId][this.state.overlayThumbnailId];

        // Build a map of thumbnail id to array of feature names.
        const thumbnailMap = this.getThumbnailMap(tagId);
        const thumbnailFeatures = _(this.props.stores.thumbnailFeatures[gender][age])
            .pick(_.keys(thumbnailMap))
            .value();

        const thumbnailFeatureNameMap = {};
        _.map(thumbnailFeatures, (featureIds, thumbnailId) => {
            thumbnailFeatureNameMap[thumbnailId] = featureIds.map(id => (
                this.props.stores.features[id]
            ));
        });

        // Override copy for image collection.
        const copyOverrideMap = tag.tag_type === UTILS.TAG_TYPE_IMAGE_COL ?
            { 'copy.lift.explanation': 'copy.lift.explanation.images' } : null;

        return (
            <ThumbnailOverlay
                thumbnails={sortedThumbnails}
                selectedItem={thumbnailIndex}
                displayThumbLift={lift}
                tagType={tag.tag_type}
                handleClickNext={this.onOverlayThumbnailNext}
                handleClickPrevious={this.onOverlayThumbnailPrev}
                closeThumbnailOverlay={this.onOverlayClose}
                openLearnMore={this.onOpenLearnMore}
                thumbnailFeatureNameMap={thumbnailFeatureNameMap}
                copyOverrideMap={copyOverrideMap}
            />
        );
    }

    renderCollectionComponent(tagId) {
        const collection = this.props.stores.tags[tagId];

        if (collection.thumbnail_ids.length < 1 && collection.tag_type !== 'video') {
            return <div key={tagId} />;
        }
        switch (collection.tag_type) {
        case UTILS.TAG_TYPE_IMAGE_COL:
            return this.renderImageCollectionComponent(tagId);
        case UTILS.TAG_TYPE_VIDEO_COL:
        default:
            return this.renderVideoCollectionComponent(tagId);
        }
    }

    renderImageCollectionComponent(tagId) {
        const collection = this.props.stores.tags[tagId];

        const demo = this.getSelectedDemographic(tagId);
        const gender = demo[0];
        const age = demo[1];

        const thumbArrays = this.getLeftRightRest(tagId, gender, age);
        const left = thumbArrays[0];
        const right = thumbArrays[1];
        const smallThumbnails = thumbArrays[2];

        const thumbLiftMap = !_.isEmpty(this.props.stores.lifts[gender][age][tagId]) ?
            this.props.stores.lifts[gender][age][tagId] : {};

        const shareUrl = (tagId in this.props.stores.tagShares) ?
            this.props.stores.tagShares[tagId].url : undefined;

        const thumbsLength = collection.thumbnail_ids.length;

        return (
            <ImageCollection
                key={tagId}
                isMine={this.props.isMine}
                title={collection.name}
                tagId={tagId}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                smallThumbnails={smallThumbnails}
                thumbnailLength={thumbsLength}
                onThumbnailClick={this.onThumbnailClick}
                onDemographicChange={this.onDemographicChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={[gender, age]}
                infoPanelOnly={this.props.infoPanelOnly}
                deleteCollection={this.onDeleteCollection}
                socialClickHandler={this.props.socialClickHandler}
                shareUrl={shareUrl}
                sendResultsEmail={this.onSendResultsEmail}
                thumbLiftMap={thumbLiftMap}
                setTooltipText={this.props.setTooltipText}
            />
        );
    }

    renderVideoCollectionComponent(tagId) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];

        let isRefiltering = false;
        if (['submit', 'processing', 'failed'].includes(video.state)) {
            if (video.state === 'submit') {
                return this.renderVideoProcessingComponent(tagId);
            }
            if (video.state === 'failed' && !video.demographic_clip_ids.length) {
                return this.renderVideoFailedComponent(tagId);
            }

            if (tag.thumbnail_ids.length === 1) {
                // if it's just the default thumbnail, we have a video
                // that's still processing.
                const tid = tag.thumbnail_ids[0];
                const thumbnail = this.props.stores.thumbnails[0][0][tid];
                // we can't find the thumbnail in our stores, meaning it's
                // older or the default just hasn't showed up yet.
                if (!thumbnail || thumbnail.type === 'default') {
                    return this.renderVideoProcessingComponent(tagId);
                }
            }
            if (tag.thumbnail_ids.length === 0) {
                return this.renderVideoProcessingComponent(tagId);
            } else if (video.state === 'processing') {
                isRefiltering = true;
            }
        }

        const demo = this.getSelectedDemographic(tagId);
        const gender = demo[0];
        const age = demo[1];

        const thumbLiftMap = !_.isEmpty(this.props.stores.lifts[gender][age][tagId]) ?
            this.props.stores.lifts[gender][age][tagId] : {};

        const shareUrl = (tagId in this.props.stores.tagShares) ?
            this.props.stores.tagShares[tagId].url : undefined;

        const account = this.props.ownerAccountId ?
            this.props.stores.accounts[this.props.ownerAccountId] : null;

        const clipDemo = UTILS.findDemographicThumbnailObject(
            video.demographic_clip_ids, gender, age);
        let thumbArrays;
        let clipIds = [];
        let clips = [];
        let clipThumbs = {};
        if (clipDemo && clipDemo.clip_ids.length > 0) {
            clipIds = clipDemo.clip_ids;
            clips = this.props.stores.clips[gender][age];
            // The assumption that thumbnails stores are set up
            // demographically for clip videos is problematic, so
            // just use the defaults.
            clipThumbs = this.props.stores.thumbnails[0][0];
            thumbArrays = this.getLeftRightRest(tagId, 0, 0);
        } else {
            thumbArrays = this.getLeftRightRest(tagId, gender, age);
        }

        if (thumbArrays.length === 0) {
            // We can't find any thumbnails this thing is likely failed
            return this.renderVideoFailedComponent(tagId);
        }

        const left = thumbArrays[0];
        const right = thumbArrays[1];
        const smallThumbnails = thumbArrays[2];
        const badThumbnails = thumbArrays[3];
        const goodThumbnails = _.flatten([right, smallThumbnails]);

        return (
            <VideoCollection
                key={tagId}
                title={tag.name}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                goodThumbnails={goodThumbnails}
                smallThumbnails={smallThumbnails}
                smallBadThumbnails={badThumbnails}
                onThumbnailClick={this.onThumbnailClick}
                videoId={video.video_id}
                tagId={tagId}
                clips={clips}
                clipsIds={clipIds}
                clipThumbs={clipThumbs}
                getGifClipPosition={this.getGifClipPosition}
                onDemographicChange={this.onDemographicChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={demo}
                infoPanelOnly={this.props.infoPanelOnly}
                deleteCollection={this.onDeleteCollection}
                socialClickHandler={this.props.socialClickHandler}
                shareUrl={shareUrl}
                sendResultsEmail={this.onSendResultsEmail}
                thumbLiftMap={thumbLiftMap}
                setTooltipText={this.props.setTooltipText}
                isRefiltering={isRefiltering}
                timeRemaining={video.estimated_time_remaining}
                enableThumbnail={this.props.enableThumbnail}
                disableThumbnail={this.props.disableThumbnail}
                account={account}
            />
       );
    }

    renderVideoProcessingComponent(tagId) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];
        return (
            <VideoProcessing
                key={tagId}
                title={video.title}
                videoState={video.state}
                estimatedTimeRemaining={video.estimated_time_remaining}
                duration={video.duration}
                tagId={tagId}
                videoId={video.video_id}
                selectedDemographic={this.getSelectedDemographic(tagId)}
                deleteVideo={this.onDeleteCollection}
            />
        );
    }

    renderVideoFailedComponent(tagId) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];
        return (
            <VideoProcessing
                key={tagId}
                tagId={tagId}
                title={tag.name}
                videoState={'failed'}
                estimatedTimeRemaining={video.estimated_time_remaining}
                duration={video.duration}
                videoId={video.video_id}
                deleteVideo={this.onDeleteCollection}
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderOverlayComponent()}
                <ul>
                {
                    this.props.shownIds.map(tagId => (
                        this.renderCollectionComponent(tagId)))
                }
                </ul>
            </div>
        );
    }
}

CollectionsContainer.propTypes = propTypes;
CollectionsContainer.defaultProps = defaultProps;

export default CollectionsContainer;
