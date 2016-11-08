import React, {PropTypes} from 'react';

import ReactDOM from 'react-dom';

import UTILS from '../../modules/utils';
import T from '../../modules/translation';

import { PercentileButton } from './PhotoComponents';


export const PercentileContainer = React.createClass({
    render: function() {

    	var percentiles = [0,1,2,3,4,5,6,7,8,9]
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



        //     <div className="percentileBar">
        //         <div className="arrow-left"></div>
        //         {
        //             percentiles.map(function(item, i){
        //                 return (
        //                     <PercentileButton 
        //                             key={i} 
        //                             percentile={item} 
        //                             handlePercentileClick={self.props.handlePercentileClick} 
        //                     />

        //                 )
                        
        //             })
        //         }
        //         <div className="arrow-right"></div>
        //     </div>
        // );