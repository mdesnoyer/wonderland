// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import {Link} from 'react-router';
import T from '../../modules/translation';
import CallToAction from '../wonderland/CallToAction';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteNavigation = React.createClass({
    getDefaultProps: function() {
        var self = this;
        return {
            isSignedIn: false,
            containerClass: ''
        }
    },
    getInitialState: function() {
        var self = this;
        return {
            isSignedIn: self.props.isSignedIn,
            containerClass: self.props.containerClass
        }
    },
    render: function() {
        var self = this,
            items = {
                cta: <CallToAction />,
                dashboard: <Link activeClassName="active" to="/dashboard/">Dashboard</Link>,
                analyzeVideo: <Link activeClassName="active" to="/analyze/video/">{T.get('nav.analyze')}</Link>,
                videos: <Link activeClassName="active" to="/videos/">{T.get('nav.videos')}</Link>,
                avatar: <img className="image is-24x24 wonderland-avatar" src="/img/alice.jpg" alt="Signed in as Alice" title="Logged in as Alice" />,
                signUp: <Link activeClassName="active" to="/signup/">{T.get('nav.signUp')}</Link>,
                forgotPassword: <Link activeClassName="active" to="/account/forgot/">Forgot Password</Link>,
                signIn: <Link activeClassName="active" to="/signin/">{T.get('nav.signIn')}</Link>,
                signOut: <Link activeClassName="active" to="/signout/">{T.get('nav.signOut')}</Link>
            },
            constructedNav = []
        ;
        if (self.state.isSignedIn) {
            constructedNav.push(items.analyzeVideo);
            constructedNav.push(items.videos);
            constructedNav.push(items.avatar);
            constructedNav.push(items.signOut);
            constructedNav.push(items.cta);
        }
        else {
            constructedNav.push(items.signUp);
            // constructedNav.push(items.forgotPassword);
            constructedNav.push(items.signIn);
            constructedNav.push(items.cta);
        }
        return (
            <div className={self.state.containerClass}>
                {
                    constructedNav.map(function(navItem, i) {
                        return (
                            <span key={i} className="header-item">{navItem}</span>
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


