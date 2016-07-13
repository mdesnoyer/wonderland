// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Lift = React.createClass({
    render: function() {
        var self = this,
            lift = isNaN(self.props.displayThumbLift) ? 0 : self.props.displayThumbLift,
            humanLiftPercent = UTILS.makePercentage(lift, 0, true)
        ;
        if (lift < 0) {
            var originalBarSize = 1;
            var neonBarSize = originalBarSize * (1 + lift); // this will make the multiplier < 1
        }
        else {
            var neonBarSize = 1;
            var originalBarSize = neonBarSize / (1 + lift); // this will make the denominator >= 1
        }
        var neonBarSizePercent = UTILS.makePercentage(neonBarSize, 2, true);
        var originalBarSizePercent = UTILS.makePercentage(originalBarSize, 2, true);
        return (
            <div className="xxLift">
                <strong className="xxLift-title">{T.get('copy.lift.units', {
                    '@lift': humanLiftPercent
                })}</strong>
                <div className="xxLift-chart">
                    <div title={neonBarSizePercent} className="xxLift-chartLine" style={{width: neonBarSizePercent}}></div>
                    <div title={originalBarSizePercent} className="xxLift-chartLine xxLift-chartLine--original" style={{width: originalBarSizePercent}}></div>
                </div>
                <p className="xxLift-text">{T.get('copy.lift.explanation')}</p>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Lift

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
