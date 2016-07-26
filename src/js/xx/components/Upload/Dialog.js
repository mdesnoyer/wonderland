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
        const { isOnboarding, onSubmit } = this.props;
        const { url, gender, age } = this.state;

        const isValid = !!url;

        const submitClassName = ['xxButton', 'xxButton--highlight'];
        if (isValid) {
            submitClassName.push('xxButton--important');
        }

        return (
            <section className="xxUploadDialog">
                <div className="xxUploadDialog-inner">
                    <h2 className="xxTitle">Let’s analyze a video</h2>
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
                    {
                      isOnboarding ? null : (
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
                      )
                    }
                    {
                        isOnboarding ? null : (
                            <p className="xxFormNote">Get images for a specific audience.</p>
                        )
                    }
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
