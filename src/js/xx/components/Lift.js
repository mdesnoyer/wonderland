// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ({ lift, barWidth, barOriginalWidth, type }) => (
    <div className="xxLift">
        <ReactCSSTransitionGroup transitionName="xxFadeInOutSequential" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
            <div className="xxLift-container" key={`lift-${lift}-${barWidth}-${barOriginalWidth}`}>
                <strong className="xxLift-title">{lift} Lift</strong>
                <div className="xxLift-chart">
                    <div className="xxLift-chartLine" style={{width: barWidth}}></div>
                    <div className="xxLift-chartLine xxLift-chartLine--original" style={{width: barOriginalWidth}}></div>
                </div>
            </div>
        </ReactCSSTransitionGroup>
        <p className="xxLift-text">
            {
                type === 'photo' ? (
                    'Compared to the lowest scoring thumbnail for this collection, with our selected top scoring image.'
                ) : (
                    'Compared to the default thumbnail for this video, with our select top scoring image.'
                )
            }
        </p>
    </div>
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
