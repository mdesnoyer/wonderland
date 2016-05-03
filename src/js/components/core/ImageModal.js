// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import ThumbBox from '../wonderland/ThumbBox';
import ThumbnailInfoBox from '../wonderland/ThumbnailInfoBox';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ImageModalChild = React.createClass({
	// mixins: [ReactDebugMixin],
    propTypes: {
        caption: React.PropTypes.string.isRequired,
        strippedUrl: React.PropTypes.string.isRequired,
        copyUrl: React.PropTypes.string.isRequired,
        downloadUrl: React.PropTypes.string.isRequired,
        isEnabled: React.PropTypes.bool.isRequired,
        handleToggleModal: React.PropTypes.func,
        handleEnabledChange: React.PropTypes.func.isRequired,
        type: React.PropTypes.string.isRequired,
        frameNo: React.PropTypes.number
    },
    render: function() {
        var self = this,
            enabledIndicator = UTILS.enabledDisabledIcon(self.props.isEnabled)
        ;
        return (
            <aside className="columns">
                <div className="column is-10">
                    <figure className="wonderland-thumbnail">
                        <img
                            className="wonderland-thumbnail__image"
                            src={self.props.strippedUrl}
                            alt={self.props.caption}
                            title={self.props.caption}
                        />
                        <figcaption className="wonderland-thumbnail__caption">
                            <span className="wonderland-thumbnail__indicator -foreground"><i className={'fa fa-' + enabledIndicator}></i></span>
                            <ThumbBox
                                copyUrl={self.props.copyUrl}
                                downloadUrl={self.props.downloadUrl}
                                isEnabled={self.props.isEnabled}
                                handleEnabledChange={self.props.handleEnabledChange}
                                isServingEnabled={self.props.isServingEnabled}
                            />
                        </figcaption>
                    </figure>
                </div>
                <div className="column is-2">
                    <ThumbnailInfoBox
                        frameNo={self.props.frameNo}
                        type={self.props.type}
                    />
                </div>
            </aside>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageModalChild;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -