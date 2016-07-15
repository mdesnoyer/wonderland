// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import SiteNavigation from '../wonderland/SiteNavigation';
import SESSION from '../../modules/session';
import T from '../../modules/translation';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SiteBanner = React.createClass({
    getInitialState: function() {
        return {
            displayName: ''
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
        var self = this,
            displayName = ''
        ;
        if (SESSION.active()) {
            SESSION.user()
                .then(function(userData) {
                    if (userData) {
                        if (self._isMounted) {
                            self.setState({
                                displayName: userData.displayName,
                            });
                        }
                    }
                })
                .catch(function(err) {
                    // Do nothing
                })
            ;
        }
        else {
            // Do nothing
        }
    },
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
                        displayName={self.state.displayName} 
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
