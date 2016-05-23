// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import Icon from '../core/Icon';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Hud = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        stats: React.PropTypes.object
    },
    render: function() {
        var self = this,
            neonScore = UTILS.NEON_SCORE_ENABLED ? <li><Icon type="neon" title="Neonscore" />&nbsp;{self.props.cookedNeonScore}</li> : false
        ;
        if (self.props.stats) {
            return (
                <ul className="wonderland-hud">
                    <li><Icon type="pie-chart" title="Serving Fraction" />&nbsp;{self.props.stats.servingFrac}</li>
                    <li><Icon type="eye" title="Impressions" />&nbsp;{self.props.stats.impressions}</li>
                    <li><Icon type="hand-pointer-o" title="Conversions" />&nbsp;{self.props.stats.conversions}</li>
                    <li><Icon type="bullseye" title="CTR" />&nbsp;{self.props.stats.ctr}</li>
                    {neonScore}
                </ul>
            );
        }
        else {
            return (
                <ul className="wonderland-hud">
                    <li>Loading&hellip;</li>
                </ul>
            );
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Hud;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -