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
};

class PagingControl extends React.Component {

    static displayName = 'PagingControl'

    constructor(props) {
        super(props);
        this.handleKeyEvent = this.handleKeyEvent.bind(this);
        this.handleNav = this.handleNav.bind(this);
        this.handleNavPrev = this.handleNav.bind(this, -1);
        this.handleNavNext = this.handleNav.bind(this, +1);
    }

    componentDidMount() {
        document.body.onkeydown = this.handleKeyEvent;
    }

    componentWillUnmount() {
        document.body.onkeydown = undefined;
    }

    getPrevButton() {
        if (this.props.currentPage > 0) {
            return (
                <button
                    onClick={this.handleNavPrev}
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

    getNextButton() {
        if (this.props.enableNext) {
            return (
                <button
                    disabled={!this.props.enableNext}
                    onClick={this.handleNavNext}
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
        if (e.keyCode === 37) {
            if (this.props.currentPage > 0) {
                this.handleNavPrev();
            }
        } else if (e.keyCode === 39) {
            if (this.props.enableNext) {
                this.handleNavNext();
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
    }
}

PagingControl.propTypes = propTypes;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default PagingControl;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
