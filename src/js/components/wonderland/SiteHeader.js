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
            sidebarOpen: false,
            sidebarContent: '' // learnMore, contact, signIn, signUp, account 
        }
    },
    setSidebarContent: function(content) {
        var self = this;
        self.setState({
            sidebarOpen: true,
            sidebarContent: content
        });
    },
    closeSidebar: function() {
        var self = this;
        self.setState({
            sidebarOpen: false,
            sidebarContent: ''
        });
    },
    render: function() {
        var self = this;
        return (
            <div>
                <AccountMasqueradeBar />
                <SiteBanner sidebarContent={self.state.sidebarContent} setSidebarContent={self.setSidebarContent}/>
                <Sidebar 
                    isOpen={self.state.sidebarOpen}
                    sidebarContent={self.state.sidebarContent}
                    closeSidebar={self.closeSidebar}
                />
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteHeader;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
