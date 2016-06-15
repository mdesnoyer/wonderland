// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import FuzzyTime from '../core/FuzzyTime';
import Xylophone from '../core/Xylophone';
import HeroThumbnail from '../wonderland/HeroThumbnail';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';
import InputTextEdit from '../core/InputTextEdit';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoHeader = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        handleVideoOpenToggle: React.PropTypes.func,
        showVideoOpenToggle: React.PropTypes.bool.isRequired,
        forceOpen: React.PropTypes.bool.isRequired,
        videoState: React.PropTypes.string.isRequired,
        title: React.PropTypes.string,
        additionalClass: React.PropTypes.string,
        videoId: React.PropTypes.string.isRequired,
        created: React.PropTypes.string,
        thumbnails: React.PropTypes.array.isRequired
    },
    render: function() {
        var self = this,
            toggleButtonContent = self.props.forceOpen ? <Icon type="chevron-circle-up" nowrap={true} /> : <Icon type="chevron-circle-down" nowrap={true} />,
            toggleButton = (self.props.showVideoOpenToggle ? <a className="wonderland-toggle button is-medium">{toggleButtonContent}</a> : false),
            videoTranslatedState = T.get('copy.' + self.props.videoState + 'State'),
            xylophone = UTILS.NEON_SCORE_ENABLED ? <Xylophone thumbnails={self.props.thumbnails} /> : false
        ;
        return (
            <nav className="wonderland-video__header level is-marginless columns" onClick={self.props.handleVideoOpenToggle}>
                <div className="level-left column is-3">
                    <div className="level-item">
                        <a className={self.props.additionalClass} title={self.props.videoState}>
                            {videoTranslatedState}
                        </a>
                    </div>
                    <div className="level-item">
                        <HeroThumbnail
                            thumbnail={self.props.thumbnails[0]}
                        />
                    </div>
                </div>
                <div className="level-item column is-5">
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
                <div className="level-right column is-4">
                    <div className="level-item">
                        <span className="subtitle is-6"><FuzzyTime date={self.props.created} /></span>
                    </div>
                    <div className="level-item">
                        {xylophone}
                    </div>
                    <div className="level-item">
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
