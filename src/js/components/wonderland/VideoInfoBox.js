// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoInfoBox = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        isGuest: React.PropTypes.bool.isRequired,
        videoLink: React.PropTypes.string,
        duration: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this,
            niceDuration = UTILS.formatDuration(self.props.duration),
            videoLinkClass = (self.props.videoLink ? '' : ' is-hidden'),
            durationClass = (self.props.duration === 0 ? ' is-hidden' : '')
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
                </dl>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoInfoBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
