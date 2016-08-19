// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React, {PropTypes} from 'react';
import Thumbnail from './_Thumbnail';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var FeatureThumbnail = React.createClass({
    propTypes: {
        title: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired
    },
    render: function() {
        return (
            <div className="xxCollectionImages-featured">
                <h2 className="xxCollection-subtitle">
                    {this.props.title}
                </h2>
                <Thumbnail
                    score={this.props.score}
                    src={this.props.src}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default FeatureThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
