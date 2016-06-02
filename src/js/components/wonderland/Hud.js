// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Icon from '../core/Icon';
import UTILS from '../../modules/utils';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Hud = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        stats: React.PropTypes.object
    },
    render: function() {
        var self = this
            //,
            //neonScore = UTILS.NEON_SCORE_ENABLED ? <li><Icon type="neon" title="Neonscore" />{self.props.cookedNeonScore}</li> : false
        ;
        if (self.props.stats) {
            return (
                <ul className="wonderland-hud">
                    <li
                        className={UTILS.buildTooltipClass('wonderland-hud__item', 'top')}
                        aria-label={T.get('copy.servingFraction')}
                    >
                        <Icon type="pie-chart" title={T.get('copy.servingFraction')} />{self.props.stats.servingFrac}
                    </li>
                    <li
                        className={UTILS.buildTooltipClass('wonderland-hud__item', 'top')}
                        aria-label={T.get('copy.impressions')}
                    >
                        <Icon type="eye" title="Impressions" />{self.props.stats.impressions}
                    </li>
                    <li
                        className={UTILS.buildTooltipClass('wonderland-hud__item', 'top')}
                        aria-label={T.get('copy.conversions')}
                    >
                        <Icon type="hand-pointer-o" title="Conversions" />{self.props.stats.conversions}
                    </li>
                    <li
                        className={UTILS.buildTooltipClass('wonderland-hud__item', 'top')}
                        aria-label={T.get('copy.ctr')}
                    >
                        <Icon type="bullseye" title="CTR" />{self.props.stats.ctr}
                    </li>
                    {/*neonScore*/}
                </ul>
            );
        }
        else {
            return (
                <ul className="wonderland-hud">
                    <li>{T.get('copy.loading')}</li>
                </ul>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Hud;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
