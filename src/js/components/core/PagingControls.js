import React, { PropTypes } from 'react';

import T from '../../modules/translation';
import TRACKING from '../../modules/tracking';

class PagingControls extends React.Component {
    static displayName = 'PagingControls';

    static propTypes = {
        // Updates parent current page.
        onChangeCurrentPage: PropTypes.func.isRequired,

        // Current page, 0-indexed.
        currentPage: React.PropTypes.number.isRequired,

        // Whether the next control is enabled
        isNextEnabled: React.PropTypes.bool.isRequired,

        // Whether a search is pending
        isSearchPending: React.PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
        this.handleKeyEvent = this.handleKeyEvent.bind(this);
        this.handleNav = this.handleNav.bind(this);
        this.handleNavPrev = this.handleNav.bind(this, -1);
        this.handleNavNext = this.handleNav.bind(this, +1);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyEvent);
    }

    handleKeyEvent(e) {
        if (e.keyCode === 37) { // left arrow
            if (this.props.currentPage > 0) {
                this.handleNavPrev();
                e.stopPropagation();
            }
        } else if (e.keyCode === 39) { // right arrow
            if (this.props.isNextEnabled) {
                this.handleNavNext();
                e.stopPropagation();
            }
        }
    }

    handleNav(change, ...rest) {
        window.scrollTo(0, 0);
        TRACKING.sendEvent(this, rest, this.props.currentPage);
        this.props.onChangeCurrentPage(change);
    }


    renderPrevButton() {
        if (this.props.currentPage > 0) {
            return (
                <button
                    onClick={this.handleNavPrev}
                    aria-label={T.get('action.previous')}
                    title={T.get('action.previous')}
                    className="xxPagingControls-prev"
                >
                    {T.get('action.previous')}
                </button>
            );
        }
        return null;
    }

    renderCurrentPage() {
        const hellip = String.fromCharCode(8230);
        if (this.props.isNextEnabled) {
            return <span>{1 + this.props.currentPage}</span>;
        }
        if (this.props.currentPage) {
            if (this.props.isSearchPending) {
                return <span>{1 + this.props.currentPage + hellip}</span>;
            }
            return <span>{1 + this.props.currentPage}</span>;
        }
        if (this.props.isSearchPending) {
            return <span>{hellip}</span>;
        }
        return null;
    }

    renderNextButton() {
        if (this.props.isNextEnabled) {
            return (
                <button
                    disabled={!this.props.isNextEnabled}
                    onClick={this.handleNavNext}
                    className="xxPagingControls-next"
                    aria-label={T.get('action.next')}
                >
                    {T.get('action.next')}
                </button>
            );
        }
        return null;
    }

    render() {
        return (
            <div className="xxPagingControls">
                <nav className="xxPagingControls-navigation">
                    <div className="xxPagingControls-navigation-item">
                        {this.renderPrevButton()}
                    </div>
                    <div className="xxPagingControls-navigation-item">
                        {this.renderCurrentPage()}
                    </div>
                    <div className="xxPagingControls-navigation-item">
                        {this.renderNextButton()}
                    </div>
                </nav>
            </div>
        );
    }
}
export default PagingControls;
