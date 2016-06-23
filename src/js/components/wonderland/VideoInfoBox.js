// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import ShareSection from '../core/ShareSection';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoInfoBox = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        isGuest: React.PropTypes.bool.isRequired,
        duration: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        experimentState: React.PropTypes.string.isRequired,
        winnerThumbnail: React.PropTypes.string,
        videoLink: React.PropTypes.string.isRequired,
        shareToken: React.PropTypes.string.isRequired,
        videoId: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this,
            niceDuration = UTILS.formatDuration(self.props.duration),
            videoLinkClass = (self.props.videoLink ? '' : ' is-hidden'),
            durationClass = (self.props.duration === 0 ? ' is-hidden' : ''),
            winnerDefTerm = (self.props.winnerThumbnail ? <dt className="wonderland-dt">Winner id</dt> : false),
            winnerDescTerm = (self.props.winnerThumbnail ? <dd className="wonderland-dd">{self.props.winnerThumbnail}</dd> : false)
        ;
        return (
            <aside className="box wonderland-box">
                <dl className="wonderland-dl">
                    <dt className={'wonderland-dt' + durationClass}>Duration</dt>
                        <dd className={'wonderland-dd' + durationClass}>{niceDuration}</dd>
                    <dt className="wonderland-dt">Original</dt>
                        <dd className="wonderland-dd"><a href={self.props.url} rel="external">Link</a></dd>
                    <dt className={'wonderland-dt' + videoLinkClass}>Direct</dt>
                        <dd className={'wonderland-dd' + videoLinkClass}><a href={self.props.videoLink}>Link</a></dd>
                    <dt className="wonderland-dt">{T.get('copy.analyzeVideo.experimentState')}</dt>
                        <dd className="wonderland-dd">{self.props.experimentState}</dd>
                    {winnerDefTerm}
                        {winnerDescTerm}
                    <dt className="wonderland-dt">Share</dt>
                        <dd className="wonderland-dt">
                            <ShareSection shareToken={self.props.shareToken} videoId={self.props.videoId} />
                        </dd>
                </dl>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoInfoBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
