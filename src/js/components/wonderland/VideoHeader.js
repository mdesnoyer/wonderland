
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TimeAgoWrapper from '../core/TimeAgoWrapper';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoHeader = React.createClass({
    handleToggle: function(e) {
        e.preventDefault();
        this.props.handleToggle();
    },
    render: function() {
        var toggleButtonContent = this.props.size === 'small' ? '\u2191' : '\u2193',
            toggleButton = '', 
            title = '',
            videoTranslatedState = T.get('copy.' + this.props.videoState + 'State')
        ;
        if (!this.props.forceOpen) {
            if (this.props.videoState === 'processed' || this.props.videoState === 'serving') {
                toggleButton = <a className="button" onClick={this.handleToggle}>{toggleButtonContent}</a>;
            }
        }
        if (this.props.forceOpen) {
            title = this.props.displayTitle;
        }
        else {
            title = <a href={this.props.videoLink}>{this.props.displayTitle}</a>;
        }
        return (
            <nav className="navbar is-marginless">
                <div className="navbar-left">
                    <div className="navbar-item">
                        <a className={this.props.additionalClass}>
                            {videoTranslatedState}
                        </a>
                    </div>
                    <div className="navbar-item">
                        <h2 className="title is-5">{title}</h2>
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="navbar-item">
                        <span className="subtitle is-6"><TimeAgoWrapper date={this.props.publishDate} /></span>
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
