// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import TimeAgoWrapper from '../core/TimeAgoWrapper';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoInfoTable = React.createClass ({
	render: function() {
		return (
			<table className="table is-bordered is-striped is-narrow">
				<tbody>
					<tr>
						<th>ID</th>
						<td>{this.props.videoId}</td>
					</tr>
					<tr>
						<th>Duration</th>
						<td>{Math.floor(this.props.duration)}<abbr title="seconds">s</abbr></td>
					</tr>
					{/*<tr>
						<th>Created</th>
						<td><TimeAgoWrapper date={ this.props.created } /></td>
					</tr>
					<tr>
						<th>Updated</th>
						<td><TimeAgoWrapper date={this.props.updated} /></td>
					</tr>*/}
					<tr>
						<th>Published</th>
						<td><TimeAgoWrapper date={this.props.publishDate} /></td>
					</tr>
					<tr>
						<th>Original</th>
						<td><a href={this.props.url} target="_blank">Source</a></td>
					</tr>
				</tbody>
			</table>
			);
	}

});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoInfoTable

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
