// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Thumbnail from './Thumbnail';
import RENDITIONS from '../../modules/renditions';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ThumbnailCollection = React.createClass({
    propTypes: {
        handleClick: React.PropTypes.func,
        type: React.PropTypes.string,
        thumbnails: React.PropTypes.array,
        isMobile: React.PropTypes.bool
    },
    componentWillMount: function() {
        var self = this,
            renditionNumber = RENDITIONS.findRendition(self.props.thumbnails, 100, 100)
        ; 
        self.setState({
            renditionNumber: renditionNumber 
        });
    },
    render: function() {
        var self = this;
        switch(self.props.type) {
            case 'lowScores':
                return (
                    <div>
                    {
                        self.props.thumbnails.map(function(thumbnail, i) {
                            var src = (self.state.renditionNumber === RENDITIONS.NO_RENDITION ? thumbnail.url : thumbnail.renditions[self.state.renditionNumber].url);
                            return (
                                <Thumbnail
                                    key={i}
                                    uid={i}
                                    title=""
                                    size="small"
                                    score={thumbnail.neon_score}
                                    type={'regular'}
                                    src={src}
                                    isMobile={self.props.isMobile}
                                    extraClass='xxThumbnail--lowLight'
                                    showHref={false}
                                />
                            )
                        })
                    }
                    </div>
                );
                break;
            case 'highScores':
                return (
                    <div>
                    {
                        self.props.thumbnails.map(function(thumbnail, i) {
                            if (i === 0 || i === self.props.thumbnails.length - 1) {
                                return null;
                            }
                            else {
                                var src = (self.state.renditionNumber === RENDITIONS.NO_RENDITION ? thumbnail.url : thumbnail.renditions[self.state.renditionNumber].url);
                                return (
                                    <Thumbnail
                                        key={i}
                                        uid={i}
                                        title=""
                                        size="small"
                                        score={thumbnail.neon_score}
                                        type={'regular'}
                                        src={src}
                                        thumbnailId={thumbnail.thumbnail_id}
                                        handleChildOnMouseEnter={self.props.handleChildOnMouseEnter}
                                        handleClick={self.props.handleClick}
                                        isMobile={self.props.isMobile}
                                        extraClass='xxThumbnail--highLight'
                                    />
                                )
                            }
                        })
                    }
                    </div>
                );
                break;
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbnailCollection;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -