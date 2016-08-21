'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import SiteHeader from '../wonderland/SiteHeader';
import CollectionsContainer from '../knave/CollectionsContainer';
import SiteFooter from '../wonderland/SiteFooter';

import {
    TagStore,
    VideoStore,
    ThumbnailStore,
    LiftStore,
    FeatureStore,
    ThumbnailFeatureStore,
    LoadActions,
    Dispatcher } from '../../stores/CollectionStores.js';

// TODO Factor this from here and CollectionsMainPage.
const getStateFromStores = () => {

    return {
        // These are stores of tag, video, thumbnail resources.
        //
        // Map of tag id to tag.
        tags: TagStore.getAll(),

        // Map of video id to video.
        videos: VideoStore.getAll(),

        // Map of gender, age, thumbnail id to thumbnail.
        thumbnails: ThumbnailStore.getAll(),

        // Map of gender, age, tag id to map of thumb id to lift float
        //
        // Note: This assumes the tag has only one base thumbnail
        // for comparisons: for a video with a default thumbnail,
        // it is the default thumbnail. In all other cases, it's
        // the worst thumbnail.
        lifts: LiftStore.getAll(),

        // Map of feature key to feature name
        features: FeatureStore.getAll(),

        // Map of gender, age, thumbnail id to array of feature key
        // sorted by value descending.
        thumbnailFeatures: ThumbnailFeatureStore.getAll()
    };
};

const ViewSharedCollectionPage = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentWillMount: function() {
        // Register our update function with the store dispatcher.
        Dispatcher.register(this.updateState);
        LoadActions.loadByShareToken();
    },

    updateState: function() {
        this.setState(getStateFromStores());
    },

    render: function() {
        return (
            <main className='xxPage'>
                <SiteHeader />
                <CollectionsContainer
                    displayIds={[]}
                    stores={{
                        tags: this.state.tags,
                        videos: this.state.videos,
                        thumbnails: this.state.thumbnails,
                        lifts: this.state.lifts,
                        thumbnailFeatures: this.state.thumbnailFeatures,
                        features: this.state.features
                    }}
                    loadTagForDemographic={LoadActions.loadTagForDemographic}
                    loadFeaturesForTag={LoadActions.loadFeaturesForTag}
                    loadThumbnails={LoadActions.loadThumbnails}
                />
                <SiteFooter />
            </main>
        );
    }
});

export default ViewSharedCollectionPage;
