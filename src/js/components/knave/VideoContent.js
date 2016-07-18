// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import VideoCollectionActions from './VideoCollectionActions';
import VideoInfo from './VideoInfo';
import ShareLink from './ShareLink';
import ShareEmail from './ShareEmail';
import VideoDelete from './VideoDelete';
import VideoFilters from './VideoFilters';
import Account from '../../mixins/Account';
import AjaxMixin from '../../mixins/Ajax';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var defaultContent = 'info';

var VideoContent = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    mixins: [AjaxMixin, Account],
    getInitialState: function() {
        var self = this;
        return {
            contents: defaultContent,
            shareUrl: ''
        }
    },
    componentWillMount: function() {
        var self = this;
        self.getAccount()
            .then(function(account) {
                self.GET('videos/share', {
                    data: {
                        video_id: self.props.videoId
                    }
                })
                .then(function(json) {
                    self.setState({
                        shareUrl: window.location.origin + '/share/video/' + self.props.videoId + '/account/' + account.accountId + '/token/' + json.share_token + '/'
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });
            })
            .catch(function(err) {
                console.log(err);
            })
        ;
    },
    render: function() {
        var self = this,
            contents
        ;
        switch(self.state.contents) {
            case 'info':
                contents = (self.props.isGuest) ? (
                    <VideoInfo
                        title={self.props.title}
                        handleMenuChange={self.handleMenuChange}
                        displayThumbLift={self.props.displayThumbLift}
                    />
                ) : (
                    <div>
                        <VideoInfo
                            title={self.props.title}
                            handleMenuChange={self.handleMenuChange}
                            displayThumbLift={self.props.displayThumbLift}
                        />
                        <VideoCollectionActions openSignUp={self.props.openSignUp} handleMenuChange={self.handleMenuChange} />
                    </div>
                );
                break;
            case 'share':
                contents = (
                    <ShareLink 
                        handleMenuChange={self.handleMenuChange} 
                        shareUrl={self.state.shareUrl}
                    />
                );
                break;
            case 'email':
                contents = <ShareEmail 
                                handleMenuChange={self.handleMenuChange}
                                thumbnails={self.props.thumbnails}
                                collectionUrl={self.state.shareUrl}
                            />;
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
