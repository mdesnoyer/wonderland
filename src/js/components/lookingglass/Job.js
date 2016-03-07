// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import Thumbnails from './Thumbnails';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

class Job extends React.Component {
	render() {
		return (
			<section className="section">
				<div className="container">
					<h1 className="title">Job: { this.props.params.jobId }</h1>
					<p>TODO</p>
					<Thumbnails />
				</div>
			</section>
		);
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Job;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
