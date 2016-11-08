import React, {PropTypes} from 'react';

import ReactDOM from 'react-dom';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';



export const PercentileButton = React.createClass({
    render: function() {
        var percentile = this.props.percentile === 0 ? '' : this.props.percentile;
        return (
            <button 
                data-percentile={this.props.percentile} 
                onClick={this.props.handlePercentileClick}
            >
                {percentile + '0th'}
            </button>
        );
    }
});
