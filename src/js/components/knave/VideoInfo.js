// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactSelect from 'react-select';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import Lift from './Lift';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoInfo = React.createClass({
    getInitialState: function() {
        var self = this,
            demographicOptions = [];
        if (self.props.demographicThumbnails && self.props.demographicThumbnails.length > 0) {
            self.props.demographicThumbnails.forEach(function (thumb, idx) {
                var demographicLabel = null;
                if (thumb.gender) {
                    demographicLabel = UTILS.FILTERS_GENER_ENUM[thumb.gender];
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
            videoState: self.props.videoState,
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
    render: function() {
        var self = this;
        return (
            <div>
                <h1 className="xxCollection-title">
                    {self.props.title}
                </h1>
                {(() => {
                    if (self.state.videoState === UTILS.VIDEO_STATE_ENUM.processing) {
                        return (
                            <div className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown">
                                <span>TODO</span>
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
