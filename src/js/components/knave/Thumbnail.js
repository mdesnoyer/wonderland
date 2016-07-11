// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

 var Thumbnail = React.createClass({
    render: function() {
        var self = this,
            className = ['xxThumbnail']
        ;
            self.props.size && className.push('xxThumbnail--+'+ self.props.size);
            self.props.score < UTILS.LOWSCORE_LIMIT && className.push('xxThumbnail--lowScore');
        return(
            <a
                href="#"
                className={className.join(' ')}
                data-score={self.props.score}
            >
                <img
                    className="xxThumbnail-image"
                    src={self.props.src}
                    onMouseEnter={self.handleMouseEnter}
                />
            </a>
        );
    },
    handleMouseEnter: function() {
        var self = this;
        if (self.props.handleChildOnMouseEnter) {
            self.props.handleChildOnMouseEnter(self.props.thumbnailId);
        }
    }
 });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

 export default Thumbnail

 // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

