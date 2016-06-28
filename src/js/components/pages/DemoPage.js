// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import AjaxMixin from '../../mixins/Ajax';
import UTILS from '../../modules/utils';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var DemoPage = React.createClass({
    mixins: [AjaxMixin], // ReactDebugMixin
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.active()) {
            // Play nice, transport the user to the internal home
            // page (dashboard)
            self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
        } else {
            self.POST('accounts', {
                host: CONFIG.AUTH_HOST
            })
            .then(function (res) {
                SESSION.set(res.access_token, res.refresh_token, res.account_ids[0]);
                // Route to the dashboard, which will auto-route to the "upload video" page now that there's a session
                self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
            })
            .catch(function (err) {
                // TODO: Error result?
                self.context.router.push(UTILS.DRY_NAV.DASHBOARD.URL);
            });
        }
    },
    render: function() {
        return false;
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default DemoPage;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
