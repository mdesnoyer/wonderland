// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const DemographicFilters = React.createClass({

    propTypes: {

        // Array [<gender>, <age>] where each is a number key of its enum
        // e.g., [1, 1] male, 18-19
        selectedDemographicId: PropTypes.array,

        // Array of array with enum keys age, gender
        demographicOptions: PropTypes.array,

        // Handle demographic selector change
        onChange: PropTypes.func.isRequired,
        // Whether or not to display the refilter button 
        // defaults to true 
        displayRefilterButton: PropTypes.bool
    },

    getInitialState: function() {
        return {
            isOpen: false
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
            ageLabel
        ;
        if(id[0] === 0) {
            genderLabel = T.get('none');
        }
        else {
            let gender = _.invert(UTILS.FILTER_GENDER_COL_ENUM)[id[0]];
            genderLabel = _.find(UTILS.FILTERS_GENDER, i => {
                return i.value == gender;
            }).label;
        }
        if(id[1] === 0) {
            ageLabel = T.get('none');
        }
        else {
            let age = _.invert(UTILS.FILTER_AGE_COL_ENUM)[id[1]];
            ageLabel = _.find(UTILS.FILTERS_AGE, i => {
                return i.value == age;
            }).label;
        }
        return genderLabel + '/' + ageLabel;
    },
    handleFiltersClick: function(e) {
        var self = this;
        e.preventDefault();
        //self.props.
        alert('TODO');
    },
    render: function() {
        const self = this;
        const selectedDemoLabel = self.getLabelFromId(self.props.selectedDemographic);
        let optionList;
        if (self.state.isOpen) {
            const options = self.props.demographicOptions.map(function(option) {
                const key = option.join(',');
                const className = (option === self.props.selectedDemographic)?
                    'xxCollectionFilters-version is-selected':
                    'xxCollectionFilters-version';
                const label = self.getLabelFromId(option);
                return (
                    <li
                        key={key}
                        className={className}
                        onClick={() => {self.props.onChange(option)}}
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
        let buttonDisplay = (<div></div>); 
        if (self.props.displayRefilterButton) { 
            buttonDisplay = (<a className="xxCollectionFiltersToggle" onClick={self.handleFiltersClick}/>); 
        } 
        return (
            <div className="xxCollectionFilters">
                {buttonDisplay}
                <div className="xxCollectionFiltersMenu">
                    <strong className="xxCollectionFilters-title">{T.get('label.filters')}</strong>
                    <span className="xxCollectionFilters-value" onClick={self.toggleOpen}>
                        {selectedDemoLabel}
                        {optionList}
                    </span>
                </div>
            </div>
        );
    }
});

export default DemographicFilters;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

