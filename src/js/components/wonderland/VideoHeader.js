// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import FuzzyTime from '../core/FuzzyTime';
import Xylophone from '../core/Xylophone';
import HeroThumbnail from '../wonderland/HeroThumbnail';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import InputTextEdit from '../core/InputTextEdit';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoHeader = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        handleVideoOpenToggle: React.PropTypes.func.isRequired,
        forceOpen: React.PropTypes.bool.isRequired,
        title: React.PropTypes.string,
        videoId: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        created: React.PropTypes.string,
        videoState: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this,
            toggleButtonContent = self.props.forceOpen ? <i className="fa fa-chevron-circle-up" aria-hidden="true"></i> : <i className="fa fa-chevron-circle-down" aria-hidden="true"></i>,
            toggleButton = <a className="button is-medium">{toggleButtonContent}</a>,
            videoTranslatedState = T.get('copy.' + self.props.videoState + 'State'),
            xylophone = UTILS.NEON_SCORE_ENABLED ? <Xylophone thumbnails={self.props.thumbnails} /> : ''
        ;
        return (
            <nav className="wonderland-video__header navbar is-marginless columns" onClick={self.props.handleVideoOpenToggle}>
                <div className="navbar-left column is-3">
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
                </div>
                <div className="navbar-item column is-5">
                    <InputTextEdit
                        valueDest="videos"
                        value={self.props.title}
                        videoState={self.props.videoState}
                        fallbackValue={T.get('copy.videosPage.VideoProcessMsg')}
                        idType="video_id"
                        valueId={self.props.videoId}
                        valueType="title"
                        classStyle="title is-5"
                    />
                </div>
                <div className="navbar-right column is-4">
                    <div className="navbar-item">
                        <span className="subtitle is-6"><FuzzyTime date={self.props.created} /></span>
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
