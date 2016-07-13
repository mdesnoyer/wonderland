// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import Icon from '../core/Icon';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var NavigationBar = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        isLoading: React.PropTypes.bool.isRequired,
        alertMessage: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
        // These 2 props hold the API call to make to go to the Previous and
        // Next page
        prevPageAPICall: React.PropTypes.string.isRequired,
        nextPageAPICall: React.PropTypes.string.isRequired,
        // handleNewSearch - callback to do the call to go to the Previous or
        // Next page(s)
        handleNewSearch: React.PropTypes.func.isRequired,
        // currentPage - number that holds a pointer to the current page
        // number we think we are on
        currentPage: React.PropTypes.number.isRequired,
        // videoCountRequested - how many videos we actually asked for from the
        // back end. Normally the page size.
        videoCountRequested: React.PropTypes.number.isRequired,
        // videoCountServed - how many videos we actually got. Will be equal to
        // or less than the page size.
        videoCountServed: React.PropTypes.number.isRequired
    },
    componentDidMount: function() {
        var self = this;
        document.body.onkeydown = self.handleKeyEvent;
    },
    componentWillUnmount: function() {
        var self = this;
        document.body.onkeydown = '';
    },
    render() {
        var self = this,
            // Its quite simple here:
            // - if we are loading, Prev and Next are disabled
            // - if we are on page 1, Prev is disabled
            // - if we don't have a Prev API Call, Prev is disabled
            // - if we don't have a Next API Call, Next is disabled
            // - if we bring back, less videos than we requested, we know we have run out, so Next is disabled
            prevDisabledAttribute = self.props.isLoading || (self.props.prevPageAPICall === '') || (self.props.currentPage === 1),
            nextDisabledAttribute = self.props.isLoading || (self.props.nextPageAPICall === '') || (self.props.videoCountServed < self.props.videoCountRequested),
            loadingClass = 'button is-primary is-medium' + (self.props.isLoading ? ' is-loading' : '')
        ;
        // Edge Case - when we first hit the site, Virgin Mode
        if ((self.props.prevPageAPICall === '') && (self.props.nextPageAPICall === '') && (self.props.currentPage === 1)) {
            return false;
        }
        return (
            <div className="xxCollectionNavBar">
                {self.props.alertMessage}
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <button
                                ref="prevButton"
                                data-loc={self.props.prevPageAPICall}
                                disabled={prevDisabledAttribute}
                                onClick={self.handlePrevButton}
                                className={loadingClass}
                                title={T.get('action.previous')}
                            >
                                <Icon type="chevron-circle-left" />
                                {T.get('action.previous')}
                            </button>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <p className="subtitle is-5">Page {self.props.currentPage}</p>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button
                                ref="nextButton"
                                data-loc={self.props.nextPageAPICall}
                                disabled={nextDisabledAttribute}
                                onClick={self.handleNextButton}
                                className={loadingClass}
                                title={T.get('action.next')}
                            >
                                {T.get('action.next')}
                                <Icon type="chevron-circle-right" />
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        );
    },
    handleKeyEvent: function(e) {
        var self = this;
        switch (e.keyCode) {
            case 37: // Left Arrow
                self.doPrev();
                break;
            case 39: // Right Arrow
                self.doNext();
                break;
        }
    },
    handlePrevButton: function(e) {
        var self = this;
        TRACKING.sendEvent(self, arguments, self.props.currentPage);
        self.doPrev();
    },
    handleNextButton: function(e) {
        var self = this;
        TRACKING.sendEvent(self, arguments, self.props.currentPage);
        self.doNext();
    },
    doPrev: function() {
        var self = this;
        if (!self.refs.prevButton.attributes.disabled) {
            self.props.handleNewSearch(self.props.prevPageAPICall, -1);
        }
    },
    doNext: function() {
        var self = this;
        if (!self.refs.nextButton.attributes.disabled) {
            self.props.handleNewSearch(self.props.nextPageAPICall, 1);
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default NavigationBar;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
