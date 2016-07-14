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
            demographicLabel = null;
        if (self.props.demographicThumbnails) {
            if (self.props.demographicThumbnails.gender) {
                demographicLabel = self.props.demographicThumbnails.gender;
            }
            if (self.props,demographicThumbnails.age) {
                demographicLabel = demographicLabel ? demographicLabel + ' / ' + self.props.demographicThumbnails.age : self.props.demographicThumbnails.age;
            }
        }
        return {
            useDemographic: self.props.useDemographic,
            demographicThumbnails: self.props.demographicThumbnails || [],
            demographicOptions: [
                {
                    label: 'None',
                    value: 0 // Have to use 0/1 as values because the ReactSelect element doesn't recognize true/false
                },
                {
                    label: demographicLabel || 'test',
                    value: 1
                }
            ]
        }
    },
    onDemographicChange: function(value) {
        this.props.handleDemographicChange(!!value.value); // Convert 1/0 to boolean
    },
    render: function() {
        var self = this;
        return (
            <div>
                <h1 className="xxCollection-title">
                    {self.props.title}
                </h1>
                <a className="xxCollectionFilterToggle"
                    data-action-label="refilter"
                    onClick={self.props.handleMenuChange} >
                </a>
                <div className="xxCollectionFilters">
                    <strong className="xxCollectionFilters-title">{T.get('label.filters')}</strong>
                    {(() => {
                        if (self.state.demographicThumbnails) {
                            return (
                                <ReactSelect
                                    id="useDemographic"
                                    className="xxCollectionFilters-value"
                                    onChange={self.onDemographicChange}
                                    value={self.state.useDemographic ? 1 : 0}
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
