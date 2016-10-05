 'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import UTILS from '../../modules/utils';
import RENDITIONS from '../../modules/renditions';
import TRACKING from '../../modules/tracking';

import { SendActions } from '../../stores/CollectionStores';


const CollectionsFactory = React.createClass({

	propTypes: {
	    shownIds: PropTypes.array.isRequired,
	    stores: PropTypes.object.isRequired,
	},

	getInitialState: function() {
	    return {
	        selectedDemographic: {},
	        nextSelectedDemographic: {},
	        overlayTagId: null,
	        overlayThumbnailId: null
	    };
	},

	getMediaComponent: function(tagId) {

	    const collection = this.props.stores.tags[tagId];

	    if (collection.thumbnail_ids.length < 1 && collection.tag_type !== 'video') {
	        return <div key={tagId}/>;
	    }
	    switch(collection.tag_type) {
	        case UTILS.TAG_TYPE_IMAGE_COL:
	            return this.getImageComponent(tagId);
	        case UTILS.TAG_TYPE_VIDEO_COL:
	        	return this.getVideoComponent(tagId);
	    }
	    // TODO? try-catch: if components fail prop validation, catch
	    // and return an error component.
	    return <div key={tagId}/>;
	},

	getVideoComponent: function(tagId) {
		const tag = this.props.stores.tags[tagId];
		const video = this.props.stores.videos[tag.video_id];

		if (video.demographic_clip_ids[0].clip_ids.length < 1) {
			return <img key={tagId} src={video.demographic_thumbnails[0].thumbnails[0].url} alt="Smiley face" />;
		}
		const clip = video.demographic_clip_ids[0].clip_ids[0]; 
		const clipURL = this.props.stores.clips[0][0][clip].url;
			return (
				<video className="testflexvideo" key={tagId} height="420" width="420" autolay preload="auto">
				  <source src={clipURL} type="video/mp4" />
				</video>
			);
	},

	getImageComponent: function(tagId) {
		const tag = this.props.stores.tags[tagId];
		const testThumb = this.props.stores.tags[tagId].thumbnail_ids[0];
		return <img className="testfleximage" key={tagId} src={this.props.stores.thumbnails[0][0][testThumb]} alt="Smiley face"  />;
	},

    render: function() {
        const collections = this.props.shownIds.map(tagId => {
            return this.getMediaComponent(tagId);
        });

        return (
            <div>
                <ul className="testflex" >{collections}</ul>
            </div>
        );
    },
})

export default CollectionsFactory 
