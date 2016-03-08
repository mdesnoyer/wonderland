// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

class ThumbnailRanked extends React.Component {
	render() {
		return (
			<figure>
				<img src={ this.props.src }></img>
				<figcaption>{ this.props.neonscore }</figcaption>
			</figure>
		);
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ThumbnailRanked;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
