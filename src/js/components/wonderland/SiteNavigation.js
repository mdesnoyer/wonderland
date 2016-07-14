// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import SESSION from '../../modules/session';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteNavigation = React.createClass({
    getDefaultProps: function() {
        var self = this;
        return {
            hasUser: null, // null|true|false
            displayName: ''
        }
    },
    getInitialState: function() {
        var self = this;
        return {
            sidebarContent: self.props.sidebarContent
        }
    },
    componentWillMount: function() {
        var self = this;
        if (SESSION.active()) {
            SESSION.user()
                .then(function (user) {
                    self.setState({
                        hasUser: true
                    });
                })
                .catch(function () {
                    self.setState({
                        hasUser: false
                    });
                });
        } else {
            self.setState({
                hasUser: false
            });
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
        constructedNav.push(items.learnMore);
        constructedNav.push(items.contactPage);
        if (self.state.hasUser === true) {
            constructedNav.push(items.account);
        }
        else if (self.state.hasUser === false) {
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
