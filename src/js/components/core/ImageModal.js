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
        isEnabled: React.PropTypes.bool.isRequired,
        handleToggleModal: React.PropTypes.func,
        handleEnabledChange: React.PropTypes.func.isRequired
    },
    render: function() {
        var self = this,
            indicator = self.props.isEnabled ? 'fa-check' : 'fa-times'
        ;
        return (
            <figure className="wonderland-thumbnail">
                <img
                    className="wonderland-thumbnail__image"
                    src={self.props.strippedUrl}
                    alt={self.props.caption}
                    title={self.props.caption}
                />
                <figcaption className="wonderland-thumbnail__caption">
                    <span className="wonderland-thumbnail__indicator -background"><i className="fa fa-circle"></i></span>
                    <span className="wonderland-thumbnail__indicator -foreground"><i className={'fa ' + indicator}></i></span>
                    <ThumbBox
                        copyUrl={self.props.copyUrl}
                        downloadUrl={self.props.downloadUrl}
                        isEnabled={self.props.isEnabled}
                        handleEnabledChange={self.props.handleEnabledChange}
                    />
                </figcaption>
            </figure>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageModal;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -