// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Thumbnails from './Thumbnails';
import T from '../../modules/translation';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import VideoContent from '../knave/VideoContent';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoMain = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
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
            experimentState: T.get('copy.unknown'),
            winnerThumbnail: '',
            isHidden: false,
            liftArray: [],
            displayThumbLift: 0
        }
    },
    componentWillMount: function() {
        var self = this;
        if (self.props.thumbnails.length > 1) {
            self.sendForLiftData();    
        }
    },
    sendForLiftData: function() {
        var self = this,
            options = {}
        ;
            options.data = {
                base_id: self.props.thumbnails[self.props.thumbnails.length - 1].thumbnail_id,
                thumbnail_ids: self.parseLiftThumbnails(self.props.thumbnails)
            }
            self.GET('statistics/estimated_lift/', options)
                .then(function(res) {
                    self.setState({
                        displayThumbLift: res.lift.find(x=> x.thumbnail_id === self.props.thumbnails[0].thumbnail_id).lift,
                        liftArray: res.lift
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });
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
                            handleDelete={self.handleDelete}
                            shareToken={self.props.shareToken}
                            displayThumbLift={self.state.displayThumbLift}
                        />
                    </div>
                        <Thumbnails
                            isGuest={self.props.isGuest}
                            thumbnails={self.props.thumbnails}
                            videoState={self.props.videoState}
                            videoId={self.props.videoId}
                            shareToken={self.props.shareToken}
                            accountId={self.props.accountId}
                            handleChildOnMouseEnter={self.handleChildOnMouseEnter}
                        />
                </article>
            );
        }
    },
    handleChildOnMouseEnter: function(thumbnail_id) {
        var self = this,
            liftArray = self.state.liftArray
        ;
        self.setState({
            displayThumbLift: liftArray.find(x=> x.thumbnail_id === thumbnail_id).lift
        });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
