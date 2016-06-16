// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import TRACKING from '../../modules/tracking';
// import ReactDebugMixin from 'react-debug-mixin';
import UTILS from '../../modules/utils';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var ThumbBox = React.createClass({
    // mixins: [ReactDebugMixin],
    propTypes: {
        copyUrl: React.PropTypes.string.isRequired,
        downloadUrl: React.PropTypes.string.isRequired,
        isEnabled: React.PropTypes.bool.isRequired,
        isModalActive: React.PropTypes.bool.isRequired,
        handleToggleModal: React.PropTypes.func,
        handleEnabledChange: React.PropTypes.func.isRequired
    },
    componentDidMount: function() {
        var self = this,
            c = new Clipboard(self.refs.copyUrl)
        ;
    },
    render: function() {
        var self = this,
            toggleModalButton = '',
            enabledIndicator = UTILS.enabledDisabledIcon(!self.props.isEnabled), // we want the opposite
            modalIndicator = UTILS.modalActiveIcon(!self.props.isModalActive),
            enabledTooltip = self.props.isServingEnabled ? (!self.props.isEnabled ? 'Enable this Thumbnail' : 'Disable this Thumbnail') : 'Serving is Disabled for this Account',
            enabledDisabledClass = self.props.isServingEnabled ? '' : ' -disabled',
            modalClass = self.props.handleToggleModal ? '' : ' -disabled'
        ;
        return (
            <aside className="wonderland-thumbbox">
                <div className="wonderland-thumbbox__tools">
                    <span
                        title="Copy the URL of this Thumbnail"
                        className="icon wonderland-thumbbox__tool"
                        ref="copyUrl"
                        onClick={self.handleCopyTracking}
                        data-clipboard-text={self.props.copyUrl}
                    >
                        <Icon type="files-o" />
                    </span>
                    <span
                        title={enabledTooltip}
                        className={'icon wonderland-thumbbox__tool' + enabledDisabledClass}
                        onClick={self.props.handleEnabledChange}
                    >
                        <Icon type={enabledIndicator} />
                    </span>
                    <a
                        href={self.props.downloadUrl}
                        download={self.props.downloadUrl}
                        onClick={self.handleDownloadTracking}
                        className="icon wonderland-thumbbox__tool"
                        title="Download this Thumbnail"
                    >
                        <Icon type="download" />
                    </a>
                    <span
                        className={'icon wonderland-thumbbox__tool' + modalClass}
                        onClick={self.props.handleToggleModal}
                        title="View this Thumbnail larger"
                    >
                        <Icon type={modalIndicator} />
                    </span>
                </div>
            </aside>
        );
    },
    handleCopyTracking: function() {
        var self = this;
        TRACKING.sendEvent(self, arguments, self.props.copyUrl);
    },
    handleDownloadTracking: function() {
        var self = this;
        TRACKING.sendEvent(self, arguments, self.props.downloadUrl);
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default ThumbBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
