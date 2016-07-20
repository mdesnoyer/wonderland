// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import SESSION from '../../modules/session';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteNavigation = React.createClass({
    getInitialState: function() {
        var self = this;
        return {
            sidebarContent: self.props.sidebarContent,
            hasUser: false
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
    componentWillMount: function() {
        var self = this;
        if (SESSION.active()) {
            SESSION.user()
                .then(function(user) {
                    if (self._isMounted) {
                        self.setState({
                            hasUser: true
                        });
                    }
                })
                .catch(function(err) {
                    console.log(err);
                })
            ;
        }
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
        var self = this,
            items = {
                learnMore: <a className="xxNav-anchor" href="#" name="learnMore" onClick={self.handleClick}>{T.get('nav.learnMore')}</a>,
                contactPage: <a className="xxNav-anchor" href="#" name="contact" onClick={self.handleClick}>{T.get('nav.contact')}</a>,
                signUp: <a className="xxNav-anchor" href="#" name="signUp" onClick={self.handleClick}>{T.get('nav.signUp')}</a>,
                account: <a className="xxNav-anchor" href="#" name="account" onClick={self.handleClick}>{T.get('nav.account')}</a>
            },
            constructedNav = []
        ;
        constructedNav.push(items.learnMore);
        constructedNav.push(items.contactPage);
        if (self.state.hasUser) {
            constructedNav.push(items.account);
        }
        else {
            constructedNav.push(items.signUp);
        }
        return (
            <div>
                <ul>
                    {
                        constructedNav.map(function(levelItem, i) {
                            if (levelItem.props['name'] === self.state.sidebarContent) {
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
