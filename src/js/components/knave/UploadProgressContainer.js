import React, {PropTypes} from 'react';

import {
		MobileInitialDisplay,
		MobileLoadingDisplay,
		MobileSuccessDisplay,
		InitialDisplay,
		LoadingDisplay,
		SuccessDisplay
	} from './UploadDisplays'; 


var UploadProgressContainer = React.createClass({
	// propTypes: {
	// 	mode:, 
	// }
	render: function () {
		if(false) {
			return (
				<div>
				        {this.props.mode === 'initial' && <MobileInitialDisplay />}
				        {this.props.mode === 'loading' && <MobileLoadingDisplay />}
				        {this.props.mode === 'success' && <MobileSuccessDisplay />}
				</div>
			);	
		}
		else {
			return (
				<div>
				        {this.props.mode === 'initial' && <InitialDisplay />}
				        {this.props.mode === 'loading' && <LoadingDisplay />}
				        {this.props.mode === 'success' && <SuccessDisplay />}
				</div>	
			);
		}
	}
})

export default UploadProgressContainer



