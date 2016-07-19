// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnails from './Thumbnails';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import VideoContent from '../knave/VideoContent';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoMain = React.createClass({
    mixins: [AjaxMixin],
    propTypes: {
        isGuest: React.PropTypes.bool.isRequired,
        accountId: React.PropTypes.string,
        videoId: React.PropTypes.string.isRequired,
        thumbnails: React.PropTypes.array.isRequired,
        videoState: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        created: React.PropTypes.string,
        shareToken: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            isLoading: false,
            isHidden: false,
            liftArray: [],
            displayThumbLift: 0,
            thumbnails: self.props.thumbnails,
            selectedDemographic: false, // default to not showing demographic thumbs (support old videos)
        }
    },
    componentWillMount: function() {
        var self = this;
        if (self.state.thumbnails[self.state.thumbnails.length - 1].neon_score) {
            self.sendForLiftData();
        }
    },
    sendForLiftData: function() {
        var self = this,
            options = {}
        ;
        options.data = {
            video_id: self.props.videoId,
            base_id: self.state.thumbnails[self.state.thumbnails.length - 1].thumbnail_id,
            thumbnail_ids: self.parseLiftThumbnails(self.state.thumbnails)
        };
        if (self.props.isGuest) {
            options.data.share_token = self.props.shareToken;
            options.overrideAccountId = self.props.accountId;
        }
        self.GET('statistics/estimated_lift/', options)
            .then(function(res) {
                // We need to inject the lift into the Thumbnail object
                let tempThumbnails = self.state.thumbnails;
                for (let l of res.lift) {
                    for (let t of tempThumbnails) {
                        if (t.thumbnail_id === l.thumbnail_id) {
                            t.lift = l.lift;
                            break;
                        }
                    }
                }
                self.setState({
                    displayThumbLift: res.lift.find(x => x.thumbnail_id === self.state.thumbnails[0].thumbnail_id).lift,
                    liftArray: res.lift,
                    thumbnails: tempThumbnails
                });
            })
            .catch(function(err) {
                console.log(err);
                self.setState({
                    isHidden: true
                });
            })
        ;
    },
    parseLiftThumbnails: function(thumbnails) {
        var self = this,
            parseLiftThumbnailsArray = []
        ;
        thumbnails.map(function(thumbnail, i) {
            if (i < thumbnails.length - 1) {
                parseLiftThumbnailsArray.push(thumbnail.thumbnail_id);
            }
        });
        return parseLiftThumbnailsArray.join(',');
    },
    handleDelete: function(e) {
        var self = this;
        self.setState({
            isHidden: true
        });
    },
    handleDemographicChange: function(value) {
        var self = this,
            thumbs
        ;
        if (self.props.demographicThumbnails[value] && self.props.demographicThumbnails[value].thumbnails) {
            thumbs = self.props.demographicThumbnails[value].thumbnails;
        }
        else {
            thumbs = self.props.thumbnails;
            value = false;
        }
        self.setState({
            selectedDemographic: value,
            thumbnails: thumbs,
            videoState: UTILS.VIDEO_STATE_ENUM.processing
        }, function () {
            if (self.state.thumbnails[self.state.thumbnails.length - 1].neon_score) {
                self.sendForLiftData();
            }
        });
    },
    render: function() {
        var self = this;
        if (self.state.isHidden) {
            return null;
        }
        else {
            return (
                <article className="xxCollection xxCollection--video">
                    <div className="xxCollection-content">
                        <VideoContent
                            title={self.props.title}
                            videoId={self.props.videoId}
                            videoState={self.props.videoState}
                            demographicThumbnails={self.props.demographicThumbnails}
                            timeRemaining={self.props.timeRemaining}
                            selectedDemographic={self.state.selectedDemographic}
                            handleDemographicChange={self.handleDemographicChange}
                            refreshVideo={self.props.refreshVideo}
                            handleDelete={self.handleDelete}
                            shareToken={self.props.shareToken}
                            displayThumbLift={self.state.displayThumbLift}
                            openSignUp={self.props.openSignUp}
                            thumbnails={self.state.thumbnails}
                            isGuest={self.props.isGuest}
                        />
                    </div>
                    <Thumbnails
                        thumbnails={self.state.thumbnails}
                        videoState={self.props.videoState}
                        videoId={self.props.videoId}
                        shareToken={self.props.shareToken}
                        accountId={self.props.accountId}
                        handleChildOnMouseEnter={self.handleChildOnMouseEnter}
                        displayThumbLift={self.state.displayThumbLift}
                        isMobile={self.props.isMobile}
                        badThumbs={self.props.badThumbs}
                    />
                </article>
            );
        }
    },
    handleChildOnMouseEnter: function(thumbnailId) {
        var self = this,
            liftArray = self.state.liftArray
        ;
        if (liftArray.length > 1) {
            self.setState({
                displayThumbLift: liftArray.find(x => x.thumbnail_id === thumbnailId).lift
            });
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
