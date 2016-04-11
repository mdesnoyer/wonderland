// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ThumbBox from '../wonderland/ThumbBox';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageModal = React.createClass({
    propTypes: {
        caption: React.PropTypes.string.isRequired,
        strippedUrl: React.PropTypes.string.isRequired,
        copyUrl: React.PropTypes.string.isRequired,
        downloadUrl: React.PropTypes.string.isRequired,
        handleToggleModal: React.PropTypes.func
    },
    render: function() {
        var self = this;
        return (
            <figure className="wonderland-thumbnail">
                <img
                    className="wonderland-thumbnail__image"
                    src={self.props.strippedUrl}
                    alt={self.props.caption}
                    title={self.props.caption}
                />
                <figcaption className="wonderland-thumbnail__caption">
                    <ThumbBox
                        copyUrl={self.props.copyUrl}
                        downloadUrl={self.props.downloadUrl}
                    />
                </figcaption>
            </figure>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -