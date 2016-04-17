// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var HeroThumbnail = React.createClass({
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
        }
        else {
            src = '';
            caption = '';
        }
        return (
            <img
                className="wonderland-hero-thumbnail"
                src={src}
                alt={caption}
                title={caption}
            />
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default HeroThumbnail;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
