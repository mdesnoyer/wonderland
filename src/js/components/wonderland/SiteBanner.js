// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteNavigation from '../wonderland/SiteNavigation';
import SESSION from '../../modules/session';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteBanner = React.createClass({
    render: function() {
        var self = this;
        return (
            <header className="xxHeader">
                <a href="/" title={T.get('title.home')}>
                    <img 
                        className="xxLogo"
                        src="/img/xx/logo.svg"
                        alt={T.get('app.companyShortName')}
                        title={T.get('app.companyShortName')}
                    />
                </a>
                <nav className="xxNav">
                    <SiteNavigation 
                        sidebarContent={self.props.sidebarContent}
                        setSidebarContent={self.props.setSidebarContent}
                    />
                </nav>
            </header>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default SiteBanner;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
