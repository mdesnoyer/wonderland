import React, { PropTypes } from 'react';
import _ from 'lodash';

import ImageCollection from './ImageCollection';
import ThumbnailOverlay from '../knave/ThumbnailOverlay';
import VideoCollection from './VideoCollection';
import VideoProcessing from './VideoProcessing';

import UTILS from '../../modules/utils';
import TRACKING from '../../modules/tracking';

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
    setTooltipText: PropTypes.func,

    // Defaults to Function to delete/hide a collection from
    // both the backend and frontend display
    onDeleteCollection: PropTypes.func,

    // ClickHandler for social sharing buttons
    socialClickHandler: PropTypes.func,

    // Allows a collection to send results email
    sendResultsEmail: PropTypes.func,
    sendGifResultsEmail: PropTypes.func,

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
            // The overlay's current thumbnail id.
            overlayThumbnailId: null,
        };

        this.onDemographicChange = this.onDemographicChange.bind(this);
        this.onSendResultsEmail = this.onSendResultsEmail.bind(this);
        this.onSendGifResultsEmail = this.onSendGifResultsEmail.bind(this);
        this.onThumbnailClick = this.onThumbnailClick.bind(this);
        this.onOverlayThumbnailNext = this.onOverlayThumbnailNext.bind(this);
        this.onOverlayThumbnailPrev = this.onOverlayThumbnailPrev.bind(this);
        this.onOverlayClose = this.onOverlayClose.bind(this);
        this.onOpenLearnMore = props.setSidebarContent.bind(null, 'learnMore');
    }

    // This enables queueing of the demographic selector.
    componentWillReceiveProps(nextProps) {
        // If the next props have a queued selected
        // demographic (in indexes 2-3), then move the queued selected
        // to the selected one.
        const selectedDemographic = this.state.selectedDemographic;
        _.map(selectedDemographic, (selDemo, tagId) => {
            if (_.size(selDemo.length) === 4) {
                // Look for the next one.
                const { nextGender, nextAge } = selDemo;
                const tag = nextProps.stores.tags[tagId];
                const video = nextProps.stores.videos[tag.video_id];
                const demos = video.demographic_clip_ids.length ?
                    video.demographic_clip_ids :
                    video.demographic_thumbnails;
                const foundDemo = UTILS.findDemographicObject(demos, nextGender, nextAge);
                if (foundDemo) {
                    // If we find this demo stored, then use it.
                    selectedDemographic[tagId] = { gender: nextGender, age: nextAge };
                }
            }
        });
        this.setState({ selectedDemographic });
    }

    // On demographic selector change, fill in stores.
    onDemographicChange(tagId, gender, age) {
        const selectedDemo = this.state.selectedDemographic;
        const newDemo = { gender, age };

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
            if (!UTILS.findDemographicObject(demos, gender, age)) {
                // Use the previous demo until the selected one
                // is loaded by pushing the selected one into
                // the nextGender and nextAge slots;
                const prevDemo = this.getSelectedDemographic(tagId);
                newDemo.gender = prevDemo.gender;
                newDemo.age = prevDemo.age;
                newDemo.nextGender = gender;
                newDemo.nextAge = age;
            }
        }
        selectedDemographic[tagId] = newDemo;

        // Ask stores to load missing values.
        // And change our state when done.
        const callback = () => (
            this.setState({ selectedDemographic })
        );
        this.props.loadTagForDemographic(tagId, gender, age, callback);
    }

    onSendResultsEmail(email, tagId, callback) {
        const [gender, age] = this.getSelectedDemographic(tagId);
        // Skip the left, or worst, thumb.
        const [, bestThumb, goodThumbs] = this.getLeftRightRest(tagId, gender, age);
        const fourThumbs = _.flatten([bestThumb, goodThumbs]).slice(0, 4);
        let i = 0;
        while (fourThumbs.length < 4) {
            // Repeat until the required number is set.
            fourThumbs.push(fourThumbs[i]);
            i += 1;
        }
        this.props.sendResultsEmail(
            email, tagId, gender, age, fourThumbs, callback);
    }

    onSendClipResultsEmail(email, tagId, callback) {
        const [gender, age] = this.getSelectedDemographic(tagId);
        this.props.sendClipResultsEmail(email, tagId, gender, age, callback);
    }

    onThumbnailClick(overlayTagId, overlayThumbnailId, ...rest) {
        this.setState({ overlayTagId, overlayThumbnailId });
        TRACKING.sendEvent(this, rest, !!this.state.overlayTagId);
    }

    onOverlayThumbnailNext(e) {
        e.preventDefault();
        const overlayThumbnailId = this.getOverlayThumbnailId(+1);
        this.setState({ overlayThumbnailId });
    }

    onOverlayThumbnailPrev(e) {
        e.preventDefault();
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
            tag.thumbnail_ids.forEach((thumbnailId) => {
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
        return { left, right, rest, more };
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
        return { left, right, rest, more: [] };
    }

    // Return array of gender, age enum array based
    // on state of collection for a demo dropdown.
    getDemoOptionArray(tagId) {
        const tag = this.props.stores.tags[tagId];
        if (tag.tag_type === UTILS.TAG_TYPE_IMAGE_COL) {
            // All factor posibilities are available for an image coll.
            return UTILS.productOfArrays(
                _.values(UTILS.FILTER_GENDER_COL_ENUM),
                _.values(UTILS.FILTER_AGE_COL_ENUM)
            ).sort();
        }
        const video = this.props.stores.videos[tag.video_id];
        const demos = this.hasClips(tagId) ?
            video.demographic_clip_ids :
            video_demographic_thumbnails;
        if (demos.length) {
            return (demo => (
                [
                    UTILS.FILTER_GENDER_COL_ENUM[demo.gender],
                    UTILS.FILTER_AGE_COL_ENUM[demo.age],
                ]
            )).sort();
        }
        return [[0, 0]];
    }

    getSelectedDemographic(tagId) {
        if (this.state.selectedDemographic[tagId]) {
            return this.state.selectedDemographic[tagId];
        }
        return { gender:0, age: 0 };
    }

    // Gets the Thumbnail resource for the
    // current demographic for a collection for a thumbnail id.
    getThumbnail(tagId, thumbnailId) {
        return this.getThumbnailMap(tagId)[thumbnailId];
    }

    // Get all the Thumbnail resources for the
    // current demographic for a collection as map of id to thumbnail.
    getThumbnailMap(tagId) {
        const { gender, age } = this.state.selectedDemographic[tagId];
        const tag = this.props.stores.tags[tagId];
        const thumbnails = this.props.stores.thumbnails[gender][age];
        return _.pick(thumbnails, tag.thumbnail_ids);
    }

    // Get the current thumbnail index or 0 if no id is set.
    getOverlayThumbnailIndex() {
        const { thumbnails } = this.getSortedContents();
        if (!this.state.overlayThumbnailId) {
            return 0;
        }
        return _.findIndex(thumbnails, t => (
            t.thumbnail_id === this.state.overlayThumbnailId));
    }

    // Get the thumbnail with +/- change from the current.
    getOverlayThumbnailId(change) {
        const { thumbnails } = this.getSortedContents();
        const oldIndex = this.getOverlayThumbnailIndex();
        const newIndex = (oldIndex + change + thumbnails.length) % thumbnails.length;
        return thumbnails[newIndex].thumbnail_id;
    }

    // Get lists of thumbnails and clips sorted by score descending.
    getSortedContents() {
        const tagId = this.state.overlayTagId;
        const { gender, age } = this.getSelectedDemographic(tagId);
        const thumbnails = _(this.getLeftRightRest(tagId, gender, age))
            .flatten()
            .sortedUniqBy('thumbnail_id')
            .value();
        // Deal with when the best and worst is the same.
        if (thumbnails[0] === thumbnails[1]) {
            thumbnails.shift();
        }
        const clips = [];
        return { thumbnails, clips };
    }

    hasClip(tagId) {
        const tag = this.props.stores.tags[tagId];
        if (tag.tag_type !== UTILS.TAG_TYPE_VIDEO_COL) {
            return false;
        }
        const video = this.prors.stores.videos[tag.video_id];
        return !!video.demographic_clip_ids.length;
    }

    renderOverlayComponent() {
        // If no tag, the overlay hasn't been opened.
        if (!this.state.overlayTagId) {
            return null;
        }
        const tagId = this.state.overlayTagId;
        const tag = this.props.stores.tags[tagId];

        // Get score sorted thumbnails for collection.
        const { gender, age } = this.getSelectedDemographic(tagId);

        // Begin loading features.
        this.props.loadFeaturesForTag(tagId, gender, age);

        // Get the same sort of thumbnails that the collections uses.
        const { thumbnails } = this.getSortedContents();
        const thumbnailIndex = this.getOverlayThumbnailIndex();

        // Find lift for the shown thumbnail.
        const lifts = this.props.stores.lifts[gender][age][tagId];
        const lift = lifts[this.state.overlayThumbnailId] || 0;

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
                thumbnails={thumbnails}
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
        const tag = this.props.stores.tags[tagId];
        if (tag.tag_type === UTILS.TAG_TYPE_IMAGE_COL) {
            return this.renderImageCollectionComponent(tagId);
        }

        const alt = this.renderAlternateVideoComponent(tagId);
        if (alt) {
            return alt;
        }

        if (this.hasClip(tagId)) {
            return this.renderClipCollectionComponent(tagId);
        }
        return this.renderVideoCollectionComponent(tagId);
    }

    renderAlternateVideoComponent(tagId) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];

        if (!['submit', 'processing', 'failed'].includes(video.state)) {
            return false;
        }
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
        }
    }

    renderClipCollectionComponent(tagId) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];

        const isRefiltering = video.state === 'processing';
        const [gender, age] = this.getSelectedDemographic(tagId);

        const shareUrl = (tagId in this.props.stores.tagShares) ?
            this.props.stores.tagShares[tagId].url : undefined;

        const clipDemo = UTILS.findDemographicObject(
            video.demographic_clip_ids, gender, age);
        const clipIds = clipDemo.clip_ids;
        const clips = _.pick(this.props.stores.clips[gender][age], clipIds)
        // TODO sort
        const sortedClips = clips;

        // The assumption that thumbnails stores are set up
        // demographically for clip videos is problematic, so
        // just use the defaults.
        // TODO revisit the way we map clip thumbs.
        const thumbnails = this.props.stores.thumbnails[0][0];

        return (
            <ClipCollection
                key={tagId}
                title={tag.name}
                videoId={video.video_id}
                tagId={tagId}
                clip={sortedClips}
                clipThumbs={clipThumbMap}
                onDemographicChange={this.onDemographicChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={[gender, age]}
                infoPanelOnly={this.props.infoPanelOnly}
                onDeleteCollection={this.props.onDeleteCollection}
                socialClickHandler={this.props.socialClickHandler}
                shareUrl={shareUrl}
                sendResultsEmail={sendClipResultEmail}
                clipLiftMap={clipLiftMap}
                setTooltipText={this.props.setTooltipText}
                isRefiltering={isRefiltering}
                timeRemaining={video.estimated_time_remaining}
            />
       );
    }

    renderImageCollectionComponent(tagId) {
        const tag = this.props.stores.tags[tagId];

        const { gender, age } = this.getSelectedDemographic(tagId);
        const { left, right, more } = this.getLeftRightRest(tagId, gender, age);

        const thumbLiftMap = !_.isEmpty(this.props.stores.lifts[gender][age][tagId]) ?
            this.props.stores.lifts[gender][age][tagId] : {};

        const shareUrl = (tagId in this.props.stores.tagShares) ?
            this.props.stores.tagShares[tagId].url : undefined;

        const thumbnailsLength = tag.thumbnail_ids.length;

        return (
            <ImageCollection
                key={tagId}
                tagId={tagId}
                demographicOptions={this.getDemoOptionArray(tagId)}
                infoPanelOnly={this.props.infoPanelOnly}
                isMine={this.props.isMine}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                selectedDemographic={[gender, age]}
                shareUrl={shareUrl}
                smallThumbnails={smallThumbnails}
                thumbnailsLength={thumbnailsLength}
                thumbLiftMap={thumbLiftMap}
                title={tag.name}
                onThumbnailClick={this.onThumbnailClick}
                onDemographicChange={this.onDemographicChange}
                onDeleteCollection={this.props.onDeleteCollection}
                onSocialClick={this.props.onSocialClick}
                onSendResultsEmail={this.onSendResultsEmail}
                onSetTooltipText={this.props.setTooltipText}
            />
        );
    }

    renderVideoCollectionComponent(tagId) {

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

        const clipDemo = UTILS.findDemographicObject(
            video.demographic_clip_ids, gender, age);
        let thumbArrays;
        let clipIds = [];
        let clips = {};
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

        const sendResultsEmail = _.isEmpty(clips) ?
            this.sendResultsEmail :
            this.sendGifResultsEmail;

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
                clipIds={clipIds}
                clipThumbs={clipThumbs}
                getGifClipPosition={this.getGifClipPosition}
                onDemographicChange={this.onDemographicChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={demo}
                infoPanelOnly={this.props.infoPanelOnly}
                onDeleteCollection={this.props.onDeleteCollection}
                socialClickHandler={this.props.socialClickHandler}
                shareUrl={shareUrl}
                sendResultsEmail={sendResultsEmail}
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
                deleteVideo={this.props.onDeleteCollection}
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
                deleteVideo={this.props.onDeleteCollection}
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
