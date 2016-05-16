// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var HeroThumbnail = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        thumbnail: React.PropTypes.object
    },
    render: function() {
        var self = this,
            src = '',
            caption = ''
        ;
        if (self.props.thumbnail) {
            src = UTILS.stripProtocol(self.props.thumbnail.url);
            caption = 'Best Thumbnail';
            return (
                <img
                    className="wonderland-hero-thumbnail"
                    src={src}
                    alt={caption}
                    title={caption}
                />
            );
        }
        else {
            return (
                <span className="wonderland-hero-thumbnail-dummy has-text-centered">
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                </span>
            );
        }

    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default HeroThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
