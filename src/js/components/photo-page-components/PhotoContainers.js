import React, {PropTypes} from 'react';

import ReactDOM from 'react-dom';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';

import { PercentileButton } from './PhotoComponents';


export const PercentileContainer = React.createClass({
    render: function() {

    	var percentiles = [0,10,20,30,40,50,60,70,80,90]
        var self = this; 
        // var percentileClick = this.props.handlePercentileClick;
        return (
        	<div>
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