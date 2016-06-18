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

export default class XXUploadDialog extends React.Component {
    constructor(props) {
        super(props);

        this.updateField = this.updateField.bind(this);

        this.state = {
            url: '',
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
        const { url, gender, age } = this.state;

        const { isValid } = url && gender && age;

        return (
            <section className="xxUploadDialog">
                <div className="xxUploadDialog-inner">
                    <h2 className="xxTitle">Upload your video</h2>
                    <div className="xxFormField">
                        <label
                            className="xxLabel"
                            htmlFor="xx-upload-url"
                        >URL</label>
                        <input
                            className="xxInputText"
                            type="text"
                            id="xx-upload-url"
                            value={url}
                            placeholder="Video URL"
                            onChange={e => updateField('url', e.target.value)}
                        />
                    </div>
                    <div className="xxFormField">
                        <label className="xxLabel">Filters</label>
                        <XXSelect
                            label="Gender"
                            value={gender}
                            options={optionsGender}
                            onSelect={value => updateField('gender', value)}
                        />
                        <XXSelect
                            label="Age"
                            value={age}
                            options={optionsAge}
                            reverse
                            onSelect={value => updateField('age', value)}
                        />
                    </div>
                    <p className="xxFormNote">Lorem ipsum dolor set amet</p>
                    <button
                        disabled={!isValid}
                        className="xxButton xxButton--important"
                        type="button"
                    >Submit</button>
                </div>
            </section>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
