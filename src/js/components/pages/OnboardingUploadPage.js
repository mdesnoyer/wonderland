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
import Countdown from '../wonderland/Countdown';

import OnboardingSlides from '../knave/OnboardingSlides';
import OnboardingEmail from '../knave/OnboardingEmail';
import OnboardingTutorial from '../knave/OnboardingTutorial';
import OverLayMessage from '../knave/OverLayMessage';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const OnboardingUploadPage = React.createClass({
    mixins: [AjaxMixin],

    contextTypes: {
        router: PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            onboardingState: 'initial', // intial // processing // done
            estimatedTimeRemaining: null,
            videoId: null,
            overlayCode: false
        }
    },
    componentWillMount: function() {
        if (!SESSION.active()) {
            this.context.router.push(UTILS.DRY_NAV.DEMO.URL)
        }
    },

    onClick: function(e) {
        this.refs.uploadForm.toggleOpen(e);
    },

    render: function() {
        var content; 
        switch(this.state.onboardingState) {
            case 'initial':
                content = ( 
                        <div className="xxUpload">
                            <UploadForm
                                onboardingAction={this.onboardingAction}
                                ref="uploadForm"
                            />
                            <div
                                className="xxUploadButton-help"
                                onClick={this.onClick}
                            >
                                <span className="xxUploadButton-helpCircle"></span>
                                <span className="xxUploadButton-helpLine"></span>
                                <p>{ T.get('copy.onboarding.uploadHelpText')}</p>
                            </div>  
                        </div>
                );
                break; 
            case 'processing':
                content = (
                        <div>
                            <OnboardingSlides />
                            <OnboardingEmail videoId={this.state.videoId}/>
                            <Countdown seconds={this.state.estimatedTimeRemaining}/>
                        </div>
                );
                break; 
            case 'done':
                content = <OnboardingTutorial onClose={this.onTutorialClose} isGuest={false} />;
                break; 
        }
        return (
            <BasePage title={T.get('copy.myCollections.title')} onboardingState={this.state.onboardingState}>
                    {
                        this.state.overlayCode ? (
                                <OverLayMessage  
                                    overlayCode={this.state.overlayCode} 
                                    overlayReset={this.handleOverlayReset}
                                />
                        ) : null
                    }
                {content}
            </BasePage>
        );
    },
    handleOverlayReset: function() {
        this.setState({overlayCode: false});
    },
    onTutorialClose: function(e) {
        e.preventDefault();
        this.context.router.replace(UTILS.DRY_NAV.COLLECTIONS.URL);
    },
    onboardingAction: function(type, id) {
        if (type === 'video') {
            this.setState({
                onboardingState: 'processing',
                videoId: id
            },  function() {
                this.getVideoStatus(id);
            });
        }
        else if (type === 'col') {
            this.setState({onboardingState: 'done'});
        }
    },
    getVideoStatus: function(videoId) {
        var self = this;
        self.GET('videos', {data: {video_id: videoId, fields: UTILS.VIDEO_FIELDS}})
            .then(function(res) {
                // if over the max duration throw error because failed state will take longer to generate
                if (res.videos[0].duration > UTILS.MAX_VIDEO_SIZE) {
                    self.setState({ 
                        onboardingState: 'initial',
                        overlayCode: 'VideoLength'
                    });
                    return
                }
                if (!self.state.estimatedTimeRemaining & res.videos[0].state === 'processing') {
                    var timeRemaining = res.videos[0].estimated_time_remaining;
                    self.setState({
                        estimatedTimeRemaining: timeRemaining
                    },  function() {
                        setTimeout(function() {
                            self.getVideoStatus(videoId);
                        }, 5000)
                    });
                }
                else if (res.videos[0].state === 'processed') {
                   self.setState({ onboardingState: 'done' }); 
                } 
                else if (res.videos[0].state === 'failed') {
                    console.log(res)
                    self.setState({ 
                        onboardingState: 'initial',
                        overlayCode: 'GeneralVideo'
                    });
                } 
                else {
                    setTimeout(function() { 
                        self.getVideoStatus(videoId);
                    }, 30000);
                }    
            })
            .catch(function(err) {
                self.setState({ 
                     onboardingState: 'initial',
                     overlayCode: 'GeneralVideo'
                 });
            });
    }
})


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default OnboardingUploadPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
