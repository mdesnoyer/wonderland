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
        // debugger 
        return (
            <div>
                {
                    self.props.thumbnails.map(function(thumbnail, i) {
                        if (i === 0 || i === self.props.thumbnails.length -1) {
                            return null;
                        }
                        else {
                            var rendtionPoint = self.props.thumbnails[0].renditions.length
                            var point = rendtionPoint > 10 ? 1 : 4 
                            return (
                                <Thumbnail
                                    key={i}
                                    score={thumbnail.neon_score}
                                    src={thumbnail.renditions[point].url}
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
// thumbnail.renditions.find(x => x.aspect_ratio === "4X3").url
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbnailCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
