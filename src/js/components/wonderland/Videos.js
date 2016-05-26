// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Message from './Message';
import TutorialPanels from './TutorialPanels';
import VideosResults from './VideosResults';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import AnalyzeVideoForm from '../forms/AnalyzeVideoForm';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Videos = React.createClass({
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
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
        self.doVideoSearch(1, false);
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
            errorMessage = self.state.isError ? <Message header='Videos Error' body={self.state.errorMessageArray} flavour="danger" /> : false,
            panels = {
                'files-o': T.get('copy.analyzeVideoPanel.panel.1'),
                'upload': T.get('copy.analyzeVideoPanel.panel.2'),
                'th-large': T.get('copy.analyzeVideoPanel.panel.3')
            },
            tutorialComponent = self.state.videoCountServed === 0 ? <section className="wonderland-section section"><TutorialPanels panels={panels}/></section> : false,
            prevPageAPICall = '',
            alertMessage = ''
        ;
        // Edge Case - when we hit a Next page with 0 results, limbo
        if ((self.state.prevPageAPICall === '') && (self.state.nextPageAPICall === '') && (self.state.currentPage > 1)) {
            prevPageAPICall = self.state.previousPseudoPageUrl;
            alertMessage = <Message header={[T.get('warning.noMoreVideosHeader')]} body={[T.get('warning.noMoreVideosBody')]} flavour="warning" />;
        }
        else {
            prevPageAPICall = self.state.prevPageAPICall;
            alertMessage = '';
        }
        return (
            <div>
                {tutorialComponent}
                <section className="wonderland-section section">
                    <AnalyzeVideoForm
                        postHook={self.doVideoSearch}
                        videoCountServed={self.state.videoCountServed}
                    />
                </section>
                <section id="results" className="wonderland-section section">
                    <VideosResults
                        forceOpenFirstOverride={self.state.forceOpenFirstOverride}
                        videos={self.state.videos}
                        handleNewSearch={self.handleNewSearch}
                        prevPageAPICall={prevPageAPICall}
                        nextPageAPICall={self.state.nextPageAPICall}
                        errorMessage={errorMessage}
                        alertMessage={alertMessage}
                        currentPage={self.state.currentPage}
                        isLoading={self.state.isLoading}
                        videoCountServed={self.state.videoCountServed}
                        videoCountRequested={UTILS.RESULTS_PAGE_SIZE}
                        isServingEnabled={self.props.isServingEnabled}
                    />
                </section>
            </div>
        );
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
            self.doVideoSearch(pageAdjustment, false);
        });
    },
    doVideoSearch: function(pageAdjustment, forceOpenFirstOverride) {
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
            forceOpenFirstOverride: forceOpenFirstOverride == null ? true : false,
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
