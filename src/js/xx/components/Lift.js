// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var XXLift = React.createClass({
    render: function() {
        return (
            <div className="xxLift">
                <strong className="xxLift-title">48% Lift</strong>
                <div className="xxLift-chart">
                    <div className="xxLift-chartLine" style={{width: '100%'}}></div>
                    <div className="xxLift-chartLine xxLift-chartLine--original" style={{width: '67.5%'}}></div>
                </div>
                <p className="xxLift-text">Compared to the default thumbnail for this video, with our select top scoring image.</p>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default XXLift;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
