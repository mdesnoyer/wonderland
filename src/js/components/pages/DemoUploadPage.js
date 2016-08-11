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
            maxVideoSize: UTILS.MAX_VIDEO_SIZE
        };
    },
    componentWillMount: function() {
        var self = this; 
        if (!SESSION.active()) {
            self.context.router.push(UTILS.DRY_NAV.DEMO.URL)
        }
        else {
            self.GET('limits')
                .then(function(res) {
                    self.setState({ maxVideoSize: res.max_video_size || UTILS.MAX_VIDEO_SIZE })
                    if (typeof SESSION.getProcessing() !== undefined) {
                        self.onAnalysisStart(SESSION.getProcessing());
                    }
                })
                .catch(function(err) {
                })
            ;
        }
    },
    componentWillUnmount: function() {
        if (this.__videoProcessingTimer) {
            clearTimeout(this.__videoProcessingTimer);
        }
    },

    getVideo: function(videoId) {
        return this.GET('videos/', { data: {
            fields: ['state', 'estimated_time_remaining', 'duration'],
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

        this.getVideo(videoId).then(resp => {
            const video = resp.videos[0]
            const timeRemaining = video.estimated_time_remaining || null;
            const duration = video.duration || null;

            // Update state
            if (duration !== null && duration > this.state.maxVideoSize) {
                this.showError('time');
            }

            if (timeRemaining !== null) {
                this.setState({seconds: timeRemaining});
            }

            // Determine when to poll next based on the estimated time
            // remaining
            var videoStatePollingWait = 5000;
            if (timeRemaining !== null) {
                if (timeRemaining < 30.0) {
                    // It should be ready soon, so speed up the polling
                    videoStatePollingWait = 3000;
                } else {
                    // It should be a while until the video is ready
                    videoStatePollingWait = 10000;
                }
            }

            if (video.state === 'processed' || video.state === 'serving') {
                router.push({
                    pathname: UTILS.DRY_NAV.VIDEO_LIBRARY.URL,
                    state: { fromDemo: true },
                });
            } else if (video.state === 'failed') {
                var lengthRe = /Video length .* is too long/;
                if (video.error && video.error.search(lengthRe) >= 0) {
                    this.showError('time');
                } else {
                    this.showError();
                }
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
        var countdown = null;
        var pageStyle = isAnalyzing ? "xxPage is-processing" : "xxPage";

        countdown = (<Countdown onFinish={this.onCountdownFinish} seconds={this.state.seconds} displayLoading={true} />); 
        return (
            <main className={pageStyle}>
                <Helmet
                    title={UTILS.buildPageTitle(T.get('copy.onboarding.uploadPageTitle'))}
                />
                {
                    isAnalyzing ? (
                        <div>
                            <SiteHeader sidebarContent={sidebarContent} />
                            {countdown} 
                            <OnboardingSlides toggleLearnMore={this.toggleLearnMore} />
                            <OnboardingEmail videoId={this.state.videoId} />
                        </div>
                    ) : (
                        <div>
                            <header className="xxHeader">
                                <a href="/" title={T.get('title.home')}>
                                    <img 
                                        className="xxLogo"
                                        src="/img/xx/logo.svg"
                                        alt={T.get('app.companyShortName')}
                                        title={T.get('app.companyShortName')}
                                    />
                                </a>
                            </header>
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
                        </div>
                    )
                }
            </main>
        );
    },
});
