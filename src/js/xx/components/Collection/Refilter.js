// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import XXSelect from '../Select';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const optionsGender = [
    {
        key: 'f',
        value: 'Female',
    },
    {
        key: 'm',
        value: 'Male',
    },
];

const optionsAge = [
    {
        key: 1,
        value: '18-29',
    },
    {
        key: 2,
        value: '30-39',
    },
    {
        key: 3,
        value: '40-49',
    },
    {
        key: 4,
        value: '50+'
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

        const isValid = gender || age;

        const applyClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            applyClassName.push('xxButton--important');
        }

        return (
            <div className="xxCollectionAction">
                <h2 className="xxTitle">{T.get('label.filterResults')}</h2>
                <p>
                    Filter your video to see images targeted for a specific
                    demographic audience. We’ll need to reprocess the video,
                    so this may take a few minutes.
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
                        onClick={isValid ? (e => setActiveContent('refilter-processing', e)) : null}
                    >Apply</button>
                </div>
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
