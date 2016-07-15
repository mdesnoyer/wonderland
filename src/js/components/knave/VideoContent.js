// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import VideoCollectionActions from './VideoCollectionActions';
import VideoInfo from './VideoInfo';
import ShareLink from './ShareLink';
import ShareEmail from './ShareEmail';
import VideoDelete from './VideoDelete';
import VideoFilters from './VideoFilters';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var defaultContent = 'info';

var VideoContent = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            contents: defaultContent
        }
    },
    render: function() {
        var self = this,
            contents
        ;
        switch(self.state.contents) {
            case 'info':
                contents = (
                    <div>
                        <VideoInfo
                            title={self.props.title}
                            handleMenuChange={self.handleMenuChange}
                            displayThumbLift={self.props.displayThumbLift}
                        />
                        <VideoCollectionActions handleMenuChange={self.handleMenuChange} />
                    </div>
                );
                break;
            case 'share':
                contents = (
                    <ShareLink 
                        handleMenuChange={self.handleMenuChange} 
                        shareToken={self.props.shareToken} 
                        videoId={self.props.videoId}
                    />
                );
                break;
            case 'email':
                contents = <ShareEmail handleMenuChange={self.handleMenuChange}/>;
                break;
            case 'delete':
                contents = (
                    <VideoDelete 
                        handleMenuChange={self.handleMenuChange}
                        videoId={self.props.videoId}
                        handleDelete={self.props.handleDelete}
                    />
                );
                break;
            case 'save':
                alert("TODO SAVE LINKED TO SIGN UP")
                break;
            case 'refilter':
                contents = (
                    <VideoFilters
                        handleMenuChange={self.handleMenuChange}
                        videoId={self.props.videoId}
                    />
                );
                break;
        }
        return <div>{contents}</div>;
    },
    handleMenuChange: function(e) {
        var self = this;
        self.setState({
            contents: e && e.target ? e.target.dataset.actionLabel : e || defaultContent
        });
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoContent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
