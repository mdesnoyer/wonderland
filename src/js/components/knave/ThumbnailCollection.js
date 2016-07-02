// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ThumbnailCollection = React.createClass({
    // getInitialState: function() {
    //     // return {
    //     //     renditionNumber: 0
    //     // }
    // },
    // componentWillMount: function(){
    //     // var self = this,
    //     //     number = UTILS.closest(Math.pow(97.09, 2), self.props.thumbnails[1])
    //     // ; 
    //     // self.setState({
    //     //     renditionNumber: number 
    //     // })
    // },
    render: function() {
        var self = this;
        return (
            <div>
                {
                    self.props.thumbnails.map(function(thumbnail, i) {
                        if (i === 0 || i === self.props.thumbnails.length -1) {
                            return null;
                        }
                        else {
                            return (
                                <Thumbnail
                                    key={i}
                                    score={thumbnail.neon_score}
                                    src={thumbnail.url}
                                    thumbnailId={thumbnail.thumbnail_id}
                                    handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                                />
                            )
                        }
                    })
                }
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbnailCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
