// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SESSION from '../../modules/session';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var VideoCollectionActions = React.createClass({
    render: function() {
        var self = this;
        return (
            <ul className="xxCollectionActions">
                <li className="xxCollectionActions-item">
                    <a
                        data-tip={T.get('label.emailMe')}
                        data-for="staticTooltip"
                        data-place="bottom"
                        data-action-label="email"
                        onClick={self.handleClick}
                        className="xxCollectionActions-anchor xxCollectionActions-email">
                        <span>Email</span>
                    </a>
                </li>
                <li className="xxCollectionActions-item">
                    <a
                        data-tip={T.get('copy.share.main')}
                        data-for="staticTooltip"
                        data-place="bottom"
                        data-action-label="share"
                        onClick={self.handleClick}
                        className="xxCollectionActions-anchor xxCollectionActions-share">
                        <span>Share</span>
                    </a>
                </li>
                <li className="xxCollectionActions-item">
                    <a
                        data-tip={T.get('delete')}
                        data-for="staticTooltip"
                        data-place="bottom"
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
