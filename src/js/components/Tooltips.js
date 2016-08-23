'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import ReactTooltip from 'react-tooltip';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Tooltips = React.createClass({

    render: function() {
        // TODO re-implement settable tooltip with func passing.
        /*
            <ReactTooltip
                id="settableTooltip"
                ref="settableTooltip"
                event="click"
                eventOff="mouseout"
                effect="solid"
                place="bottom"
                delayHide={UTILS.TOOLTIP_DELAY_MILLIS}
                type="dark"
            />
        /**/
        return (
            <ReactTooltip
                id="staticTooltip"
                class="xxHoverTooltip"
                effect="solid"
                place="left"
                type="light"
            />
        );
    }
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Tooltips;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
