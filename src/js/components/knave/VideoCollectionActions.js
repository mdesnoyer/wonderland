// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoCollectionActions = React.createClass({
    render: function() {
        var self = this; 
        return (
            <ul className="xxCollectionActions">
                <li className="xxCollectionActions-item">
                    <a
                        data-action-label="email"
                        onClick={self.handleClick}
                        className="xxCollectionActions-anchor xxCollectionActions-email">
                        <span>Email</span>
                    </a>
                </li>
                <li className="xxCollectionActions-item">
                    <a
                        data-action-label="share"
                        onClick={self.handleClick}
                        className="xxCollectionActions-anchor xxCollectionActions-share">
                        <span>Share</span>
                    </a>
                </li>
                <li className="xxCollectionActions-item">
                    <a
                        data-action-label="save"
                        onClick={self.handleClick}
                        className="xxCollectionActions-anchor xxCollectionActions-save">
                        <span>Save</span>
                    </a>
                </li>
                <li className="xxCollectionActions-item">
                    <a
                        data-action-label="delete"
                        onClick={self.handleClick}
                        className="xxCollectionActions-anchor xxCollectionActions-delete">
                        <span>Delete</span>
                    </a>
                </li>
            </ul>
        );
    },
    handleClick: function(e) {
        var self = this; 
        self.props.handleMenuChange(e);
    }
})

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default VideoCollectionActions

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
