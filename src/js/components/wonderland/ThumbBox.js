// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var ThumbBox = React.createClass({
    propTypes: {
        copyUrl: React.PropTypes.string.isRequired,
        downloadUrl: React.PropTypes.string.isRequired,
        handleToggleModal: React.PropTypes.func
    },
    componentDidMount: function() {
        var self = this,
            c = new Clipboard(self.refs.copyUrl)
        ;
    },
    render: function() {
        var self = this,
            toggleModalButton = ''
        if (self.props.handleToggleModal) {
            toggleModalButton = function() {
                return (
                    <span className="icon wonderland-thumbbox__tool" onClick={self.props.handleToggleModal}>
                        <i className="fa fa-search-plus" aria-hidden="true"></i>
                    </span>
                );
            }();
        }
        return (
            <aside className="wonderland-thumbbox">
                <div className="wonderland-thumbbox__tools">
                    <span title="Copy the URL of this Thumbnail" ref="copyUrl" className="icon wonderland-thumbbox__tool" onClick={self.handleCopyUrlClick} data-clipboard-text={self.props.copyUrl}>
                        <i className="fa fa-anchor" aria-hidden="true"></i>
                    </span>
                    <a href={self.props.downloadUrl} download={self.props.downloadUrl} className="icon wonderland-thumbbox__tool" title="Download this Thumbnail">
                        <i className="fa fa-download" aria-hidden="true"></i>
                    </a>
                    {toggleModalButton}
                </div>
                <span title="View the Thumbnail larger" className="wonderland-thumbbox__tease">
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                </span>
            </aside>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ThumbBox;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
