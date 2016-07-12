// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

 var Thumbnail = React.createClass({
    propTypes: {
        extraClass: React.PropTypes.string,
        handleClick: React.PropTypes.func,
        handleMouseEnter: React.PropTypes.func,
        type: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        uid: React.PropTypes.number.isRequired,
        score: React.PropTypes.number,
        size: React.PropTypes.string.isRequired,
        src: React.PropTypes.string.isRequired,
        thumbnailId: React.PropTypes.string,
        showHref: React.PropTypes.bool,
        style: React.PropTypes.object
    },
    getDefaultProps: function() {
        return {
            showHref: true
        }
    },
    render: function() {
        var self = this,
            className = ['xxThumbnail'],
            opts = self.props.showHref ? {href: '#'} : {}
        ; 
        if (self.props.extraClass) {
            className.push(self.props.extraClass);
        }
        if (self.props.size) {
            className.push('xxThumbnail--'+ self.props.size);
        }
        if (self.props.type) {
            className.push('xxThumbnail--'+ self.props.type);
        }
        if (self.props.score < UTILS.LOWSCORE_LIMIT) {
            className.push('xxThumbnail--lowScore');
        }
        return (
            <a
                {...opts}
                className={className.join(' ')}
                data-score={self.props.score}
                data-uid={self.props.uid}
                onClick={self.handleThumbnailClick}
                style={self.props.style}
            >
                <img
                    className="xxThumbnail-image"
                    src={self.props.src}
                    onMouseEnter={self.handleMouseEnter}
                    alt={self.props.title}
                    title={self.props.title}
                />
            </a>
        );
    },
    handleThumbnailClick: function(e) {
        var self = this;
        if (self.props.handleClick) {
            self.props.handleClick(self.props.uid);
        }
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

