// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import SiteBanner from './SiteBanner';
import AccountMasqueradeBar from './AccountMasqueradeBar';
import T from '../../modules/translation';
import Sidebar from './Sidebar';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteHeader = React.createClass({
    // mixins: [ReactDebugMixin],
    getInitialState: function() {
        return {
            sidebarContent: null // null, learnMore, contact, signUp, account 
        }
    },
    setSidebarContent: function(content) {
        var self = this;
        self.setState({
            sidebarContent: content
        });
    },
    render: function() {
        var self = this;
        return (
            <div>
                <AccountMasqueradeBar />
                <SiteBanner
                    setSidebarContent={self.setSidebarContent}
                    sidebarContent={self.state.sidebarContent}
                />
                <Sidebar
                    content={self.state.sidebarContent}
                    setContent={self.setSidebarContent}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
