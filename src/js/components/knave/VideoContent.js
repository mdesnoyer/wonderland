// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import TRACKING from '../../modules/tracking';
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
            shareUrl: '', 
            selectedDemographic: self.props.selectedDemographic || 0
        }
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        if (nextProps.selectedDemographic !== undefined) {
            self.setState({
                selectedDemographic: nextProps.selectedDemographic
            });
        }
        if (nextProps.timeRemaining) {
            self.setState({
                timeRemaining: nextProps.timeRemaining,
            });
        }
    }, 
    componentWillMount: function() {
        var self = this;
        if (!self.props.isGuest) {
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
        }
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
                        isGuest={self.props.isGuest}
                    />
                ) : (
                    <div>
                        <VideoInfo
                            title={self.props.title}
                            handleMenuChange={self.handleMenuChange}
                            videoState={self.props.videoState}
                            handleDemographicChange={self.props.handleDemographicChange}
                            selectedDemographic={self.props.selectedDemographic}
                            demographicThumbnails={self.props.demographicThumbnails}
                            timeRemaining={self.state.timeRemaining}
                            displayThumbLift={self.props.displayThumbLift}
                        />
                        <VideoCollectionActions
                            openSignUp={self.props.openSignUp}
                            handleMenuChange={self.handleMenuChange}
                        />
                    </div>
                );
                break;
            case 'share':
                contents = (
                    <ShareLink 
                        handleMenuChange={self.handleMenuChange} 
                        shareUrl={self.state.shareUrl}
                        videoId={self.props.videoId}
                        setTooltipText={self.props.setTooltipText}
                    />
                );
                break;
            case 'email':
                contents = <ShareEmail 
                                handleMenuChange={self.handleMenuChange}
                                thumbnails={self.props.demographicThumbnails[self.state.selectedDemographic].thumbnails}
                                collectionUrl={self.state.shareUrl}
                                videoId={self.props.videoId}
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
                        handleMenuChange={self.refilterMenuChange}
                        handleBackClick={self.handleBackClick}
                        handleDemographicChange={self.props.handleDemographicChange}
                        selectedDemographic={self.props.selectedDemographic}
                        videoId={self.props.videoId}
                    />
                );
                break;
        }
        return <div>{contents}</div>;
    },
    refilterMenuChange: function(age, gender, is_new_video=false) {
        var self = this;
        self.setState({
            contents: 'info'
        }, function () {
            if (is_new_video) {
                self.props.refreshVideo(true, age, gender);
            } 
        });
    },
    handleBackClick: function(e) { 
        var self = this,
            value = e && e.target ? e.target.dataset.actionLabel : e || defaultContent
        ;
        self.setState({
           contents: value
        });
    },  
    handleMenuChange: function(e) {
        var self = this,
            value = e && e.target ? e.target.dataset.actionLabel : e || defaultContent
        ;
        if (value === 'refresh') {
            self.setState({
                contents: 'info'
            }, function () {
                self.props.refreshVideo(true);
            });
        }
        else {
            self.setState({
                contents: value
            });
        }
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoContent;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
