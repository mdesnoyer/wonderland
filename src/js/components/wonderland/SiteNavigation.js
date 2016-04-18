// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import {Link} from 'react-router';
import T from '../../modules/translation';
import UTILS from '../../modules/utils';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteNavigation = React.createClass({
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
            isSignedIn: self.props.isSignedIn
        }
    },
    render: function() {
        var self = this,
            items = {
                logo: <a  href="/" title="Go to the Home page"><img className="wonderland-logo" src="/img/logo-fff.svg" alt="Neon" title="Neon" /></a>,
                contact: <a className="" href={UTILS.CONTACT_EXTERNAL_URL}>{T.get('nav.contact')}</a>,
                blank: <span>&nbsp;&nbsp;&nbsp;</span>,
                dashboard: <Link activeClassName="wonderland-active" to={UTILS.DRY_NAV.DASHBOARD.URL}>Dashboard</Link>,
                analyzeVideo: <Link activeClassName="wonderland-active" to="/analyze/video/">{T.get('nav.analyze')}</Link>,
                videos: <Link activeClassName="wonderland-active" to="/videos/">{T.get('nav.videoLibrary')}</Link>,
                avatar: <span className="wonderland-avatar"><i className="fa fa-user" aria-hidden="true" /></span>,
                signUp: <Link className="button is-danger" activeClassName="wonderland-active" to="/signup/">{T.get('nav.signUp')}</Link>,
                forgotPassword: <Link activeClassName="wonderland-active" to="/account/forgot/">Forgot Password</Link>,
                signIn: <Link activeClassName="wonderland-active" to="/signin/">{T.get('nav.signIn')}</Link>,
                signOut: <Link activeClassName="wonderland-active" to="/signout/">{T.get('nav.signOut')}</Link>,
                username: <span className="un">{self.props.displayName}</span>
            },
            constructedNav = [],
            className = 'navbar-' + self.props.side
        ;
        if (self.state.isSignedIn) {
            if (self.props.side === 'left') {
                constructedNav.push(items.logo);
                constructedNav.push(items.blank);
                constructedNav.push(items.videos);
            }
            if (self.props.side === 'right') {
                constructedNav.push(items.username);
                constructedNav.push(items.avatar);
                constructedNav.push(items.signOut);
                constructedNav.push(items.contact);
            }
        }
        else {
            if (self.props.side === 'left') {
                constructedNav.push(items.logo);
                constructedNav.push(items.blank);
                // constructedNav.push(items.forgotPassword);
            }
            if (self.props.side === 'right') {
                constructedNav.push(items.contact);
                constructedNav.push(items.signIn);
                constructedNav.push(items.signUp);
            }
        }
        return (
            <div className={className}>
                {
                    constructedNav.map(function(navbarItem, i) {
                        return (
                            <div key={i} className="wonderland-navbar-item navbar-item">{navbarItem}</div>
                        );
                    })
                }
            </div>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteNavigation;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


