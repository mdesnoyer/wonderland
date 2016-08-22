'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';
import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const PagingControl = React.createClass({

    propTypes: {

        // Updates parent current page.
        changeCurrentPage: PropTypes.func.isRequired,

        // Current page, 0-indexed.
        currentPage: React.PropTypes.number.isRequired,

        // Whether the next control is enabled
        enableNext: React.PropTypes.bool.isRequired
    },

    componentDidMount: function() {
        document.body.onkeydown = this.handleKeyEvent;
    },

    componentWillUnmount: function() {
        document.body.onkeydown = undefined;
    },

    handleKeyEvent: function(e) {
        const self = this;
        switch (e.keyCode) {
            case 37: // Left Arrow
                return self.handleNav(-1);
            case 39: // Right Arrow
                return self.handleNav(+1);
        }
    },

    getPrevButton() {
        if (this.props.currentPage > 0) {
            return (
                <button
                    ref="prevButton"
                    onClick={this.handleNav.bind(null, -1)}
                    aria-label={T.get('action.previous')}
                    title={T.get('action.previous')}
                    className={"xxPagingControls-prev"}
                >
                    {T.get('action.previous')}
                </button>
            );
        }
        return null;
    },

    getNextButton() {
        if (this.props.enableNext) {
            return (
                <button
                    ref="nextButton"
                    disabled={!this.props.enableNext}
                    onClick={this.handleNav.bind(null, +1)}
                    className={"xxPagingControls-next"}
                    aria-label={T.get('action.next')}
                >
                    {T.get('action.next')}
                </button>
            );
        }
        return null;
    },

    render: function() {
        return (
            <div className="xxPagingControls">
                <nav className="xxPagingControls-navigation">
                    <div className="xxPagingControls-navigation-item">
                        {this.getPrevButton()}
                    </div>
                    <div className="xxPagingControls-navigation-item">
                        {1 + this.props.currentPage}
                    </div>
                    <div className="xxPagingControls-navigation-item">
                        {this.getNextButton()}
                    </div>
                </nav>
            </div>
        );
    },

    handleNav: function(change) {
        const self = this;
        window.scrollTo(0, 0);
        TRACKING.sendEvent(self, arguments, self.props.currentPage);
        this.props.changeCurrentPage(change);
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default PagingControl;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
