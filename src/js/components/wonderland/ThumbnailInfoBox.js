// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import FuzzyTime from '../core/FuzzyTime';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ThumbnailInfoBox = React.createClass({
    propTypes: {
        type: React.PropTypes.string.isRequired,
        frameNo: React.PropTypes.number.isRequired
    },
    render: function() {
        var self = this;
        return (
            <aside className="box">
                <dl className="wonderland-dl">
                    <dt className="wonderland-dt">Frame No.</dt>
                        <dd className="wonderland-dd">{self.props.frameNo}</dd>
                    <dt className="wonderland-dt">Type</dt>
                        <dd className="wonderland-dd">{self.props.type}</dd>
                    <dt className="wonderland-dt">Dimensions</dt>
                        <dd className="wonderland-dd">{self.props.width}x{self.props.height}</dd>
                    <dt className="wonderland-dt">Thumbnail ID</dt>
                        <dd className="wonderland-dd">{self.props.thumbnailId}</dd>
                    <dt className="wonderland-dt">Created</dt>
                        <dd className="wonderland-dd"><FuzzyTime date={self.props.created} /></dd>
                    <dt className="wonderland-dt">Updated</dt>
                        <dd className="wonderland-dd"><FuzzyTime date={self.props.updated} /></dd>
                    <dt className="wonderland-dt">CTR</dt>
                        <dd className="wonderland-dd">{self.props.ctr ? self.props.ctr : 'n/a'}</dd>
                </dl>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ThumbnailInfoBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
