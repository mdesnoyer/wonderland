// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import T from '../../modules/translation';
import SESSION from '../../modules/session';
import UTILS from '../../modules/utils';
import {Link} from 'react-router';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var PrimaryNavigation = React.createClass({
    propTypes: {
        sidebarContent: React.PropTypes.string,
        handleClick: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        var self = this;
        return {
            sidebarContent: self.props.sidebarContent,
            hasUser: false,
            username: T.get('nav.account') // default to account just in case
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
                            hasUser: true,
                            username: user.displayName || T.get('nav.account')
                        });
                    }
                })
                .catch(function(err) {
                    if (self._isMounted) {
                        self.setState({
                            hasUser: false,
                            username: T.get('nav.account')
                        });
                    }
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
    render: function() {
        var self = this,
            primaryNavItems = {
                myCollections: <Link activeClassName="is-current" className="xxNav-anchor is-mobile" to={UTILS.DRY_NAV.COLLLECTIONS_MAIN.URL}>{T.get('nav.myCollections')}</Link>,
                learnMore: <a className="xxNav-anchor" href="#" name="learnMore" onClick={self.props.handleClick}>{T.get('nav.learnMore')}</a>,
                contactPage: <a className="xxNav-anchor" href="#" name="contact" onClick={self.props.handleClick}>{T.get('nav.contact')}</a>,
                signUp: <a className="xxNav-anchor" href="#" name="signUp" onClick={self.props.handleClick}>{T.get('nav.signUp')}</a>,
                account: <a className="xxNav-anchor" href="#" name="account" onClick={self.props.handleClick}>{self.state.username}</a>
            },
            primaryNav = []
        ;

        primaryNav.push(primaryNavItems.myCollections);
        primaryNav.push(primaryNavItems.learnMore);
        primaryNav.push(primaryNavItems.contactPage);
        if (self.state.hasUser) {
            primaryNav.push(primaryNavItems.account);
        }
        else {
            primaryNav.push(primaryNavItems.signUp);
        }

        return (
            <ul className="xxNav-items">
                {
                    primaryNav.map(function(navItem, i) {
                        var navItemClass = ['xxNav-item'];
                        if (navItem.props['name'] === self.state.sidebarContent) {
                            navItemClass.push('is-active');
                        }
                        return (
                            <li key={i} className={navItemClass.join(' ')}>{navItem}</li>
                        );
                    })
                }
            </ul>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default PrimaryNavigation;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


