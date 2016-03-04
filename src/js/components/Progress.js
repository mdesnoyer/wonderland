import React from 'react';

var Progress = React.createClass({
	render: function() {
		return (
			<section>
				<big>{ this.props.message }</big>
				<progress value={ this.props.value } max="100"></progress>
			</section>
		);
	}
});

export default Progress;