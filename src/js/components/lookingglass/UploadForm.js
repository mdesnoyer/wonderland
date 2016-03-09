// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UploadForm = React.createClass({
	render: function() {
		return (
			<section>
				<form onSubmit={ this.submitForm }>
					<fieldset>
						<legend></legend>
						<label>URL</label>
						<input ref="url" type="text" defaultValue="ed" />
						<small>Error?</small>
						<button>Process</button>
						<small>Instructions, link to Terms</small>
					</fieldset>
				</form>
			</section>
		);
	}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default UploadForm;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
