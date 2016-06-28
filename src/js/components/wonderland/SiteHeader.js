// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import NewsFlash from './NewsFlash';
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
            sidebarOpen: false
        });
    },
    render: function() {
        var self = this, 
            newsFlashMessage = T.get('copy.newsFlashMessage')
        ;
        return (
            <div>
                <NewsFlash message={newsFlashMessage} isActive={false} />
                <AccountMasqueradeBar />
                <SiteBanner sidebarOpen={self.state.sidebarOpen} setSidebarContent={self.setSidebarContent}/>
                <Sidebar 
                    sidebarOpen={self.state.sidebarOpen}
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
