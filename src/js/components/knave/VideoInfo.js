// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactSelect from 'react-select';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Countdown from '../wonderland/Countdown';
import Lift from './Lift';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoInfo = React.createClass({
    getInitialState: function() {
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
        return {
            selectedDemographic: self.props.selectedDemographic,
            demographicThumbnails: self.props.demographicThumbnails,
            demographicOptions: demographicOptions
        }
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
        this.props.handleMenuChange('refresh');
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
                        if (self.props.timeRemaining !== null || self.props.timeRemaining <= 1) {

                            countdown = (
                                <span><Countdown seconds={self.props.timeRemaining} onFinish={self.onTimerFinished} classPrefix="xxCollectionFilterCountdown" /></span>
                                // <span><Countdown seconds={self.props.timeRemaining} onFinish={false} classPrefix="xxCollectionFilterCountdown" /></span>
                            );
                        }
                        else {
                            countdown = (
                                <span>{T.get('copy.pending')}</span>
                            );
                        }
                        return (
                            <div className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown">
                                {countdown}
                            </div>
                        );
                    } else {
                        return (
                            <a className="xxCollectionFilterToggle"
                                data-action-label="refilter"
                                onClick={self.props.handleMenuChange} >
                            </a>
                        );
                    }
                })()}
                <div className="xxCollectionFilters">
                    <strong className="xxCollectionFilters-title">{T.get('label.filters')}</strong>
                    {(() => {
                        if (self.state.demographicThumbnails) {
                            return (
                                <ReactSelect
                                    id="selectedDemographic"
                                    className="xxCollectionFilters-value"
                                    onChange={self.onDemographicChange}
                                    value={self.state.selectedDemographic || 0}
                                    options={self.state.demographicOptions}
                                    clearable={false}
                                />
                            );
                        } else {
                            return (
                                <span className="xxCollectionFilters-value">None</span>
                            );
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
