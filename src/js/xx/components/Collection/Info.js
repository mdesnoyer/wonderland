// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXLift from '../Lift';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var XXCollectionInfo = React.createClass({
    render: function() {
        return (
            <div>
                <h1 className="xxCollection-title">
                    {this.props.title}
                </h1>

                <div className="xxCollectionFilters">
                    <strong className="xxCollectionFilters-title">Filters</strong>
                    <span className="xxCollectionFilters-value">None</span>
                </div>

                <XXLift />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default XXCollectionInfo;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
