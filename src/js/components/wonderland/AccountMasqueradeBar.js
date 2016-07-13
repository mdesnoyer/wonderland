// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SESSION from '../../modules/session';
import Icon from '../core/Icon';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var AccountMasqueradeBar = React.createClass({
    render: function() {
        var self = this;
        if (SESSION.active() && SESSION.getMasqueradeAccountId()) {
            return (
                <div>
                    <p><Icon type="universal-access" /> Masquerading as <strong>{SESSION.getMasqueradeAccountId()}</strong></p>
                </div>
            );
        }
        else {
            return false;
        }
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default AccountMasqueradeBar;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
