// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import LearnMore from './LearnMore';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Sidebar = React.createClass({
    getInitialState: function() {
        var self = this;
        return {
            isOpen: self.props.sidebarOpen
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            isOpen: nextProps.sidebarOpen
        });
    },
    handleClose: function(e) {
        var self = this;
        e.preventDefault();
        self.setState({
            isOpen: false
        });
        self.props.closeSidebar();
    },
    sidebarClick: function(e) {
        e.stopPropagation();
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
                onClick={self.handleClose} 
                hidden={!self.state.isOpen}
            >
                <a href="" className="xxOverlay-close" onClick={self.handleClose}>Close</a>
                <div className="xxPageOverlay" onClick={self.sidebarClick}>
                    {content}
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Sidebar;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -