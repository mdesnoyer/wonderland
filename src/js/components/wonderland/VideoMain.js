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
            thumbnails: self.props.thumbnails
        }
    },
    componentWillMount: function() {
        var self = this;
        if (self.state.thumbnails.length > 1 ) {
            if (self.state.thumbnails[self.state.thumbnails.length - 1].neon_score) {
                self.sendForLiftData();
                self.sendForValenceFeatureKeys(); 
            }
        }
    },
    sendForValenceFeatureKeys: function() {  
        var tidArray = [], 
            self=this, 
            options={}, 
            tToF={}
        ; 
        for (let t of self.state.thumbnails) {
            tidArray.push(t.thumbnail_id); 
        }
        var tids = tidArray.join(',');
        options.data = {
            thumbnail_id: tids, 
            fields: ['feature_ids', 'thumbnail_id'] 
        }
        self.GET('thumbnails', options)
            .then(function(res) {
                for (let t of res.thumbnails) {
                    var filtered = t.feature_ids.filter(
                        x => x[1] > 0.0005 && !(x[0].split('_')[1] in [0,1]));
                    tToF[t.thumbnail_id] = filtered; 
                }
                let tempThumbnails = self.state.thumbnails;
                for (let t of tempThumbnails) { 
                    t.prelim_valence_features = tToF[t.thumbnail_id];
                    t.final_valence_features = []; 
                }
                self.setState({
                    thumbnails: tempThumbnails
                }, function() {
                    return true;
                });
            }) 
            .catch(function(err) {
                console.log(err);
            }) // TODO clean up this nested then...
            .then(function() {
                var keys = [];  
                for (let t of self.state.thumbnails) {
                    for (let f of t.prelim_valence_features) { 
                        keys.push(f[0]); 
                    }  
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
                        let tempThumbnails = self.state.thumbnails;
                        for (let t of tempThumbnails) {
                            for (let pvf of t.prelim_valence_features) {
                                t.final_valence_features.push(fhash[pvf[0]]);  
                            } 
                        }
                        self.setState({
                            thumbnails: tempThumbnails
                        }, function() {
                            return true;
                        });
                    }) 
                    .catch(function(err) {
                        console.log(err);
                    })
                ; 
            }) 
        ;
    },  
    sendForLiftData: function() {
        var self = this,
            options = {}
        ;
        options.data = {
            base_id: self.state.thumbnails[self.state.thumbnails.length - 1].thumbnail_id,
            thumbnail_ids: self.parseLiftThumbnails(self.state.thumbnails)
        }
        self.GET('statistics/estimated_lift/', options)
            .then(function(res) {
                self.setState({
                    displayThumbLift: res.lift.find(x => x.thumbnail_id === self.state.thumbnails[0].thumbnail_id).lift,
                    liftArray: res.lift
                }, function() {
                    // We need to inject the lift into the Thumbnail object
                    let tempThumbnails = self.state.thumbnails;
                    for (let l of self.state.liftArray) {
                        for (let t of tempThumbnails) {
                            if (t.thumbnail_id === l.thumbnail_id) {
                                t.lift = l.lift;
                                break;
                            }
                        }
                    }
                    self.setState({
                        thumbnails: tempThumbnails
                    }, function() {
                        return true;
                    });
                });
            })
            .catch(function(err) {
                console.log(err);
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
