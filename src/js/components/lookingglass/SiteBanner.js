// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import {Link} from 'react-router';

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
                            <a className="button is-primary" href="https://neon-lab.com/" target="_blank">Contact Neon</a>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/upload/video/">Upload</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/videos/">Videos</Link>
                        </span>
                        <span className="header-item">
                            <img className="image is-24x24 wonderland-avatar" src="/img/alice.jpg" alt="Signed in as Alice" title="Logged in as Alice" />
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/signup/">Sign Up</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/signin/">Sign In</Link>
                        </span>
                        <span className="header-item">
                            <Link activeClassName="active" to="/signout/">Sign Out</Link>
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
