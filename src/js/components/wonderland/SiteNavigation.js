// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
// import ReactDebugMixin from 'react-debug-mixin';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteNavigation = React.createClass({
    // mixins: [ReactDebugMixin],
    getDefaultProps: function() {
        var self = this;
        return {
            isSignedIn: false,
            displayName: ''
        }
    },
    getInitialState: function() {
        var self = this;
        return {
            isSignedIn: self.props.isSignedIn,
            sidebarContent: self.props.sidebarContent
        }
    },
    componentWillReceiveProps: function(nextProps) {
        var self = this;
        self.setState({
            sidebarContent: nextProps.sidebarContent
        });
    },
    handleClick: function(e) {
        var self = this,
            content = e.target.getAttribute('content')
        ;
        e.preventDefault();
        self.props.setSidebarContent(content);
    },
    render: function() {
        var self = this,
            items = {
                learnMore: <a className="xxNav-anchor" href="#" content="learnMore" onClick={self.handleClick}>{T.get('nav.learnMore')}</a>,
                contactPage: <a className="xxNav-anchor" href="#" content="contact" onClick={self.handleClick}>{T.get('nav.contact')}</a>,
                signUp: <a className="xxNav-anchor" href="#" content="signUp" onClick={self.handleClick}>{T.get('nav.signUp')}</a>,
                account: <a className="xxNav-anchor" href="#" content="account" onClick={self.handleClick}>{T.get('nav.account')}</a>
            },
            constructedNav = []
        ;
        if (self.state.isSignedIn) {
            // Signed In
            constructedNav.push(items.learnMore);
            constructedNav.push(items.contactPage);
            constructedNav.push(items.account);
        }
        else {
            // Signed Out
            constructedNav.push(items.learnMore);
            constructedNav.push(items.contactPage);
            constructedNav.push(items.signUp);
        }
        return (
            <div>
                <ul>
                    {
                        constructedNav.map(function(levelItem, i) {
                            if (levelItem.props['content'] === self.state.sidebarContent) {
                                return (
                                    <li key={i} className="xxNav-item is-active">{levelItem}</li>
                                );
                            }
                            return (
                                <li key={i} className="xxNav-item">{levelItem}</li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteNavigation;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
