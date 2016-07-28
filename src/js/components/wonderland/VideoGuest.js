// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import E from '../../modules/errors';
import Message from './Message';
import VideoMain from './VideoMain';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoGuest = React.createClass({
    propTypes: {
        accountId: React.PropTypes.string.isRequired,
        created: React.PropTypes.string.isRequired,
        demographicThumbnails: React.PropTypes.array.isRequired,
        duration: React.PropTypes.number.isRequired,
        selectedDemographic: React.PropTypes.number.isRequired,
        shareToken: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        videoId: React.PropTypes.string.isRequired,
        videoState: React.PropTypes.string.isRequired
    },
    noop: function() {},
    render: function() {
        var self = this;
        try {
            switch(self.props.mode) {
                case 'loading':
                    return null;
                case 'error':
                    return (
                        <Message header={'ERROR Heading TODO'} body={E.getErrors()} flavour="danger" />
                    );
                case 'success':
                    return (
                            <VideoMain
                                accountId={self.props.accountId}
                                badThumbs={self.props.badThumbs}
                                created={self.props.created}
                                demographicThumbnails={self.props.demographicThumbnails} 
                                duration={self.props.duration}
                                isGuest={true}
                                isMobile={false}
                                messageNeededComponent={false}
                                onDemoChange={self.noop}
                                openLearnMore={self.noop}
                                openSignUp={self.noop}
                                refreshVideo={self.noop}
                                selectedDemographic={self.props.selectedDemographic}
                                setTooltipText={self.noop}
                                shareToken={self.props.shareToken}
                                timeRemaining={0}
                                title={self.props.title}
                                url={self.props.url}
                                videoId={self.props.videoId}
                                videoState={self.props.videoState}
                            />
                    );
            }
        } catch (e) {
            console.error(e);
        }
    },
    componentWillUnmount: function(e) {
        E.clearErrors();
    },
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoGuest;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
