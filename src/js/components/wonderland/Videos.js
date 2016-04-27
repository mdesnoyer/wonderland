// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Message from './Message';
import TutorialPanels from './TutorialPanels';
import VideosResults from './VideosResults';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
import AnalyzeVideoForm from '../forms/AnalyzeVideoForm';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Videos = React.createClass({
    getInitialState: function() {
        return {
            errorMessageArray: [],
            isError: false,
            videos: [],
            prevPage: '',
            nextPage: '',
            videoCountServed: -1,
            pageCount: 0,
            isBusy: false,
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
                        prevPage={self.state.prevPage}
                        nextPage={self.state.nextPage}
                        errorMessage={errorMessage}
                        pageCount={self.state.pageCount}
                        isBusy={self.state.isBusy}
                        videoCountServed={self.state.videoCountServed}
                        videoCountRequested={UTILS.VIDEO_PAGE_SIZE}
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
                    limit: UTILS.VIDEO_PAGE_SIZE
                }
            }
        ;
        self.setState({
            isBusy: true,
            forceOpenFirstOverride: forceOpenFirstOverride == null ? true : false,
            pageCount: pageAdjustment ? (self.state.pageCount + pageAdjustment) : 1
        }, function() {
            AJAX.doGet('videos/search' + self.state.bonusSearchUrl, options)
                .then(function(json) {
                    if (!self._isMounted) {
                        return false;
                    }
                    self.setState({
                        videoCountServed: json.video_count,
                        bonusSearchUrl: '',
                        isBusy: false
                    }, function() {
                        if (json.video_count === 0) {
                            self.setState({
                                errorMessageArray: [],
                                isError: false,
                                videos: [],
                                prevPage: '',
                                nextPage: '',
                            });
                        }
                        else {
                            self.setState({
                                errorMessageArray: [],
                                isError: false,
                                videos: json.videos,
                                prevPage: json.prev_page,
                                nextPage: json.next_page,
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
                        prevPage: '',
                        nextPage: '',
                        videoCountServed: 0,
                        bonusSearchUrl: '',
                        isBusy: false
                    });
                });
            });
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Videos;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
