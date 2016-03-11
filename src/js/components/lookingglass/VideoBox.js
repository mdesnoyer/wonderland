// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//VIDEOBOX is a box that holds indivdual information about videos objects.
//These video boxes will be contained inside the VIDOES component
// example of what it could look like http://bulma.io/documentation/elements/box/
//Currently only video_id is shown. In future Picture and Score will be included

var VideoBox = React.createClass({
	render: function () {
		
		return(			
			<div className="box">
				{this.props.text}
			</div>
		);
	}
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoBox; 

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
