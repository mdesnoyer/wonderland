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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Videos = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    mixins: [AjaxMixin], // ReactDebugMixin
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
    componentWillMount: function() {
        var self = this;
        self.GET('limits')
            .then(function(res) {
                self.doFindMaxVideos(res.video_posts, res.max_video_posts)
            })
            .catch(function(err) {
                self.context.router.push('*')
            })
    },
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
        self.doVideoSearch(1);
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
            alertMessage = <Message message={T.get('copy.analyzeVideo.maxLimitHit')} type="video" />;
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
                        <div className="xxVideoloadingSpinner"></div>
                    ) : (
                        <div>
                            <VideoUploadForm
                                postHookSearch={self.doVideoSearch}
                                postHookAnalysis={null}
                                isVideoResults={true}
                                videoCountServed={self.state.videoCountServed}
                                isMaxLimit={self.state.isMaxLimit}
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
                                isMaxLimit={self.state.isMaxLimit}
                                setTooltipText={self.setTooltipText}
                            />
                            <ReactTooltip
                                id="settableTooltip"
                                ref="settableTooltip"
                                event="click"
                                eventOff="mouseout"
                                effect="solid"
                                place="bottom"
                                delayHide={1000}
                                getContent={self.getTooltipText}
                            />
                            <ReactTooltip
                                id="staticTooltip"
                                event="hover"
                                place="left"
                            />
                        </div>
                    )
                }
                {
                    self.props.isMobile ? (
                        <div className="xxCollection">
                            <VideosMobileWarning />
                        </div>
                    ) : null
                }
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
    doFindMaxVideos: function(count, max) {
        var self = this;
        if (count === max) {
            self.setState({
                isMaxLimit: true
            })
        }
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
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Videos;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
