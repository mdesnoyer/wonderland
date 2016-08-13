// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import SESSION from '../../modules/session';
import UTILS from '../../modules/utils';
import PrimaryNavigation from './PrimaryNavigation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteNavigation = React.createClass({
    getInitialState: function() {
        var self = this;
        return {
            sidebarContent: self.props.sidebarContent,
        }
    },
    componentDidMount: function() {
        var self = this;
        self._isMounted = true;
    },
    componentWillUnmount: function() {
        var self = this;
        self._isMounted = false;
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        if (self._isMounted) {
            self.setState({
                sidebarContent: nextProps.sidebarContent
            });
        }
    },
    handleClick: function(e) {
        var self = this,
            content = e.target.name
        ;
        e.preventDefault();
        self.props.setSidebarContent(content);
    },
    render: function() {
        var self = this;
        return (
            <nav className="xxNav">
                <a href="#" name="primaryNavigation" onClick={self.handleClick} className="xxNav-hamburger xxNav-anchor">&#9776;</a>
                <PrimaryNavigation
                    handleClick={self.handleClick}
                    sidebarContent={self.state.sidebarContent}
                />
            </nav>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteNavigation;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
