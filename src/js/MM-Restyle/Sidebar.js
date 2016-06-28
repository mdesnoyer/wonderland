// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import LearnMore from './LearnMore';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Sidebar = React.createClass({
    getInitialState: function() {
        var self = this;
        return {
            sidebarOpen: self.props.sidebarOpen
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            sidebarOpen: nextProps.sidebarOpen
        });
    },
    handleBackgroundClose: function(e) {
        var self = this;
        e.preventDefault();
        if (e.target.className === 'xxOverlay xxOverlay--scroll xxOverlay--visibleNav') {
            self.setState({
                sidebarOpen: false
            });
            self.props.closeSidebar();
        }
    },
    handleClose: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            sidebarOpen: false
        });
        self.props.closeSidebar();
    },
    render: function() {
        var self = this,
            content = ''
        ;
        switch (self.props.sidebarContent) {
            case 'learnMore':
                content = <LearnMore />;
                break;
            case 'contact':
                content = <div>Contact</div>;
                break;
            case 'signUp':
                content = <div>Sign Up</div>;
                break;
            case 'signIn':
                content = <div>Sign In</div>;
                break;
            case 'account':
                content = <div>Account</div>;
                break;
            default:
                break;
        }
        return (
            <div 
                className="xxOverlay xxOverlay--scroll xxOverlay--visibleNav" 
                onClick={self.handleBackgroundClose} 
                hidden={!self.state.sidebarOpen}
            >
                <a href="" className="xxOverlay-close" onClick={self.handleClose}>Close</a>
                <div className="xxPageOverlay">
                    {content}
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Sidebar;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -