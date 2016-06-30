// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 
 var Thumbnail = React.createClass({
    render: function(){
        var self = this,
            className = ['xxThumbnail']
        ; 
            self.props.size && className.push('xxThumbnail--+'+ self.props.size);
            self.props.score < UTILS.LOWSCORE_LIMIT && className.push('xxThumbnail--lowScore');
        return(
            <figure
                className={className.join(' ')}
                data-score={self.props.score}
            >
                <img
                    className="xxThumbnail-image"
                    src={self.props.src}
                />
            </figure>
        );
    }
 });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 
 export default Thumbnail

 // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -