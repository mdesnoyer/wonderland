import React from 'react';
import Helmet from 'react-helmet';

import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';

import SiteHeader from '../wonderland/SiteHeader';
import Countdown from '../wonderland/Countdown';
import OnboardingSlides from '../wonderland/OnboardingSlides';
import OnboardingEmail from '../wonderland/OnboardingEmail';
import VideoUploadForm from '../knave/VideoUploadForm';

export default React.createClass({
    mixins: [AjaxMixin],

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            isAnalyzing: false,
            seconds: 0,
            sidebarContent: null,
            uploadText: T.get('copy.onboarding.uploadHelpText'),
            videoId: null,
        };
    },
    componentWillMount: function() {
        var self = this; 
        if (!SESSION.active()) {
            self.context.router.push(UTILS.DRY_NAV.DEMO.URL)
        }
    },
    componentWillUnmount: function() {
        if (this.__videoProcessingTimer) {
            clearTimeout(this.__videoProcessingTimer);
        }
    },

    getVideo: function(videoId) {
        return this.GET('videos/', { data: {
            fields: ['state', 'estimated_time_remaining'],
            video_id: videoId,
        } });
    },
    showError: function(err) {
        if (err === 'time') {
            this.setState({
                isAnalyzing: false,
                uploadText: T.get('error.longVideo'),
            });
        }
        else {
            this.setState({
                isAnalyzing: false,
                uploadText: T.get('copy.onboarding.uploadErrorText'),
            });  
        }
    },
    onAnalysisStart: function(postResp) {
        const { video } = postResp;
        const videoId = video.video_id;
        this.setState({
            isAnalyzing: true,
            seconds: null,
            videoId,
        });
    },
    onCountdownFinish: function() {
        const { router } = this.context;
        const { videoId } = this.state;
        var videoStatePollingWait = 5 * 1000; 

        this.getVideo(videoId).then(resp => {
            const video = resp.videos[0]
            if (!this.state.seconds) { 
                videoStatePollingWait = 10;
                const estimatedTimeRemaining = video.estimated_time_remaining || null;
                if (estimatedTimeRemaining) {
                    estimatedTimeRemaining > 900 ? this.showError('time') : this.setState({ seconds: estimatedTimeRemaining });
                }
            }
            else { 
                videoStatePollingWait = 5000;
            }  
            if (video.state === 'processed') {
                router.push({
                    pathname: UTILS.DRY_NAV.VIDEO_LIBRARY.URL,
                    state: { fromDemo: true },
                });
            } else if (video.state === 'failed') {
                this.showError(resp);
            } else {
                this.__videoProcessingTimer = setTimeout(() => {
                    this.onCountdownFinish();
                }, videoStatePollingWait);
            }
        }).catch(() => {
            this.showError();
        });
    },

    toggleLearnMore: function() {
        this.setState({
            sidebarContent: 'learnMore',
        });
        TRACKING.sendEvent(self, arguments, 'None');
    },

    render: function() {
        const { isAnalyzing, seconds, uploadText, sidebarContent } = this.state;
        return (
            <main className="xxPage">
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.onboarding.uploadPageTitle'))}
                />
                {
                    isAnalyzing ? (
                        <div>
                            <SiteHeader sidebarContent={sidebarContent} />
                            <Countdown onFinish={this.onCountdownFinish} seconds={this.state.seconds} />
                            <OnboardingSlides toggleLearnMore={this.toggleLearnMore} />
                            <OnboardingEmail videoId={this.state.videoId} />
                        </div>
                    ) : (
                        <div className="xxUpload">
                            <VideoUploadForm
                                isOnboarding
                                postHookSearch={null}
                                postHookAnalysis={this.onAnalysisStart}
                                onDemoError={this.showError}
                            />
                            <div className="xxUploadButton-help">
                                <span className="xxUploadButton-helpCircle"></span>
                                <span className="xxUploadButton-helpLine"></span>
                                {uploadText}
                            </div>
                        </div>
                    )
                }
            </main>
        );
    },
});
