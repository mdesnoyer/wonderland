// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Message from './Message';
import VideosResults from './VideosResults';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import VideoUploadForm from '../knave/VideoUploadForm';
import T from '../../modules/translation';
import VideosMobileWarning from './VideosMobileWarning';
import Secured from '../../mixins/Secured';
import ReactTooltip from 'react-tooltip';
import Account from '../../mixins/Account';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Videos = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    mixins: [AjaxMixin, Account], // ReactDebugMixin
    getInitialState: function() {
        return {
            errorMessageArray: [],
            isError: false,
            videos: [],
            prevPageAPICall: '',
            nextPageAPICall: '',
            videoCountServed: -1,
            currentPage: 0,
            isLoading: false,
            pseudoPageUrl: '?', // used to hold the Prev / Next choice
            previousPseudoPageUrl: '' // used to hold the Page before
        }
    },
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
        self.doVideoSearch(1);
        self.doLimitsSearch();
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
    },
    componentWillUpdate: function(nextProps, nextState) {
        if (nextState.isLoading === false) {
            var target = document.getElementById('results');
            if (target) {
                target.scrollIntoView();
            }
        }
    },
    render: function() {
        var self = this,
            errorMessage = self.state.isError ? <Message message={self.state.errorMessageArray} type="formError" /> : false,
            prevPageAPICall = '',
            alertMessage = ''
        ;
        // Edge Case - when we hit a Next page with 0 results, limbo
        if ((self.state.prevPageAPICall === '') && (self.state.nextPageAPICall === '') && (self.state.currentPage > 1)) {
            prevPageAPICall = self.state.previousPseudoPageUrl;
            alertMessage = <Message message={T.get('warning.noMoreVideosBody')} type="video" />;
        }
        else if (self.state.isMaxLimit) {
            alertMessage = <Message message={T.get('copy.analyzeVideo.limitMessage')} type="video" />;
        }
        else {
            prevPageAPICall = self.state.prevPageAPICall;
            alertMessage = '';
        }
        return (
            <div>
                {alertMessage}
                {
                    self.state.isLoading ? (
                        <div className="xxOverlay" >
                            <div className="xxVideoloadingSpinner">{T.get('copy.loading')}</div>
                        </div>
                    ) : null
                }
                <VideoUploadForm
                    postHookSearch={self.doVideoSearch}
                    postHookAnalysis={null}
                    isVideoResults={true}
                    videoCountServed={self.state.videoCountServed}
                    isMaxLimit={self.state.isMaxLimit}
                    openSignUp={self.props.openSignUp}
                    currentPage={self.state.currentPage}
                    handleNewSearch={self.handleNewSearch}
                />
                <VideosResults
                    videos={self.state.videos}
                    handleNewSearch={self.handleNewSearch}
                    prevPageAPICall={prevPageAPICall}
                    nextPageAPICall={self.state.nextPageAPICall}
                    currentPage={self.state.currentPage}
                    isLoading={self.state.isLoading}
                    isMobile={self.props.isMobile}
                    videoCountServed={self.state.videoCountServed}
                    videoCountRequested={UTILS.RESULTS_PAGE_SIZE}
                    openSignUp={self.props.openSignUp}
                    openLearnMore={self.props.openLearnMore}
                    isMaxLimit={self.state.isMaxLimit}
                    setTooltipText={self.setTooltipText}
                    showRefilterTutorial={self.props.showRefilterTutorial}
                />
                <ReactTooltip
                    id="settableTooltip"
                    ref="settableTooltip"
                    event="click"
                    eventOff="mouseout"
                    effect="solid"
                    place="bottom"
                    delayHide={UTILS.TOOLTIP_DELAY_MILLIS}
                    type="dark"
                    getContent={self.getTooltipText}
                />
                <ReactTooltip
                    id="staticTooltip"
                    class="xxHoverTooltip"
                    effect="solid"
                    place="left"
                    type="light"
                />
            </div>
        );
    },
    getTooltipText: function() {
        return this.refs.settableTooltip.state.placeholder;
    },
    setTooltipText: function(textKey) {
        this.refs.settableTooltip.setState({
            placeholder: T.get(textKey)
        });
    },
    handleNewSearch: function(pseudoPageUrl, pageAdjustment) {
        var self = this;
        if (!self._isMounted) {
            return false;
        }
        self.setState({
            isLoading: true,
            previousPseudoPageUrl: self.state.pseudoPageUrl,
            pseudoPageUrl: pseudoPageUrl
        }, function() {
            self.doVideoSearch(pageAdjustment);
        });
    },
    doVideoSearch: function(pageAdjustment) {
        var self = this,
            options = {
                data: {
                    fields: UTILS.VIDEO_FIELDS,
                    limit: UTILS.RESULTS_PAGE_SIZE
                }
            }
        ;
        self.setState({
            isLoading: true,
            currentPage: pageAdjustment ? (self.state.currentPage + pageAdjustment) : 1
        }, function() {
            var _pseudoPageUrl = self.state.pseudoPageUrl ? self.state.pseudoPageUrl.split('?')[1] : '';
            self.GET('videos/search?' + _pseudoPageUrl, options)
                .then(function(json) {
                    if (!self._isMounted) {
                        return false;
                    }
                    if (json.video_count === 0) {
                        self.setState({
                            videoCountServed: json.video_count,
                            isLoading: false,
                            errorMessageArray: [],
                            isError: false,
                            videos: [],
                            prevPageAPICall: '',
                            nextPageAPICall: ''
                        });
                        self.context.router.push(UTILS.DRY_NAV.ONBOARDING_VIDEO_UPLOAD.URL);
                    }
                    else {
                        self.setState({
                            videoCountServed: json.video_count,
                            isLoading: false,
                            errorMessageArray: [],
                            isError: false,
                            videos: json.videos,
                            prevPageAPICall: json.prev_page,
                            nextPageAPICall: json.next_page
                        });
                    }
                }).catch(function(err) {
                    if (self._isMounted) {
                        return false;
                    }
                    var newErrorMessageArray = self.state.errorMessageArray;
                    newErrorMessageArray.push('Error');
                    self.setState({
                        errorMessageArray: newErrorMessageArray,
                        isError: true,
                        videos: [],
                        prevPageAPICall: '',
                        nextPageAPICall: '',
                        videoCountServed: 0,
                        pseudoPageUrl: '?',
                        previousPseudoPageUrl: '',
                        isLoading: false
                    });
                });
            })
        ;
    },
    doLimitsSearch: function() {
        var self = this;
        self.GET('limits')
            .then(function(res) {
                self.doFormatTime(res);
                self.doFindMaxVideos(res.video_posts, res.max_video_posts);
            })
            .catch(function(err) {
            });
    },
    doFormatTime: function(res) {
        var self = this; 
        var offset = moment().utcOffset();
        var timeOfRefresh = moment(res.refresh_time_video_posts).add(offset, 'minutes').calendar().toLowerCase();
        self.setState({
            refreshTime: timeOfRefresh
        });
    },
    doFindMaxVideos: function(count, max) {
        var self = this;
        if (count === max) {
            self.setState({
                isMaxLimit: true
            });
        }
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Videos;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
