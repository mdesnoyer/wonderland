// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Lift = React.createClass({
    _maxLift: 2, // 200%
    _minLift: -2, // -200%
    _animationTime: 400, // ms
    propTypes: {
        displayThumbLift: React.PropTypes.number,
        isSoloImage: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            isSoloImage: false
        }
    },
    render: function() {
        var self = this,
            rawLift = isNaN(self.props.displayThumbLift) ? 0 : self.props.displayThumbLift,
            cookedLift,
            displayLiftPercent,
            defaultThumbnailLift,
            defaultThumbnailLiftPercent,
            neonThumbnailLift,
            neonThumbnailLiftPercent,
            liftMark,
            liftExplanation
        ;
        if (rawLift < 0) {
            cookedLift = Math.max(rawLift, self._minLift);
            defaultThumbnailLift = 1;
            neonThumbnailLift = defaultThumbnailLift * (1 + cookedLift); // this will make the multiplier < 1
        }
        else {
            // >=0
            cookedLift = Math.min(rawLift, self._maxLift);
            neonThumbnailLift = 1;
            defaultThumbnailLift = neonThumbnailLift / (1 + cookedLift); // this will make the denominator >= 1
        }
        displayLiftPercent = UTILS.makePercentage(rawLift, 0, true);
        defaultThumbnailLiftPercent = UTILS.makePercentage(defaultThumbnailLift, 2, true);
        neonThumbnailLiftPercent = UTILS.makePercentage(neonThumbnailLift, 2, true);
        liftMark = self.props.isSoloImage ? T.get('copy.lift.lift') : T.get('copy.lift.units', {'@lift': displayLiftPercent}),
        liftExplanation = self.props.isSoloImage ? T.get('copy.lift.explanation.soloImage') : T.get('copy.lift.explanation.default')
        return (
            <div className="xxLift">
                <ReactCSSTransitionGroup transitionName="xxFadeInOutSequential" transitionEnterTimeout={self._animationTime} transitionLeaveTimeout={self._animationTime}>
                    <div className="xxLift-container" key={`lift-${displayLiftPercent}-${neonThumbnailLiftPercent}-${defaultThumbnailLiftPercent}`}>
                        <strong className="xxLift-title">{liftMark}</strong>
                        <div className="xxLift-chart">
                            <div data-percent={neonThumbnailLiftPercent} className="xxLift-chartLine" style={{width: neonThumbnailLiftPercent}}></div>
                            <div data-percent={defaultThumbnailLiftPercent} className="xxLift-chartLine xxLift-chartLine--original" style={{width: defaultThumbnailLiftPercent}}></div>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
                <p className="xxLift-text">{liftExplanation}</p>
            </div>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Lift

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
