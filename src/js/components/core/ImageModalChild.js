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
        frameNo: React.PropTypes.number,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        thumbnailId: React.PropTypes.string.isRequired,
        created: React.PropTypes.string.isRequired,
        updated: React.PropTypes.string.isRequired,
        ctr: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    },
    render: function() {
        var self = this,
            enabledIndicator = UTILS.enabledDisabledIcon(self.props.isEnabled)
        ;
        return (
            <aside className="columns">
                <div className="column is-9">
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
                <div className="column is-3">
                    <ThumbnailInfoBox
                        frameNo={self.props.frameNo}
                        type={self.props.type}
                        width={self.props.width}
                        height={self.props.height}
                        thumbnailId={self.props.thumbnailId}
                        created={self.props.created}
                        updated={self.props.updated}
                        ctr={self.props.ctr}
                    />
                </div>
            </aside>
        );
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ImageModalChild;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -