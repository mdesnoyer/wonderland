// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import _ from 'lodash';

import AjaxMixin from '../../mixins/Ajax';
import RENDITIONS from '../../modules/renditions';
import SESSION from '../../modules/session';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import { windowOpen, objectToGetParams } from '../../modules/sharing';

import BasePage from './BasePage';
import UploadForm from '../knave/UploadForm';
import OnboardingSlides from '../knave/OnboardingSlides';
import OnboardingEmail from '../knave/OnboardingEmail';
import OnboardingTutorial from '../knave/OnboardingTutorial';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const OnboardingUploadPage = React.createClass({
	mixins: [AjaxMixin],

	contextTypes: {
	    router: PropTypes.object.isRequired
	},

	getInitialState: function() {
		return {
			onboardingState: 'done' // intial // processing // done
		}
	},

	render: function() {
		var content; 
		switch(this.state.onboardingState) {
			case 'initial':
				content = (	
						<div className="xxUpload">
							<UploadForm onboardingAction={this.onboardingAction}/>
							<div className="xxUploadButton-help">
            					<span className="xxUploadButton-helpCircle"></span>
            					<span className="xxUploadButton-helpLine"></span>
            					<p>SUCK IT </p>
            				</div>	
						</div>
				);
				break; 
			case 'processing':
				content = <div><OnboardingSlides /><OnboardingEmail /></div>;
				break; 
			case 'done':
				content = <OnboardingTutorial onClose={this.onTutorialClose} isGuest={false} />;
				break; 
		}
		return (
			<BasePage title={T.get('copy.myCollections.title')} onboardingState={this.state.onboardingState}>
				{content}
			</BasePage>
		);
	},
	onTutorialClose: function(e) {
	    e.preventDefault();
	    alert('this works');
	    this.context.router.replace('/collections/');
	},
	onboardingError: function() {
		alert('this works');
	},
	onboardingAction: function(type, id) {
		
		alert('this works');
		// this.context.router.replace(UTILS.DRY_NAV.SIGNIN.URL);
	},


})


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingUploadPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -