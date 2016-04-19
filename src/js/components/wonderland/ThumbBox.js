// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import UTILS from '../../modules/utils';
import moment from 'moment';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ThumbBox = React.createClass({
    propTypes: {
        copyUrl: React.PropTypes.string.isRequired,
        downloadUrl: React.PropTypes.string.isRequired,
        isEnabled: React.PropTypes.bool.isRequired,
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
            enabledTooltip = self.props.isAccountServingEnabled ? (!self.props.isEnabled ? 'Enable this Thumbnail' : 'Disable this Thumbnail') : 'Serving is Disabled for this Account',
            enabledDisabledClass = self.props.isAccountServingEnabled ? '' : ' -disabled'
        ;
        if (self.props.handleToggleModal) {
            toggleModalButton = function() {
                return (
                    <span
                        className="icon wonderland-thumbbox__tool"
                        onClick={self.props.handleToggleModal}
                        title="View this Thumbnail larger"
                    >
                        <i className="fa fa-search-plus" aria-hidden="true"></i>
                    </span>
                );
            }();
        }
        return (
            <aside className="wonderland-thumbbox">
                <div className="wonderland-thumbbox__tools">
                    <span
                        title="Copy the URL of this Thumbnail"
                        className="icon wonderland-thumbbox__tool"
                        ref="copyUrl"
                        onClick={self.handleCopyUrlClick}
                        data-clipboard-text={self.props.copyUrl}
                    >
                        <i className="fa fa-files-o" aria-hidden="true"></i>
                    </span>
                    <span
                        title={enabledTooltip}
                        className={'icon wonderland-thumbbox__tool' + enabledDisabledClass}
                        onClick={self.props.handleEnabledChange}
                    >
                        <i className={'fa fa-' + enabledIndicator} aria-hidden="true"></i>
                    </span>
                    <a
                        href={self.props.downloadUrl}
                        download={self.props.downloadUrl}
                        className="icon wonderland-thumbbox__tool"
                        title="Download this Thumbnail"
                    >
                        <i className="fa fa-download" aria-hidden="true"></i>
                    </a>
                    {toggleModalButton}
                </div>
                <span className="wonderland-thumbbox__tease" title="Expand">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                </span>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ThumbBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
