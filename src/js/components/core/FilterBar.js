// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var FilterBar = React.createClass({
    handlePrevButton: function(e) {
        e.preventDefault();
        alert('Previous');        
    },
    handleNextButton: function(e) {
        e.preventDefault();
        alert('Next');
    },
    render() {
        var self = this;
        return (
            <nav className="navbar">
                <div className="navbar-left">
                    <div className="navbar-item">
                        <button className="button is-primary" onClick={this.handlePrevButton}>{T.get('copy.PreviousLabel')}</button>
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="navbar-item">
                        <button className="button is-primary" onClick={this.handleNextButton}>{T.get('copy.NextLabel')}</button>
                    </div>
                </div>
            </nav>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default FilterBar;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
