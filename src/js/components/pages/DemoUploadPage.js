import React from 'react';
import Helmet from 'react-helmet';

import AjaxMixin from '../../mixins/Ajax';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

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

    componentWillUnmount: function() {
        if (this.__timeRemainingTimer) {
            clearTimeout(this.__timeRemainingTimer);
        }

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

    showError: function() {
        this.setState({
            isAnalyzing: false,
            uploadText: T.get('copy.onboarding.uploadErrorText'),
        });
    },

    onAnalysisStart: function(postResp) {
        const { video } = postResp;
        const videoId = video.video_id;
        const timeEstimatePollingWait = 1000;

        this.getVideo(videoId).then(getResp => {
            const estimatedTimeRemaining = getResp.videos[0].estimated_time_remaining;

            if (!estimatedTimeRemaining) {
                this.__timeRemainingTimer = setTimeout(() => {
                    this.onAnalysisStart(postResp);
                }, timeEstimatePollingWait);
            } else {
                this.setState({
                    isAnalyzing: true,
                    seconds: estimatedTimeRemaining,
                    videoId,
                });
            }
        }).catch(() => {
            this.showError();
        });
    },

    onCountdownFinish: function() {
        const { router } = this.context;
        const { videoId } = this.state;
        const videoStatePollingWait = 5 * 1000;

        this.getVideo(videoId).then(resp => {
            const video = resp.videos[0]

            if (video.state === 'processed') {
                router.push({
                    pathname: UTILS.DRY_NAV.VIDEO_LIBRARY.URL,
                });
            } else if (video.state === 'failed') {
                this.showError();
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
                            <Countdown onFinish={this.onCountdownFinish} seconds={seconds} />
                            <OnboardingSlides toggleLearnMore={this.toggleLearnMore} />
                            <OnboardingEmail videoId={this.state.videoId} />
                        </div>
                    ) : (
                        <div className="xxUpload">
                            <VideoUploadForm isOnboarding postHook={this.onAnalysisStart} />

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
