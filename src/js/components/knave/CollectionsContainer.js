import React, { PropTypes } from 'react';
import _ from 'lodash';

import ClipCollection from './ClipCollection';
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
    onSetSidebarContent: PropTypes.func.isRequired,

    // Is this a share view?
    isViewOnly: PropTypes.bool.isRequired,

    // Enables custom tooltip
    onSetTooltipText: PropTypes.func,

    // Defaults to Function to delete/hide a collection from
    // both the backend and frontend display
    onDeleteCollection: PropTypes.func,

    // ClickHandler for social sharing buttons
    onSocialShare: PropTypes.func,

    // Allows a collection to send results email
    onSendResultEmail: PropTypes.func,
    onSendClipResultEmail: PropTypes.func,

    // Functions to enable disable serving of thumbnail
    onToggleThumbnailEnabled: PropTypes.func,
};

const defaultProps = {
    onDeleteCollection: Function.protoype,
    onSendClipResultEmail: Function.protoype,
    onSendResultEmail: Function.prototype,
    onSetTooltipText: Function.prototype,
    onSocialShare: Function.prototype,
    onToggleThumbnailEnabled: Function.prototype,
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
        this.onSendResultEmail = this.onSendResultEmail.bind(this);
        this.onSendClipResultEmail = this.onSendClipResultEmail.bind(this);
        this.onThumbnailClick = this.onThumbnailClick.bind(this);
        this.onOverlayThumbnailNext = this.onOverlayThumbnailNext.bind(this);
        this.onOverlayThumbnailPrev = this.onOverlayThumbnailPrev.bind(this);
        this.onOverlayClose = this.onOverlayClose.bind(this);
        this.onOpenLearnMore = props.onSetSidebarContent.bind(null, 'learnMore');
    }

    // This enables queueing of the demographic selector.
    componentWillReceiveProps(nextProps) {
        // If the next props have a queued selected
        // demographic (in indexes 2-3), then move the queued selected
        // to the selected one.
        const selectedDemographic = this.getSelectedDemographic();
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
        const selectedDemographic = this.state.selectedDemographic;
        selectedDemographic[tagId] = newDemo;

        // Ask stores to load missing values.
        // And change our state when done.
        const callback = () => (
            this.setState({ selectedDemographic })
        );
        this.props.loadTagForDemographic(tagId, gender, age, callback);
    }

    onSendResultEmail(email, tagId, callback) {
        const { gender, age } = this.getSelectedDemographic(tagId);
        // Skip the left, or worst, thumb.
        const [, bestThumb, goodThumbs] = this.getLeftRightRest(tagId, gender, age);
        const fourThumbs = _.flatten([bestThumb, goodThumbs]).slice(0, 4);
        let i = 0;
        while (fourThumbs.length < 4) {
            // Repeat until the required number is set.
            fourThumbs.push(fourThumbs[i]);
            i += 1;
        }
        this.props.onSendResultEmail(
            email, tagId, gender, age, fourThumbs, callback);
    }

    onSendClipResultEmail(email, tagId, callback) {
        const { gender, age } = this.getSelectedDemographic(tagId);
        this.props.onSendClipResultEmail(email, tagId, gender, age, callback);
    }

    onThumbnailClick(overlayTagId, overlayThumbnailId) {
        this.setState({ overlayTagId, overlayThumbnailId });
        TRACKING.sendEvent(this, arguments, !!this.state.overlayTagId);
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
        if (!left) {
            debugger;
        }

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

    // Return array of gender, age enum array based
    // on state of collection for a demo dropdown.
    getDemoOptionArray(tagId) {
        const tag = this.props.stores.tags[tagId];
        if (tag.tag_type === UTILS.TAG_TYPE_IMAGE_COL) {
            // All factor posibilities are available for an image coll.
            return UTILS.productOfArrays(
                _.values(UTILS.FILTER_GENDER_COL_ENUM),
                _.values(UTILS.FILTER_AGE_COL_ENUM)
            ).sort().map(i => ({ gender: i[0], age: i[1] }));
        }
        const video = this.props.stores.videos[tag.video_id];
        const demos = this.hasClip(tagId) ?
            video.demographic_clip_ids :
            video.demographic_thumbnails;
        if (demos.length) {
            return demos.map(demo => ([
                UTILS.FILTER_GENDER_COL_ENUM[demo.gender],
                UTILS.FILTER_AGE_COL_ENUM[demo.age],
            ])).sort().map(i => ({ gender: i[0], age: i[1] }));
        }
        return [{ gender: 0, age: 0 }];
    }

    getSelectedDemographic(tagId) {
        if (this.state.selectedDemographic[tagId]) {
            return this.state.selectedDemographic[tagId];
        }
        return { gender: 0, age: 0 };
    }

    // Gets the Thumbnail resource for the
    // current demographic for a collection for a thumbnail id.
    getThumbnail(tagId, thumbnailId) {
        return this.getThumbnailMap(tagId)[thumbnailId];
    }

    // Get all the Thumbnail resources for the
    // current demographic for a collection as map of id to thumbnail.
    getThumbnailMap(tagId) {
        const { gender, age } = this.getSelectedDemographic(tagId);
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
            .values()
            .concat()
            .flatten()
            .uniqBy('thumbnail_id')
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
        const video = this.props.stores.videos[tag.video_id];
        const demo = video.demographic_clip_ids;
        return demo.length > 0 &&
            demo.find(d => d.clip_ids.length) !== undefined;
    }

    renderOverlay() {
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

    renderCollection(tagId) {
        const tag = this.props.stores.tags[tagId];
        if (tag.tag_type === UTILS.TAG_TYPE_IMAGE_COL) {
            return this.renderImageCollection(tagId);
        }

        const alt = this.renderAlternateVideoComponent(tagId);
        if (alt) {
            return alt;
        }
        if (this.hasClip(tagId)) {
            return this.renderClipCollection(tagId);
        }
        return this.renderVideoCollection(tagId);
    }

    renderAlternateVideoComponent(tagId) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];

        if (!['submit', 'processing', 'failed'].includes(video.state)) {
            return false;
        }
        if (video.state === 'submit') {
            return this.renderVideoProcessing(tagId);
        }
        if (video.state === 'failed' && !video.demographic_clip_ids.length) {
            return this.renderVideoFailed(tagId);
        }
        if (tag.thumbnail_ids.length === 1) {
            // if it's just the default thumbnail, we have a video
            // that's still processing.
            const tid = tag.thumbnail_ids[0];
            const thumbnail = this.props.stores.thumbnails[0][0][tid];
            // we can't find the thumbnail in our stores, meaning it's
            // older or the default just hasn't showed up yet.
            if (!thumbnail || thumbnail.type === 'default') {
                return this.renderVideoProcessing(tagId);
            }
        }
        if (tag.thumbnail_ids.length === 0) {
            return this.renderVideoProcessing(tagId);
        }
        return null;
    }

    renderClipCollection(tagId) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];

        const isRefiltering = video.state === 'processing';
        const { gender, age } = this.getSelectedDemographic(tagId);

        const shareUrl = (tagId in this.props.stores.tagShares) ?
            this.props.stores.tagShares[tagId].url : undefined;

        const clipDemo = UTILS.findDemographicObject(
            video.demographic_clip_ids, gender, age);
        const clipIds = clipDemo.clip_ids;
        const clipMap = _.pick(this.props.stores.clips[gender][age], clipIds);
        const sortedClips = _(clipMap)
            .orderBy(['neon_score'], ['desc'])
            .values()
            .value();

        // The assumption that thumbnails stores are set up
        // demographically for clip videos is problematic, so
        // just use the defaults.
        // TODO revisit the way we map clip thumbs.
        const thumbnailIds = _.map(clipMap, 'thumbnail_id');
        const thumbnailMap = _.pick(this.props.stores.thumbnails[0][0], thumbnailIds);
        const bestScore = sortedClips[0].neon_score;
        const objectLiftMap = _.mapValues(clipMap, clip => (
            clip.neon_score / bestScore) - 1
        );

        return (
            <ClipCollection
                key={tagId}
                title={tag.name}
                videoId={video.video_id}
                tagId={tagId}
                clips={sortedClips}
                thumbnailMap={thumbnailMap}
                onDemographicChange={this.onDemographicChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={{ gender, age }}
                onDeleteCollection={this.props.onDeleteCollection}
                onSocialShare={this.props.onSocialShare}
                shareUrl={shareUrl}
                onSendResultEmail={this.onSendClipResultEmail}
                objectLiftMap={objectLiftMap}
                onSetTooltipText={this.props.onSetTooltipText}
                isRefiltering={isRefiltering}
                timeRemaining={video.estimated_time_remaining}
                isViewOnly={this.props.isViewOnly}
            />
       );
    }

    renderImageCollection(tagId) {
        const tag = this.props.stores.tags[tagId];

        const { gender, age } = this.getSelectedDemographic(tagId);

        const { left, right, rest } = this.getLeftRightRest(tagId, gender, age);
        const thumbnailsLength = tag.thumbnail_ids.length;
        const thumbLiftMap = !_.isEmpty(this.props.stores.lifts[gender][age][tagId]) ?
            this.props.stores.lifts[gender][age][tagId] : {};

        const shareUrl = (tagId in this.props.stores.tagShares) ?
            this.props.stores.tagShares[tagId].url : undefined;

        return (
            <ImageCollection
                key={tagId}
                tagId={tagId}
                title={tag.name}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                smallThumbnails={rest}
                thumbnailsLength={thumbnailsLength}
                objectLiftMap={thumbLiftMap}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={{ gender, age }}
                shareUrl={shareUrl}
                onThumbnailClick={this.onThumbnailClick}
                onDemographicChange={this.onDemographicChange}
                onDeleteCollection={this.props.onDeleteCollection}
                onSocialShare={this.props.onSocialShare}
                onSendResultEmail={this.onSendResultEmail}
                onSetTooltipText={this.props.onSetTooltipText}
                isViewOnly={this.props.isViewOnly}
            />
        );
    }

    renderVideoCollection(tagId) {
        const tag = this.props.stores.tags[tagId];
        const video = this.props.stores.videos[tag.video_id];

        const isRefiltering = video.state === 'processing';

        const { gender, age } = this.getSelectedDemographic(tagId);

        const { left, right, rest, more } = this.getLeftRightRest(tagId, gender, age);
        const smallThumbnails = rest;
        const badThumbnails = more;
        const goodThumbnails = _.flatten([right, smallThumbnails]);
        const thumbLiftMap = !_.isEmpty(this.props.stores.lifts[gender][age][tagId]) ?
            this.props.stores.lifts[gender][age][tagId] : {};

        const shareUrl = (tagId in this.props.stores.tagShares) ?
            this.props.stores.tagShares[tagId].url : undefined;


        return (
            <VideoCollection
                key={tagId}
                tagId={tagId}
                videoId={video.video_id}
                title={tag.name}
                leftFeatureThumbnail={left}
                rightFeatureThumbnail={right}
                goodThumbnails={goodThumbnails}
                smallThumbnails={smallThumbnails}
                smallBadThumbnails={badThumbnails}
                demographicOptions={this.getDemoOptionArray(tagId)}
                objectLiftMap={thumbLiftMap}
                selectedDemographic={{ gender, age }}
                shareUrl={shareUrl}
                isRefiltering={isRefiltering}
                timeRemaining={video.estimated_time_remaining}
                onDeleteCollection={this.props.onDeleteCollection}
                onDemographicChange={this.onDemographicChange}
                onSendResultEmail={this.onSendResultEmail}
                onSetTooltipText={this.props.onSetTooltipText}
                onSocialShare={this.props.onSocialShare}
                onThumbnailClick={this.onThumbnailClick}
                onToggleThumbnailEnabled={this.props.onToggleThumbnailEnabled}
                isViewOnly={this.props.isViewOnly}
            />
       );
    }

    renderVideoProcessing(tagId) {
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

    renderVideoFailed(tagId) {
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
                {this.renderOverlay()}
                <ul>
                    {
                    this.props.shownIds.map(tagId => (
                        this.renderCollection(tagId)))
                    }
                </ul>
            </div>
        );
    }
}

CollectionsContainer.propTypes = propTypes;
CollectionsContainer.defaultProps = defaultProps;

export default CollectionsContainer;
