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
        shareToken: React.PropTypes.string
    },
    getInitialState: function() {
        var self = this;
        return {
            isLoading: false,
            isHidden: false,
            liftArray: [],
            displayThumbLift: 0,
            maxLift: 0,
            selectedDemographic: self.props.selectedDemographic || 0 // default to not showing demographic thumbs (support old videos)
        }
    },
    componentWillMount: function() {
        var self = this, 
            selectedDemographic = self.state.selectedDemographic || 0,
            thumbs = self.props.demographicThumbnails[selectedDemographic] 
        ;
        self.setState({ 
            defaultThumbnail: UTILS.findDefaultThumbnail(thumbs) 
        }, function() { 
            if (thumbs.thumbnails.length > 1) {
                if (thumbs.thumbnails[thumbs.thumbnails.length - 1].neon_score) {
                    self.sendForLiftData(thumbs);
                    self.sendForValenceFeatureKeys(thumbs.thumbnails);
                }
            } 
        }); 
    },
    componentWillReceiveProps: function(nextProps, nextState) {
        if (this.props.selectedDemographic !== nextProps.selectedDemographic) { 
            if (nextProps.demographicThumbnails && 
              nextProps.demographicThumbnails[nextProps.selectedDemographic]) { 
                var thumbs = nextProps.demographicThumbnails[nextProps.selectedDemographic];
                if (thumbs.thumbnails[thumbs.thumbnails.length-1].neon_score) {
                    this.setState({ 
                        defaultThumbnail: UTILS.findDefaultThumbnail(thumbs), 
                        selectedDemographic: nextProps.selectedDemographic,
                        demographicThumbnails: thumbs 
                    }, function() { 
                        this.sendForLiftData(thumbs);
                        this.sendForValenceFeatureKeys(thumbs.thumbnails);
                    }); 
                }
            } 
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
    sendForLiftData: function(thumbSet) {
        var self = this;
        var defaultThumbnail = self.state.defaultThumbnail; 
        var interestingThumbnails = thumbSet.thumbnails.filter(
            x => x.type === 'neon' || x.type === 'customupload');
        var badThumbnails = thumbSet.bad_thumbnails.filter(
            x => x.type === 'bad_neon');
        var tidList = self.parseLiftThumbnails(interestingThumbnails) + 
            ',' + self.parseLiftThumbnails(badThumbnails); 
        var options = {
                data: {
                    base_id: defaultThumbnail.thumbnail_id,
                    thumbnail_ids: tidList,
                    gender : thumbSet.gender,
                    age : thumbSet.age
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
                // The minimum lift possible mathematically is -100%
                var maxLift = -1.0;  
                for (let l of res.lift) {
                    liftHash[l.thumbnail_id] = l.lift; 
                    if (l.lift > maxLift && 
                        res.baseline_thumbnail_id !== l.thumbnail_id) { 
                        maxLift = l.lift; 
                    }
                }
                for (let t of thumbSet.thumbnails) {
                    t.lift = liftHash[t.thumbnail_id]; 
                }
                for (let b of thumbSet.bad_thumbnails) {
                    b.lift = liftHash[b.thumbnail_id];
                }

                var dThumbSet = self.props.demographicThumbnails; 
                dThumbSet[self.props.selectedDemographic].thumbnails = thumbSet.thumbnails;
                dThumbSet[self.props.selectedDemographic].bad_thumbnails = thumbSet.bad_thumbnails;
                self.setState({
                    displayThumbLift: maxLift,
                    maxLift: maxLift,
                    liftArray: res.lift,
                    demographicThumbnails: dThumbSet 
                });
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
                    <article className="xxCollection xxCollection--video"
                             onMouseLeave={self.displayMaxLift}>
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
                        defaultThumbnail={self.state.defaultThumbnail} 
                        videoState={self.props.videoState}
                        videoId={self.props.videoId}
                        shareToken={self.props.shareToken}
                        accountId={self.props.accountId}
                        handleChildOnMouseEnter={self.handleChildOnMouseEnter}
                        displayThumbLift={self.state.displayThumbLift}
                        isMobile={self.props.isMobile}
                        openLearnMore={self.props.openLearnMore}
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
    },
    displayMaxLift: function() {
        var self = this;
        self.setState({
            displayThumbLift: self.state.maxLift
        });
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoMain;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
