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
            selectedDemographic: self.props.selectedDemographic || 0 // default to not showing demographic thumbs (support old videos)
        }
    },
    componentWillMount: function() {
        
        var self = this, 
            selectedDemographic = self.state.selectedDemographic || 0,
            thumbs = self.props.demographicThumbnails[selectedDemographic].thumbnails
        ;
        if (thumbs.length > 1) {
            if (thumbs[thumbs.length - 1].neon_score) {
                self.sendForLiftData(thumbs);
                self.sendForValenceFeatureKeys(thumbs);
            }
        } 
    },
    componentWillReceiveProps: function(nextProps, nextState) {
        if (this.props.selectedDemographic !== nextProps.selectedDemographic) { 
            if (nextProps.demographicThumbnails && 
              nextProps.demographicThumbnails[nextProps.selectedDemographic]) { 
                var thumbs = nextProps.demographicThumbnails[nextProps.selectedDemographic].thumbnails;
                if (thumbs[thumbs.length - 1].neon_score) {
                    this.sendForLiftData(thumbs);
                    this.sendForValenceFeatureKeys(thumbs);
                }
                var demoSet = this.props.demographicThumbnails[nextProps.selectedDemographic];
            } 
            this.setState({
                selectedDemographic: nextProps.selectedDemographic,
                demographicThumbnails: demoSet
            });
        }
        if (nextProps.timeRemaining || nextState.timeRemaining) {
            this.setState({
                timeRemaining: nextProps.timeRemaining,
            }); 
        }
    },
    sendForValenceFeatureKeys: function(in_thumbnails) {
        var tidArray = [],
            self = this,
            options = {},
            tidToFeatures = {}
        ;
        for (let t of in_thumbnails) {
            tidArray.push(t.thumbnail_id);
        }
        var tids = tidArray.join(',');
        options.data = {
            thumbnail_id: tids,
            fields: ['feature_ids', 'thumbnail_id']
        }
        // Guest's request needs host's account id, share token and video id.
        if (self.props.isGuest) {
            options.overrideAccountId = self.props.accountId;
            options.data.share_token = self.props.shareToken;
        }
        self.GET('thumbnails', options)
            .then(function(res) {
                for (let t of res.thumbnails) {
                    // feature_ids is all the features that are in our
                    // system, and a confidence score, only grab those with
                    // a threshold of above 0.0005 and not in indexes 0, 1
                    // since all of them have them.
                    if (t.feature_ids && t.feature_ids.length > 0) {
                        tidToFeatures[t.thumbnail_id] = t.feature_ids.filter(
                            x => x[1] > UTILS.VALENCE_THRESHOLD &&
                            !(x[0].split('_')[1] in UTILS.VALENCE_IGNORE_INDEXES));
                    }
                }
                let tempThumbnails = in_thumbnails;
                for (let t of tempThumbnails) {
                    t.prelim_valence_features = tidToFeatures[t.thumbnail_id];
                    t.final_valence_features = [];
                }
                return tempThumbnails;
            })
            .catch(function(err) {
                console.log(err);
            })
            .then(function(tempThumbnails) {
                var keys = [];
                for (let t of tempThumbnails) {
                    if (!t.prelim_valence_features) {
                        continue;
                    }
                    for (let f of t.prelim_valence_features) {
                        keys.push(f[0]);
                    }
                }
                if (keys.length === 0) {
                    return
                }
                options = {
                    noAccountId: true
                }
                options.data = {
                    key: keys
                }
                self.GET('feature', options)
                    .then(function(res) {
                        var fhash = {};
                        for (let f of res.features) {
                            fhash[f.model_name+'_'+f.index] = f.name;
                        }
                        for (let t of tempThumbnails) {
                            for (let pvf of t.prelim_valence_features) {
                                t.final_valence_features.push(fhash[pvf[0]]);
                            }
                        }
                        var dThumbSet = self.props.demographicThumbnails;
                        var selectedDemographic = self.state.selectedDemographic || 0; 
                        if (dThumbSet) { 
                            dThumbSet[selectedDemographic].thumbnails = tempThumbnails;
                            self.setState({
                                demographicThumbnails: dThumbSet
                            });
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
                ;
            })
        ;
    },
    sendForLiftData: function(in_thumbnails) {
        var default_thumbnail = in_thumbnails.find(x => x.type == 'default'); 
        if (!default_thumbnail) { 
            default_thumbnail = in_thumbnails[0]; 
        } 
        var self = this,
            options = {
                data: {
                    video_id: self.props.videoId,
                    base_id: default_thumbnail.thumbnail_id,
                    thumbnail_ids: self.parseLiftThumbnails(in_thumbnails)
                }
            }
        ;
        if (self.props.isGuest) {
            options.data.share_token = self.props.shareToken;
            options.overrideAccountId = self.props.accountId;
        }
        self.GET('statistics/estimated_lift/', options)
            .then(function(res) {
                // We need to inject the lift into the Thumbnail object
                var liftHash = {}
                var maxLift = 0;  
                for (let l of res.lift) {
                    liftHash[l.thumbnail_id] = l.lift; 
                    if (l.lift > maxLift) { 
                        maxLift = l.lift; 
                    }
                }
                for (let t of in_thumbnails) {
                    t.lift = liftHash[t.thumbnail_id]; 
                }
                if (maxLift) { 
                    var dThumbSet = self.props.demographicThumbnails; 
                    dThumbSet[self.props.selectedDemographic].thumbnails = in_thumbnails;
                    self.setState({
                        displayThumbLift: maxLift,
                        liftArray: res.lift,
                        demographicThumbnails: dThumbSet 
                    });
                } 
            })
            .catch(function(err) {
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
        for (let t of thumbnails) { 
            parseLiftThumbnailsArray.push(t.thumbnail_id);
        } 
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
        if (self.props.onDemoChange) { 
            self.props.onDemoChange(value); 
        } 
        self.setState({
            selectedDemographic: value,
            demographicThumbnails: self.props.demographicThumbnails
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
                            selectedDemographic={self.state.selectedDemographic}
                            timeRemaining={self.props.timeRemaining}
                            handleDemographicChange={self.handleDemographicChange}
                            refreshVideo={self.props.refreshVideo}
                            handleDelete={self.handleDelete}
                            shareToken={self.props.shareToken}
                            displayThumbLift={self.state.displayThumbLift}
                            openSignUp={self.props.openSignUp}
                            isGuest={self.props.isGuest}
                            setTooltipText={self.props.setTooltipText}
                        />
                    </div>
                    <Thumbnails
                        demographicThumbnails={self.props.demographicThumbnails}
                        selectedDemographic={self.state.selectedDemographic}
                        videoState={self.props.videoState}
                        videoId={self.props.videoId}
                        shareToken={self.props.shareToken}
                        accountId={self.props.accountId}
                        handleChildOnMouseEnter={self.handleChildOnMouseEnter}
                        displayThumbLift={self.state.displayThumbLift}
                        isMobile={self.props.isMobile}
                    />
                </article>
            );
        }
    },
    handleChildOnMouseEnter: function(thumbnailId) {
        var self = this,
            liftArray = self.state.liftArray, 
            lift = null 
        ;
        if (liftArray.length > 1) {
            var found_obj = liftArray.find(x => x.thumbnail_id === thumbnailId);
            if (found_obj) { 
                lift = found_obj.lift; 
            } 
            self.setState({
                displayThumbLift: lift 
            });
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
