 'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import UTILS from '../../modules/utils';
import RENDITIONS from '../../modules/renditions';
import TRACKING from '../../modules/tracking';

import { SendActions } from '../../stores/CollectionStores';
// import { SpringGrid } from 'react-stonecutter';
// import { CSSGrid, SpringGrid, measureItems, makeResponsive } from 'react-stonecutter';
import { CSSGrid, layout } from 'react-stonecutter';

// const Grid = measureItems(SpringGrid);

// const Grid = makeResponsive(measureItems(CSSGrid), {
//   maxWidth: 1080,
//   minPadding: 100
// });


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
				<li>
				<video  key={tagId} autolay preload="auto">
				  <source src={clipURL} type="video/mp4" />
				</video>
				</li>
			);
	},

	getImageComponent: function(tagId) {
		const tag = this.props.stores.tags[tagId];
		const testThumb = this.props.stores.tags[tagId].thumbnail_ids[0];
		// debugger
		return <li><img key={tagId} src={this.props.stores.thumbnails[0][0][testThumb].renditions[3].url} alt="Smiley face"  /></li>;
	},

    render: function() {
        const collections = this.props.shownIds.map(tagId => {
            return this.getMediaComponent(tagId);
        });

        // return (
        //     <SpringGrid
        //       component="ul"
        //       columns={4}
        //       columnWidth={420}
        //       gutterWidth={5}
        //       gutterHeight={5}
        //       itemHeight={200}
        //       springConfig={{ stiffness: 170, damping: 26 }}
        //     >
        //     	{collections}
        //     </SpringGrid>
        // );
     //    return (
     //        <Grid
		   //    component="ul"
		   //    columns={4}
		   //    columnWidth={420}
		   //    gutterWidth={5}
		   //    gutterHeight={5}
		   //    itemHeight={200}
     //        >
     // 			{collections}
     //        </Grid>
    	// );
    	return (
    		<CSSGrid
    		  component="ul"
    		  columns={5}
    		  columnWidth={150}
    		  gutterWidth={5}
    		  gutterHeight={5}
    		  layout={layout.pinterest}
    		  duration={800}
    		  easing="ease-out"
    		>
    		{collections}
    		</CSSGrid>
		)

    },
})

export default CollectionsFactory 
