// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollectionRefilterReady extends React.Component {
    componentDidMount() {
        this.__timer = setTimeout(() => {
            this.props.setActiveContent('has-filters');
        }, 10000);

        this.setScrollPosition();
    }

    componentWillUnmount() {
        if (this.__timer) {
            clearTimeout(this.__timer);
        }
    }

    setScrollPosition() {
        // needs to use double parentNode to get through the dummy node that ReactCSSTransitionGroup creates
        const filtersNode = ReactDOM.findDOMNode(this).parentNode.parentNode.querySelector('.xxCollectionFilters-title');
        const filtersOffset = filtersNode.getBoundingClientRect().top;
        const arrowOffset = this._arrow.getBoundingClientRect().top + 37;

        window.scrollTo(0, window.pageYOffset + (filtersOffset - arrowOffset));
    }

    render() {
        return (
            <section className="xxOverlay">
                <div className="xxOverlay-content">
                    <h2 className="xxTitle">Your images are ready!</h2>
                    <button
                        className="xxButton xxButton--highlight"
                        type="button"
                        onClick={e => this.props.setActiveContent('has-filters', e)}
                    >View Images</button>
                </div>
                <div className="xxCollectionFiltersHint">
                    <div className="xxCollectionFiltersHint-arrow" ref={arr => this._arrow = arr}></div>
                    <strong className="xxCollectionFiltersHint-label">Click to view images for other audiences</strong>
                </div>
            </section>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
