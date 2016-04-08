// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TimeAgoWrapper from '../core/TimeAgoWrapper';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoHeader = React.createClass({
    propTypes: {
        handleToggle: React.PropTypes.func,
        forceOpen: React.PropTypes.boolean
    },
    handleToggle: function(e) {
        var self = this;
        e.preventDefault();
        self.props.handleToggle();
    },
    render: function() {
        var self = this,
            toggleButtonContent = self.props.forceOpen ? '\u2191' : '\u2193',
            toggleButton = <a className="button" onClick={self.handleToggle}>{toggleButtonContent}</a>, 
            title = '',
            videoTranslatedState = T.get('copy.' + self.props.videoState + 'State')
        ;
        if (self.props.forceOpen) {
            title = self.props.displayTitle;
        }
        else {
            title = <a href={self.props.videoLink}>{self.props.displayTitle}</a>;
        }
        return (
            <nav className="navbar is-marginless">
                <div className="navbar-left">
                    <div className="navbar-item">
                        <a className={self.props.additionalClass}>
                            {videoTranslatedState}
                        </a>
                    </div>
                    <div className="navbar-item">
                        <h2 className="title is-5" title={self.props.videoId}>{title}</h2>
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="navbar-item">
                        <span className="subtitle is-6"><TimeAgoWrapper date={self.props.created} /></span>
                    </div>
                    <div className="navbar-item">
                        {toggleButton}
                    </div>
                </div>
            </nav>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default VideoHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
