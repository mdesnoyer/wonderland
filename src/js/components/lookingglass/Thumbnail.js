// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var Thumbnail = React.createClass({
	getInitialState: function () {
		return {
			checked: this.props.thumbnail.enabled || false
		};
	},
	handleClick: function(e) {
		alert('TODO');
	},
	render: function() {
		var additionalClass = 'tag is-' + this.props.videoStateMapping + ' is-medium wonderland-thumbnail__score';
		return (
			<figure
				className="wonderland-thumbnail image is-16by9"
				data-raw-neonscore={this.props.thumbnail.rawNeonScore}
				data-cooked-neonscore={this.props.thumbnail.cookedNeonScore}
				data-type={this.props.thumbnail.type}
				data-enabled={this.props.thumbnail.enabled}
			>
				<img className="wonderland-thumbnail__image" src={ this.props.thumbnail.url } alt="TODO" title="TODO" />
				<figcaption className="wonderland-thumbnail__caption">
					<span className={ additionalClass } title="NeonScore">{ this.props.thumbnail.cookedNeonScore }</span>
					<input className="wonderland-thumbnail__enabled" onClick={ this.handleClick } checked={ this.state.checked } type="checkbox" />
				</figcaption>
			</figure>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Thumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
