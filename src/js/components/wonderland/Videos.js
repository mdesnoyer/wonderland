// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Message from './Message';
import TutorialPanels from './TutorialPanels';
import VideosResults from './VideosResults';
import AJAX from '../../mixins/ajax';
import UTILS from '../../modules/utils';
import AnalyzeVideoForm from '../forms/AnalyzeVideoForm';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Videos = React.createClass({
	mixins: [AJAX], // ReactDebugMixin
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
            bonusSearchUrl: '' // used to hold the next/prev choice
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
    render: function() {
        var self = this,
            errorMessage = self.state.isError ? <Message header='Videos Error' body={self.state.errorMessageArray} flavour="danger" /> : '',
            panels = {
                'files-o': T.get('copy.analyzeVideoPanel.panel.1'),
                'upload': T.get('copy.analyzeVideoPanel.panel.2'),
                'th-large': T.get('copy.analyzeVideoPanel.panel.3')
            },
            tutorialComponent = self.state.videoCountServed === 0 ? <section className="section"><TutorialPanels panels={panels}/></section> : ''
        ;
        return (
            <div>
                {tutorialComponent}
                <section className="section">
                    <AnalyzeVideoForm
                        postHook={self.doVideoSearch}
                        videoCountServed={self.state.videoCountServed}
                    />
                </section>
                <section className="section">
                    <VideosResults
                        forceOpenFirstOverride={self.state.forceOpenFirstOverride}
                        videos={self.state.videos}
                        handleNewSearch={self.handleNewSearch}
                        prevPageAPICall={self.state.prevPageAPICall}
                        nextPageAPICall={self.state.nextPageAPICall}
                        errorMessage={errorMessage}
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
    handleNewSearch: function(bonusSearchUrl, pageAdjustment) {
        var self = this;
        if (!self._isMounted) {
            return false;
        }
        self.setState({
            bonusSearchUrl: '?' + bonusSearchUrl.split('?')[1]
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
            self.GET('videos/search' + self.state.bonusSearchUrl, options)
                .then(function(json) {
                    if (!self._isMounted) {
                        return false;
                    }
                    self.setState({
                        videoCountServed: json.video_count,
                        bonusSearchUrl: '',
                        isLoading: false
                    }, function() {
                        if (json.video_count === 0) {
                            self.setState({
                                errorMessageArray: [],
                                isError: false,
                                videos: [],
                                prevPageAPICall: '',
                                nextPageAPICall: '',
                            });
                        }
                        else {
                            self.setState({
                                errorMessageArray: [],
                                isError: false,
                                videos: json.videos,
                                prevPageAPICall: json.prev_page,
                                nextPageAPICall: json.next_page,
                            });
                        }
                    });
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
                        bonusSearchUrl: '',
                        isLoading: false
                    });
                });
            });
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Videos;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
