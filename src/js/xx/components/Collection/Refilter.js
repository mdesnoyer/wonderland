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
        key: 0,
        value: 'Under 18',
    },
    {
        key: 1,
        value: '18-24',
    },
    {
        key: 2,
        value: '25-34',
    },
    {
        key: 3,
        value: '35-44',
    },
    {
        key: 4,
        value: '45-54',
    },
    {
        key: 5,
        value: '55-64',
    },
    {
        key: 6,
        value: 'Over 65',
    },
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ setActiveContent }) => {
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
                    value=""
                    options={optionsGender}
                />
            </div>
            <div className="xxFormField">
                <XXSelect
                    label="Age"
                    value=""
                    options={optionsAge}
                />
            </div>
            <div className="xxCollectionAction-buttons">
                <button
                    className="xxButton"
                    type="button"
                    onClick={e => setActiveContent('', e)}
                >Back</button>
                <button
                    disabled
                    className="xxButton xxButton--highlight"
                    type="button"
                >Apply</button>
            </div>
        </div>
    );
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
