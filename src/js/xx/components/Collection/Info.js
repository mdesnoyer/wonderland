// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXLift from '../Lift';
import XXCollectionActions from './Actions';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default class XXCollection extends React.Component {
    render() {
        const { title, setActiveContent } = this.props;

        return (
            <div>
                <h1 className="xxCollection-title">
                    {title}
                </h1>

                <a
                    href=""
                    className="xxCollectionFilterToggle"
                    onClick={e => setActiveContent('refilter', e)}>
                    <span>Refilter</span>
                </a>

                <div className="xxCollectionFilters">
                    <strong className="xxCollectionFilters-title">Filters</strong>
                    <span className="xxCollectionFilters-value">None</span>
                </div>

                <XXLift />

                <XXCollectionActions setActiveContent={setActiveContent} />
            </div>
        );
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
