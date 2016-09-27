// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, { PropTypes } from 'react';

import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const propTypes = {
    // Updates parent current page.
    changeCurrentPage: PropTypes.func.isRequired,

    // Current page, 0-indexed.
    currentPage: React.PropTypes.number.isRequired,

    // Whether the next control is enabled
    enableNext: React.PropTypes.bool.isRequired,

    // Whether a search is pending
    searchPending: React.PropTypes.bool.isRequired,
};

export default class PagingControls extends React.Component {

    constructor(props) {
        super(props);
        const self = this;
        self.handleKeyEvent = self.handleKeyEvent.bind(this);
        self.handleNav = self.handleNav.bind(this);
        self.handleNavPrev = self.handleNav.bind(this, -1);
        self.handleNavNext = self.handleNav.bind(this, +1);
    }

    componentDidMount() {
        const self = this;
        document.body.onkeydown = self.handleKeyEvent;
    }

    componentWillUnmount() {
        const self = this;
        document.body.onkeydown = undefined;
    }

    getPrevButton() {
        const self = this;
        if (self.props.currentPage > 0) {
            return (
                <button
                    onClick={self.handleNavPrev}
                    aria-label={T.get('action.previous')}
                    title={T.get('action.previous')}
                    className={"xxPagingControls-prev"}
                >
                    {T.get('action.previous')}
                </button>
            );
        }
        return null;
    }

    getCurrentPage() {
        const self = this,
            hellip = String.fromCharCode(8230)
        ;
        if (self.props.enableNext) {
            return <span>{1 + self.props.currentPage}</span>;
        }
        if (self.props.currentPage) {
            if (self.props.searchPending) {
                return <span>{1 + self.props.currentPage + hellip}</span>;
            }
            return <span>{1 + self.props.currentPage}</span>;
        }
        if (self.props.searchPending) {
            return <span>{hellip}</span>;
        }
        return null;
    }

    getNextButton() {
        const self = this;
        if (self.props.enableNext) {
            return (
                <button
                    disabled={!self.props.enableNext}
                    onClick={self.handleNavNext}
                    className={"xxPagingControls-next"}
                    aria-label={T.get('action.next')}
                >
                    {T.get('action.next')}
                </button>
            );
        }
        return null;
    }

    handleKeyEvent(e) {
        const self = this;
        if (e.keyCode === 37) { // left arrow
            if (self.props.currentPage > 0) {
                self.handleNavPrev();
            }
        } else if (e.keyCode === 39) { // right arrow
            if (self.props.enableNext) {
                self.handleNavNext();
            }
        }
    }

    handleNav(change, ...rest) {
        const self = this;
        window.scrollTo(0, 0);
        TRACKING.sendEvent(self, rest, self.props.currentPage);
        self.props.changeCurrentPage(change);
    }

    render() {
        const self = this;
        return (
            <div className="xxPagingControls">
                <nav className="xxPagingControls-navigation">
                    <div className="xxPagingControls-navigation-item">
                        {self.getPrevButton()}
                    </div>
                    <div className={"xxPagingControls-navigation-item"}>
                        {self.getCurrentPage()}
                    </div>
                    <div className="xxPagingControls-navigation-item">
                        {self.getNextButton()}
                    </div>
                </nav>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

PagingControls.propTypes = propTypes;
PagingControls.displayName = 'PagingControls';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
