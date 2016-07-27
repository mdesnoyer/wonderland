// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactSelect from 'react-select';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Countdown from '../wonderland/Countdown';
import Lift from './Lift';
import ReactTooltip from 'react-tooltip';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoInfo = React.createClass({
    getInitialState: function() {
        var self = this,
            demographicOptions = []
        ;
        return {
            selectedDemographic: self.props.selectedDemographic,
            demographicThumbnails: self.props.demographicThumbnails,
            demographicOptions: self.getDemographicOptions() 
        }
    },
    componentDidMount: function() {
        ReactTooltip.rebuild();
    },
    componentWillReceiveProps: function(nextProps) {
        if (this.props.demographicThumbnails.length !== 
              nextProps.demographicThumbnails.length) { 
            var dos = this.getDemographicOptions(); 
            this.setState({ 
                demographicOptions: dos, 
                demographicThumbnails: nextProps.demographicThumbnails        
            });
            // Since we default to not showing the None, we need to 
            // see if the length is exactly 2 -- after a thumbnail change 
            // if it is set the selectedDemographic to 1 instead of 0
            if (nextProps.demographicThumbnails.length === 2) { 
                this.setState({ 
                    selectedDemographic: 1 
                }); 
            }  
        } 
        if (this.props.selectedDemographic !== nextProps.selectedDemographic) { 
            this.setState({
                selectedDemographic: nextProps.selectedDemographic
            });
        }
        if (!this.props.timeRemaining) { 
            this.setState({
                timeRemaining: nextProps.timeRemaining
            });
        }
    },
    getDemographicOptions: function() { 
        var self = this,
            demographicOptions = []
        ;
        if (self.props.demographicThumbnails && self.props.demographicThumbnails.length > 0) {
            self.props.demographicThumbnails.forEach(function (thumb, idx) {
                var demographicLabel = null;
                if (thumb.gender) {
                    demographicLabel = UTILS.FILTERS_GENDER_ENUM[thumb.gender];
                }
                if (thumb.age) {
                    demographicLabel = demographicLabel ? demographicLabel + ' / ' + thumb.age : thumb.age;
                }
                if (demographicLabel === null) {
                    demographicLabel = 'None';
                }
                demographicOptions.push({
                    label: demographicLabel,
                    value: idx
                });
            });
        }
        return demographicOptions; 
    },
    onDemographicChange: function(value) {
        var self = this;
        self.setState({
            selectedDemographic: value
        }, function () {
            self.props.handleDemographicChange(value.value);
        });
    },
    onTimerFinished: function() {
        return
    },
    render: function() {
        var self = this,
            countdown;
        return (
            <div>
                <h1 className="xxCollection-title">
                    {self.props.title}
                </h1>
                {(() => {
                    if (self.props.videoState === UTILS.VIDEO_STATE_ENUM.processing) {
                        if (self.props.timeRemaining !== null && self.props.timeRemaining >= 1) {
                            countdown = (
                                <span><Countdown 
                                    seconds={self.props.timeRemaining} 
                                    onFinish={self.onTimerFinished} 
                                    classPrefix="xxCollectionFilterCountdown" />
                                </span>
                            );
                        }
                        else {
                            countdown = (
                                <span>{T.get('timer.loading')}</span>
                            );
                        }
                        return (
                            <div className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown">
                                {countdown}
                            </div>
                        );
                    } else if (!self.props.isGuest) {
                        return (
                            <a className="xxCollectionFilterToggle"
                                data-action-label="refilter"
                                data-for="staticTooltip"
                                data-tip={T.get('tooltip.refilter.button')}
                                onClick={self.props.handleMenuChange} >
                            </a>
                        );
                    }
                })()}
                <div className="xxCollectionFilters">
                    <strong className="xxCollectionFilters-title">{T.get('label.filters')}</strong>
                    {(() => {
                        // Show the demographic selector if they've run more than just the default.
                        if (self.state.demographicThumbnails && self.state.demographicThumbnails.length > 1) {
                            return (
                                <ReactSelect
                                    id="selectedDemographic"
                                    className="xxCollectionFilters-value"
                                    onChange={self.onDemographicChange}
                                    options={self.getDemographicOptions()}
                                    value={self.state.selectedDemographic || 0}
                                    clearable={false}
                                />
                            );
                        } else {
                            return null;
                        }
                    })()}
                </div>
                <Lift displayThumbLift={self.props.displayThumbLift}/>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoInfo

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
