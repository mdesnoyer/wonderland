// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import {Link} from 'react-router';
import T from '../../modules/translation';
import CallToAction from '../wonderland/CallToAction';
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
                logo: <a  href="/" title="Go to the Home page"><img className="wonderland-logo" src="/img/logo-white.png" alt="Neon" title="Neon" /></a>,
                cta: <CallToAction />,
                blank: <span>&nbsp;</span>,
                dashboard: <Link activeClassName="active" to={UTILS.DRY_NAV.DASHBOARD.URL}>Dashboard</Link>,
                analyzeVideo: <Link activeClassName="active" to="/analyze/video/">{T.get('nav.analyze')}</Link>,
                videos: <Link activeClassName="active" to="/videos/">{T.get('nav.videos')}</Link>,
                avatar: <span className="wonderland-avatar"><i className="fa fa-user" aria-hidden="true" /></span>,
                signUp: <Link activeClassName="active" to="/signup/">{T.get('nav.signUp')}</Link>,
                forgotPassword: <Link activeClassName="active" to="/account/forgot/">Forgot Password</Link>,
                signIn: <Link activeClassName="active" to="/signin/">{T.get('nav.signIn')}</Link>,
                signOut: <Link activeClassName="active" to="/signout/">{T.get('nav.signOut')}</Link>,
                username: <span>{self.props.displayName}</span>
            },
            constructedNav = [],
            className = 'navbar-' + self.props.side
        ;
        if (self.state.isSignedIn) {
            if (self.props.side === 'left') {
                constructedNav.push(items.logo);
                constructedNav.push(items.blank);
                constructedNav.push(items.analyzeVideo);
                constructedNav.push(items.videos);
            }
            if (self.props.side === 'right') {
                constructedNav.push(items.username);
                constructedNav.push(items.avatar);
                constructedNav.push(items.signOut);
                constructedNav.push(items.cta);
            }
        }
        else {
            if (self.props.side === 'left') {
                constructedNav.push(items.logo);
                constructedNav.push(items.blank);
                constructedNav.push(items.signUp);
                // constructedNav.push(items.forgotPassword);
                constructedNav.push(items.signIn);
            }
            if (self.props.side === 'right') {
                constructedNav.push(items.cta);
            }
        }
        return (
            <div className={className}>
                {
                    constructedNav.map(function(navbarItem, i) {
                        return (
                            <div key={i} className="navbar-item">{navbarItem}</div>
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


