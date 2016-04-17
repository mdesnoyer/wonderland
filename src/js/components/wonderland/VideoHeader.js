// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import TimeAgoWrapper from '../core/TimeAgoWrapper';
import Xylophone from '../core/Xylophone';
import HeroThumbnail from '../wonderland/HeroThumbnail';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var VideoHeader = React.createClass({
    propTypes: {
        handleVideoOpenToggle: React.PropTypes.func.isRequired,
        forceOpen: React.PropTypes.bool.isRequired,
        title: React.PropTypes.string,
        videoId: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this,
            toggleButtonContent = self.props.forceOpen ? <i className="fa fa-chevron-up" aria-hidden="true"></i> : <i className="fa fa-chevron-down" aria-hidden="true"></i>,
            toggleButton = <a className="button is-medium" onClick={self.props.handleVideoOpenToggle}>{toggleButtonContent}</a>,
            videoTranslatedState = T.get('copy.' + self.props.videoState + 'State'),
            displayTitle = self.props.title || self.props.videoId,
            xylophone = UTILS.NEON_SCORE_ENABLED ? <Xylophone thumbnails={self.props.thumbnails} /> : ''
        ;
        return (
            <nav className="wonderland-video__header navbar is-marginless" onClick={self.props.handleVideoOpenToggle}>
                <div className="navbar-left">
                    <div className="navbar-item">
                        <a className={self.props.additionalClass} title={self.props.videoState}>
                            {videoTranslatedState}
                        </a>
                    </div>
                    <div className="navbar-item">
                        <HeroThumbnail
                            thumbnail={self.props.thumbnails[0]}
                        />
                    </div>
                    <div className="navbar-item">
                        <h2 className="title is-5" title={self.props.videoId}>{displayTitle}</h2>
                    </div>
                </div>
                <div className="navbar-right">
                    <div className="navbar-item">
                        <span className="subtitle is-6"><TimeAgoWrapper date={self.props.created} /></span>
                    </div>
                    <div className="navbar-item">
                        {xylophone}
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
