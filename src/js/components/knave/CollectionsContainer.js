// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import UTILS from '../../modules/utils';

import ImageCollection from './ImageCollection';
import VideoCollection from './VideoCollection';
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
    DeleteControl} from './InfoActionPanels';

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
        stores: PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {

            // List of tag ids to render.
            shownIds: [],

            // Map of tag id to integer index of gender, then age.
            // Uses FILTER_GENDER_COL_ENUM, FILTER_AGE_COL_ENUM.
            // By default, the demographic is [0,0] meaning gender=none, age=none.
            selectedDemographic: {}
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

        // List of right-hand side control components for
        // the content given type and session.
        const panels = [
            <InfoDemoLiftPanel
                tagId={collection.tag_id}
                title={collection.name}
                liftMap={this.props.stores.lifts[gender][age]}
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

        const video = this.props.stores.videos[collection.video_id];
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
            // Order by score, best to worst, then frame number for stability.
            .orderBy(['neon_score', 'frameno'], ['desc', 'asc'])
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
            .orderBy(['neon_score', 'frameno'], ['desc', 'asc'])
            .value();

        const panels = [
            <InfoDemoLiftPanel
                tagId={collection.tag_id}
                title={video.title}
                onDemographicChange={onDemoChange}
                demographicOptions={this.getDemoOptionArray(tagId)}
                selectedDemographic={[gender, age]}
                liftMap={this.props.stores.lifts[gender][age]}
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
    render: function() {
        const collections = this.state.shownIds.map(tagId => {
            return this.buildCollectionComponent(tagId);
        });
        return (<ul>{collections}</ul>);
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default CollectionsContainer;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
