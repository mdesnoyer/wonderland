// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

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
                </dl>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ThumbnailInfoBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
