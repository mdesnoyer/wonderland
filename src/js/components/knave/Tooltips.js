'use strict';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import React, {PropTypes} from 'react';

import ReactTooltip from 'react-tooltip';

import UTILS from '../../modules/utils';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const Tooltips = React.createClass({
    render: function() {
        return (
            <div>
                <ReactTooltip
                    id="staticTooltip"
                    class="xxHoverTooltip"
                    effect="solid"
                    place="bottom"
                    type="light"
                />
                <ReactTooltip
                    id="settableTooltip"
                    effect="solid"
                    place="bottom"
                    event="click"
                    type="dark"
                >
                    <span>{this.props.tooltipText}</span>
                </ReactTooltip>

            </div>
        );
    }
});
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Tooltips;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
