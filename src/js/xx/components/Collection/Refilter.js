// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXSelect from '../Select';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var optionsGender = [
    {
        key: 'f',
        value: 'Female',
    },
    {
        key: 'm',
        value: 'Male',
    },
];

var optionsAge = [
    {
        key: 1,
        value: 'Under 18',
    },
    {
        key: 2,
        value: '18-24',
    },
    {
        key: 3,
        value: '25-34',
    },
    {
        key: 4,
        value: '35-44',
    },
    {
        key: 5,
        value: '45-54',
    },
    {
        key: 6,
        value: '55-64',
    },
    {
        key: 7,
        value: 'Over 65',
    },
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXRefilter extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            gender: '',
            age: '',
        };
    }

    updateField(field, value) {
        this.setState({
            [field]: value,
        });
    }

    render() {
        const { updateField } = this;
        const { setActiveContent } = this.props;
        const { gender, age } = this.state

        const isValid = gender && age;

        const applyClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            applyClassName.push('xxButton--important');
        }

        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">Refilter</h2>
                <p>
                    Volutpat libero sapien, vel pellentesque ex porttitor eu.
                    Morbi semper pharetra dui, et volutpat mi varius eu.
                    Praesent auctor mi dui, ut vulputate enim.
                </p>
                <div className="xxFormField">
                    <label className="xxLabel">Filters</label>
                    <XXSelect
                        label="Gender"
                        value={gender}
                        options={optionsGender}
                        onSelect={value => updateField('gender', value)}
                    />
                </div>
                <div className="xxFormField">
                    <XXSelect
                        label="Age"
                        value={age}
                        options={optionsAge}
                        onSelect={value => updateField('age', value)}
                    />
                </div>
                <div className="xxCollectionAction-buttons">
                    <button
                        className="xxButton"
                        type="button"
                        onClick={e => setActiveContent('', e)}
                    >Back</button>
                    <button
                        disabled={!isValid}
                        className={applyClassName.join(' ')}
                        type="button"
                    >Apply</button>
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
