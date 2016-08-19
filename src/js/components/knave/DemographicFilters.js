// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';

import _ from 'lodash';

import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
const DemographicFilters = React.createClass({

    propTypes: {
        tagId: PropTypes.string.isRequired,
        // Enum values as array of enumerated gender, age: e.g., [1, 0], [0, 0], etc.
        selectedDemographicId: PropTypes.array,
        // Array of array with enum keys age, gender
        demographicOptions: PropTypes.array,
        // Handle demographic selector change
        onChange: PropTypes.func.isRequired
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
            ]
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
                        onClick={() => {self.props.onChange(self.props.tagId, option)}}
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
            <div>
                <a className="xxCollectionFilterToggle" />
                <div className="xxCollectionFilterMenu">
                    <strong className="xxCollectionFilter-title">{T.get('label.filters')}</strong>
                    <span className="xxCollectionFilters-value" onClick={self.toggleOpen}>
                    {selectedDemoLabel}
                    {optionList}
                    </span>
                </div>
            </div>);
    }
});

export default DemographicFilters;
