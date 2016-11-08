import React, {PropTypes} from 'react';

import ReactDOM from 'react-dom';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';

import { PercentileButton } from './PhotoComponents';


export const PercentileContainer = React.createClass({
    render: function() {
        var percentiles = [9,8,7,6,5,4,3,2,1]
        var self = this;
        return (
        	<div className="percentileBar">
        		{
        			percentiles.map(function(item, i){
        				return (
                            <PercentileButton 
                                    key={i} 
                                    percentile={item} 
                                    handlePercentileClick={self.props.handlePercentileClick} 
                            />

                        )
        			})
        		}
        	</div>
        );
    }
});
