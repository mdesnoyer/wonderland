// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

import XXCollectionInfo from './Info';
import XXCollectionImages from './Images';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var XXCollection = React.createClass({
    render: function() {
        return (
            <article className="xxCollection">
                <div className="xxCollection-content">
                    <XXCollectionInfo title={this.props.title} />
                </div>

                <XXCollectionImages />
            </article>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default XXCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
