// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import UTILS from '../../modules/utils';
import ShareSection from '../core/ShareSection';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoInfoBox = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        videoLink: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number,
        url: React.PropTypes.string.isRequired
    },
    render: function() {
        var self = this,
            niceDuration = UTILS.formatDuration(self.props.duration)
        ;
        return (
            <aside className="box wonderland-box">
                <dl className="wonderland-dl">
                    <dt className="wonderland-dt">Duration</dt>
                        <dd className="wonderland-dd">{niceDuration}</dd>
                    <dt className="wonderland-dt">Original</dt>
                        <dd className="wonderland-dd"><a href={self.props.url} rel="external">Link</a></dd>
                    <dt className="wonderland-dt">Direct</dt>
                        <dd className="wonderland-dd"><a href={self.props.videoLink}>Link</a></dd>
                    <dt className="wonderland-dt">Share</dt>
                        <dd className="wonderland-dt">
                            <ShareSection url={self.props.videoLink} score={self.props.cookedNeonScore} />
                        </dd>
                </dl>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoInfoBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
