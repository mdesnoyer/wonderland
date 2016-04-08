// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import Message from './Message';
import FilterBar from '../core/FilterBar';
import TutorialPanels from './TutorialPanels'
import VideosResults from './VideosResults';
import AJAX from '../../modules/ajax';
import UTILS from '../../modules/utils';
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
            videoCountServed: 0,
            pageCount: 0,
            isBusy: false,
            referrer: 0, // prev/next
            bonusSearchUrl: '' // used to hold the next/prev choice
        }  
    },
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
        self.doSearch(1);  
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
    },
    render: function() {
        var self = this,
            errorMessage = self.state.isError ? <Message header='Videos Error' body={self.state.errorMessageArray} flavour="danger" /> : ''
        ;
        return (
            <VideosResults
                videos={self.state.videos}
                handleNewSearch={self.handleNewSearch}
                prevPage={self.state.prevPage}
                nextPage={self.state.nextPage}
                errorMessage={errorMessage}
                pageCount={self.state.pageCount}
                isBusy={self.state.isBusy}
                referrer={self.state.referrer}
                videoCountServed={self.state.videoCountServed}
                videoCountRequested={UTILS.VIDEO_PAGE_SIZE}
            />
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
            self.doSearch(pageAdjustment);
        });
    },
    doSearch: function(pageAdjustment) {
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
            pageCount: self.state.pageCount + pageAdjustment
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
                            var newErrorMessageArray = self.state.errorMessageArray;
                            if (self.state.referrer === 0) {
                                newErrorMessageArray.push('No Videos');
                            }
                            else {
                                newErrorMessageArray.push('You reached the end');
                            }
                            self.setState({
                                errorMessageArray: newErrorMessageArray,
                                isError: true,
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
