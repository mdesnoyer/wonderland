// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import Countdown from '../wonderland/Countdown';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
const DemographicFilters = React.createClass({

    propTypes: {

        // Array [<gender>, <age>] where each is a number key of its enum
        // e.g., [1, 1] male, 18-19
        selectedDemographicId: PropTypes.array,

        // Array of array with enum keys age, gender
        demographicOptions: PropTypes.array,

        // Handle demographic selector change
        onChange: PropTypes.func.isRequired,

        // Whether or not to show the refilter button
        // (Default to false)
        showRefilterButton: PropTypes.bool,

        // Handler to open the refitler panel
        handleRefiltersPanelClick: React.PropTypes.func,

        // If video is refiltering
        isRefiltering: PropTypes.bool,
        timeRemaining: PropTypes.number,
    },

    getInitialState: function() {
        return {
            isOpen: false,
        };
    },

    getDefaultProps: function() {
        return {
            selectedDemographicId: [0, 0],
            demographicOptions: [
                [0, 0], // gender:null, age:null
            ],
            displayRefilterButton: true
        }
    },
    toggleOpen: function() {
        const self = this;
        this.setState({
            isOpen: !self.state.isOpen
        });
    },
    getLabelFromId(id) {
        let genderLabel,
            ageLabel;
        if(id[0] === 0) {
            genderLabel = T.get('none');
        } else {
            let gender = _.invert(UTILS.FILTER_GENDER_COL_ENUM)[id[0]];
            genderLabel = _.find(UTILS.FILTERS_GENDER, i => {
                return i.value == gender;
            }).label;
        }
        if(id[1] === 0) {
            ageLabel = T.get('none');
        } else {
            let age = _.invert(UTILS.FILTER_AGE_COL_ENUM)[id[1]];
            ageLabel = _.find(UTILS.FILTERS_AGE, i => {
                return i.value == age;
            }).label;
        }
        return genderLabel + '/' + ageLabel;
    },

    handleRefiltersPanelClick: function(e) {
        const self = this;
        if (self.props.isRefiltering) {
            return;
        }
        self.props.handleRefiltersPanelClick(e);
    },

    getRefilterComponent: function() {
        if (!this.props.displayRefilterButton) {
            return null;
        }
        if (this.props.isRefiltering) {
            const timeRemaining = this.props.timeRemaining;
            if (timeRemaining === null) {
                return (
                    <div className="xxCollectionFiltersProcessing">
                        <div
                            className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown"
                        />
                        <span
                            className="xxCollectionFilterCountdown"
                        >
                            {T.get('timer.starting')}
                        </span>
                    </div>
                 );
            } else if (timeRemaining <= 0) {
                return (
                    <div className="xxCollectionFiltersProcessing">
                        <div
                            className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown"
                        />
                        <span
                            className="xxCollectionFilterCountdown"
                        >
                            {T.get('timer.loading')}
                        </span>
                    </div>
                 );
            } else {
                return (
                    <div className="xxCollectionFiltersProcessing">
                        <div
                            className="xxCollectionFilterToggle xxCollectionFilterToggle--countdown"
                        />
                        <span>
                            <Countdown
                                seconds={timeRemaining}
                                classPrefix="xxCollectionFilterCountdown"
                            />
                        </span>
                    </div>
                );
            }
        } else {
            return (
                <div className="xxCollectionFiltersProcessing">
                    <a
                        data-for="staticTooltip"
                        data-tip={T.get('tooltip.refilter.button')}
                        className="xxCollectionFilterToggle"
                        onClick={this.handleRefiltersPanelClick}
                    />
                </div>
            );
        }
    },

    getFilterSelect: function() {

        if (this.props.isRefiltering) {
            return null;
        }

        const selectedDemoLabel = this.getLabelFromId(this.props.selectedDemographic);
        let optionList;
        if (this.state.isOpen) {
            const options = this.props.demographicOptions.map(function(option) {
                const key = option.join(',');
                const className = (option === this.props.selectedDemographic)?
                    'xxCollectionFilters-version is-selected':
                    'xxCollectionFilters-version';
                const label = this.getLabelFromId(option);
                return (
                    <li
                        key={key}
                        className={className}
                        onClick={() => {this.props.onChange(option)}}
                    >
                        <span className="xxCollectionFilters-versionTitle">{T.get('label.filters')}</span>
                        <span>{label}</span>
                    </li>
                );
            });
            optionList = (
                <ul className="xxCollectionFilters-dropdown">
                    {options}
                </ul>
            );
        }
        return (
            <span className="xxCollectionFilters-value" onClick={this.toggleOpen}>
                {selectedDemoLabel}
                {optionList}
            </span>
        );
    },

    render: function() {
        return (
            <div className="xxCollectionFilters">
                {this.getRefilterComponent()}
                <div className="xxCollectionFiltersMenu">
                    <strong className="xxCollectionFilters-title">{T.get('label.filters')}</strong>
                    {this.getFilterSelect()}
                </div>
            </div>);
    }
});

export default DemographicFilters;
