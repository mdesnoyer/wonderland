// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import ReactDOM from 'react-dom';
import scrollbarWidth from '../../xx/utils/scrollbarWidth';
import LearnMore from './LearnMore';
import Contact from './Contact';
import Account from './Account';
import PrimaryNavigation from './PrimaryNavigation';
import SignUp from './SignUp';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Sidebar = React.createClass({
    getDefaultProps: function() {
        return {
            content: null
        }
    },
    getInitialState: function() {
        var self = this;
        return {
            content: self.props.content
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            content: nextProps.content
        }, function() {
            if (self.state.content === null) {
                document.body.classList.remove('has-overlayWithNav');
                document.body.style.marginRight = 0;
            }
            else {
                window.scrollTo(0, 0);
                ReactDOM.findDOMNode(self).scrollTop = 0;
                document.body.classList.add('has-overlayWithNav');
                document.body.style.marginRight = `${scrollbarWidth}px`;
            }
        });
    },
    handleClose: function(e) {
        var self = this;
        e.preventDefault();
        if (self.props.resetSidebar) {
            self.props.resetSidebar();
        }
        self.props.setContent(null);
    },
    handleClick: function(e) {
        var self = this,
            content = e.target.name
        ;
        e.preventDefault();
        self.props.setContent(content);
    },
    handleSidebarClick: function(e) {
        e.stopPropagation();
    },
    render: function() {
        var self = this,
            content = null,
            isHidden = (self.state.content === null)
        ;
        switch (self.state.content) {
            case 'learnMore':
                content = <LearnMore />;
                break;
            case 'contact':
                content = <Contact handleClose={self.handleClose} />;
                break;
            case 'signUp':
                content = <SignUp handleClose={self.handleClose} />;
                break;
            case 'account':
                content = <Account />;
                break;
            case 'primaryNavigation':
                content = <PrimaryNavigation handleClick={self.handleClick} sidebarContent={self.state.content} />;
            default:
                break;
        }
        return (
            <div
                className="xxOverlay xxOverlay--scroll xxOverlay--visibleNav"
                onClick={self.handleClose}
                hidden={isHidden}
            >
                <a href="#" className="xxOverlay-close" onClick={self.handleClose}>{T.get('action.close')}</a>
                <div className="xxPageOverlay" onClick={self.handleSidebarClick}>
                    {content}
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Sidebar;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
