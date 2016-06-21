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
        value: '18-34',
    },
    {
        key: 2,
        value: '35-59',
    },
    {
        key: 3,
        value: '60+'
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
        const { onSubmit } = this.props;
        const { url, gender, age } = this.state;

        const isValid = !!url;

        const submitClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            submitClassName.push('xxButton--important');
        }

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
                            onSelect={value => updateField('age', value)}
                        />
                    </div>
                    <p className="xxFormNote">Lorem ipsum dolor set amet</p>
                    <button
                        disabled={!isValid}
                        className={submitClassName.join(' ')}
                        type="button"
                        onClick={isValid ? onSubmit : null}
                    >Submit</button>
                </div>
            </section>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
