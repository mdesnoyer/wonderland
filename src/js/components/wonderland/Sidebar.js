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

    componentWillReceiveProps: function(nextProps) {

        if (nextProps.content === null) {
            document.body.classList.remove('has-overlayWithNav');
            document.body.style.marginRight = 0;
            return;
        }

        window.scrollTo(0, 0);
        ReactDOM.findDOMNode(this).scrollTop = 0;
        document.body.classList.add('has-overlayWithNav');
        document.body.style.marginRight = `${scrollbarWidth}px`;
    },

    handleClose: function(e) {
        const self = this;
        e.preventDefault();
        self.props.setContent(null);
    },

    handleClick: function(e) {
        const self = this;
        e.preventDefault();
        self.props.setContent(e.target.name);
    },

    handleSidebarClick: function(e) {
        e.stopPropagation();
    },

    getBody: function() {
        switch (this.props.content) {
            case 'learnMore':
                return <LearnMore />;
            case 'contact':
                return <Contact handleClose={self.handleClose} />;
            case 'signUp':
                return <SignUp handleClose={self.handleClose} />;
            case 'account':
                return <Account />;
            case 'primaryNavigation':
                return <PrimaryNavigation handleClick={self.handleClick} sidebarContent={self.state.content} />;
        }
        return null;
    },

    render: function() {
        return (
            <div
                className="xxOverlay xxOverlay--scroll xxOverlay--visibleNav"
                onClick={this.handleClose}
                hidden={!this.props.content}
            >
                <a href="#" className="xxOverlay-close" onClick={this.handleClose}>{T.get('action.close')}</a>
                <div className="xxPageOverlay" onClick={this.handleSidebarClick}>
                    {this.getBody()}
                </div>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Sidebar;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
