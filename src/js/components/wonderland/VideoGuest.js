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
                                created={self.props.created}
                                demographicThumbnails={self.props.demographicThumbnails} 
                                duration={self.props.duration}
                                isGuest={true}
                                messageNeededComponent={false}
                                selectedDemographic={self.props.selectedDemographic}
                                shareToken={self.props.shareToken}
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
