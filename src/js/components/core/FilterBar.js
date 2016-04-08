// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var FilterBar = React.createClass({
    propTypes: {
        handleNewSearch: React.PropTypes.func.isRequired,
        prevPage: React.PropTypes.string.isRequired,
        nextPage: React.PropTypes.string.isRequired,
        pageCount: React.PropTypes.number.isRequired,
        videoCountServed: React.PropTypes.number.isRequired,
        videoCountRequested: React.PropTypes.number.isRequired,
        isBusy: React.PropTypes.bool.isRequired
    },
    handlePrevButton: function(e) {
        var self = this;
        e.preventDefault();
        self.props.handleNewSearch(self.props.prevPage, -1);
    },
    handleNextButton: function(e) {
        var self = this;
        e.preventDefault();
        self.props.handleNewSearch(self.props.nextPage, 1);
    },
    render() {
        var self = this,
            prevDisabled = self.props.isBusy || self.props.prevPage === '' || self.props.pageCount === 1,
            nextDisabled = self.props.isBusy || self.props.nextPage === '' || self.props.videoCountServed < self.props.videoCountRequested,
            busyClass = 'button is-primary' + (self.props.isBusy ? ' is-loading' : '')
        ;
        return (
            <nav className="navbar">
                <div className="navbar-left">
                </div>
                <div className="navbar-right">
                    <div className="navbar-item">
                        <a href={'#' + self.props.prevPage} disabled={prevDisabled} className={busyClass} onClick={self.handlePrevButton}>
                            {T.get('copy.PreviousLabel')}
                        </a>
                    </div>
                    <div className="navbar-item">
                        <p className="subtitle is-5">{self.props.pageCount}</p>
                    </div>
                    <div className="navbar-item">
                        <a href={'#' + self.props.nextPage} disabled={nextDisabled} className={busyClass} onClick={self.handleNextButton}>
                            {T.get('copy.NextLabel')}
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default FilterBar;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
