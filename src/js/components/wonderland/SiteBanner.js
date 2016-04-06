// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import SiteNavigation from '../wonderland/SiteNavigation';
import SESSION from '../../modules/session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var SiteBanner = React.createClass({
    render: function() {
        var self = this;
        return (
            <header className="header is-dark wonderland-banner">
                <div className="container">
                    <div className="header-left">
                        <a className="header-item" href="/" title="Go to the Home page">
                            <img src="/img/logo-white.png" alt="Neon" title="Neon" />
                        </a>
                    </div>
                    <SiteNavigation containerClass="header-right header-menu" isSignedIn={SESSION.active()} />
                </div>
            </header>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default SiteBanner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
