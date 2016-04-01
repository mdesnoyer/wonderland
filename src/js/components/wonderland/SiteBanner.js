// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {Link} from 'react-router';
import T from '../../modules/translation';
import CallToAction from '../wonderland/CallToAction';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SiteBanner = React.createClass({
    render: function() {
        return (
            <header className="header is-dark wonderland-banner">
                <div className="container">
                    <div className="header-left">
                        <a className="header-item" href="/" title="Go to the home page">
                            <img src="/img/logo-white.png" alt="Neon" />
                        </a>
                    </div>
                    <div className="header-right header-menu">
                        <span className="header-item">
                            <CallToAction />
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/">Home</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/dashboard/">Dashboard</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/upload/video/">{T.get('nav.upload')}</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/videos/">{T.get('nav.videos')}</Link>
                        </span>
                        <span className="header-item">
                            <img className="image is-24x24 wonderland-avatar" src="/img/alice.jpg" alt="Signed in as Alice" title="Logged in as Alice" />
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/signup/">{T.get('nav.signUp')}</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/forgot/">Forgot Password</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/confirm/">Confirm Account</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/confirmed/">Account Confirmed</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/signin/">{T.get('nav.signIn')}</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/signout/">{T.get('nav.signOut')}</Link>
                        </span>
                    </div>
                </div>
            </header>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SiteBanner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
